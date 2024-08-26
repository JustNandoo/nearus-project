<template>
  <div class="flex">
    <sidebar />
    <div class="overflow-auto w-full h-screen p-8">
      <div class="max-w-4xl ">
        <div v-if="isLoading" class="text-gray-500">Loading...</div>
        <div v-else>
          <div v-for="product in products" :key="product.id" class="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-sm flex flex-col relative">
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-4">
                <img class="w-20 h-20 rounded-lg object-cover" :src="product.image[0]" alt="Product Image">
                <div>
                  <router-link :to="{ name: 'DetailProduct', params: { id: product.id } }" class="text-lg font-medium">
                    {{ product.productname }}
                  </router-link>
                  <p class="text-gray-500">{{ product.location }}</p>
                </div>
              </div>
              <font-awesome-icon
                  :icon="faEllipsisV"
                  class="text-gray-500 cursor-pointer"
                  @click="toggleMenu(product.id)"
              />
              <div v-if="showMenu === product.id" class="absolute right-0 mt-8 bg-white shadow-md rounded-lg p-2">
                <div class="cursor-pointer p-2 text-red-500" @click="deleteProduct(product.id)">Delete</div>
              </div>
            </div>
            <hr class="my-2">
            <div class="flex justify-between items-center text-gray-600">
              <span>5 Penyewa</span>
              <span>10 Kamar Tersedia</span>
            </div>
            <button class="mt-4 bg-blue-500 text-white rounded-full py-2 w-full hover:bg-blue-600 transition duration-300">
              <a :href="`/dashboard-kosku-detail/${product.ownerId}`" class="block text-center">Manage</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>>
  <div class="fixed bottom-4 right-4">
    <button class="w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg flex justify-center items-center" @click="showAddModal = true">
      <font-awesome-icon :icon="faPlus" class="w-8 h-8"/>
    </button>
  </div>
  <div v-if="showAddModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl relative">
      <button class="absolute top-2 right-2 text-gray-500" @click="closeAddModal">
        <font-awesome-icon :icon="faTimes" class="w-6 h-6"/>
      </button>
      <h2 class="text-2xl font-bold mb-4">Tambahkan Data Kamar Baru</h2>
      <form @submit.prevent="addProduct">
        <div class="mb-4">
          <label class="block text-gray-700">Nama Kamar</label>
          <input type="text" v-model="newProduct.productname" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter room name">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Lokasi</label>
          <input type="text" v-model="newProduct.location" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter location">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Category</label>
          <select v-model="newProduct.category" class="w-full p-2 border border-gray-300 rounded mt-1">
            <option value="">Select Category</option>
            <option value="pria">Pria</option>
            <option value="wanita">Wanita</option>
            <option value="campuran">Campuran</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Link Location</label>
          <div class="flex">
            <input type="text" v-model="newProduct.linklocation" class="w-full p-2 border border-gray-300 rounded mt-1 mr-2" placeholder="Enter or get current location">
            <button type="button" class="bg-gray-200 border border-gray-300 rounded p-2" @click="getCurrentLocation">
              <font-awesome-icon class="w-5 h-5" :icon="faLocationDot"/>
            </button>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Harga</label>
          <input type="number" v-model="newProduct.price" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter price">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Duration</label>
          <input type="text" v-model="newProduct.duration" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter duration">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Fasilitas</label>
          <input type="text" v-model="newProduct.fasilitas" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter facilities, separated by commas">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">About</label>
          <textarea v-model="newProduct.about" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter description"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Images</label>
          <input type="file" multiple @change="handleFileUpload" class="w-full p-2 border border-gray-300 rounded mt-1">
        </div>
        <div class="flex flex-wrap gap-2">
          <img v-for="(imagePreview, index) in newProduct.imagePreviews" :key="index" :src="imagePreview" class="w-20 h-20 rounded object-cover">
        </div>
        <div class="flex justify-end">
          <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded mr-2" @click="closeAddModal">Cancel</button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEllipsisV, faPlus, faTimes, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
import KoskuCard from "@/components/DashboardPemilik/KoskuCard.vue";
import Gallery from "@/components/Detail/Gallery.vue";


const products = ref([]);
const showMenu = ref(null);
const isLoading = ref(true);
const showAddModal = ref(false);
const showEditModal = ref(false);
const newProduct = ref({
  duration: '',
  productname: '',
  location: '',
  category: '',
  linklocation: '',
  price: '',
  fasilitas: '',
  ownerId: 1,
  roomid: '',
  about: '',
  images: [],
  imagePreviews: [],
});

const editedProduct = ref({
  ...newProduct.value,
  images: [],
});

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://api.nearus.id/api/product', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    products.value = response.data.data;
    isLoading.value = false;
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
});

const toggleMenu = (productId) => {
  showMenu.value = showMenu.value === productId ? null : productId;
};

const closeEditModal = () => {
  showEditModal.value = false;
  resetEditProductForm();
};

const handleFileUpload = (event) => {
  const files = event.target.files;
  newProduct.value.images = [];
  newProduct.value.imagePreviews = [];
  for (let i = 0; i < files.length; i++) {
    newProduct.value.images.push(files[i]);
    const reader = new FileReader();
    reader.onload = (e) => {
      newProduct.value.imagePreviews.push(e.target.result);
    };
    reader.readAsDataURL(files[i]);
  }
};


const handleEditFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    editedProduct.value.image = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      editedProduct.value.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    newProduct.value.linklocation = `${position.coords.latitude},${position.coords.longitude}`;
    editedProduct.value.linklocation = `${position.coords.latitude},${position.coords.longitude}`;
  });
};

const closeAddModal = () => {
  showAddModal.value = false; // Close the modal
  resetNewProductForm(); // Reset the form fields
};

const addProduct = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    if (!newProduct.value.productname || !newProduct.value.location || !newProduct.value.category || !newProduct.value.linklocation || !newProduct.value.price || !newProduct.value.fasilitas || !newProduct.value.about) {
      alert('Please fill out all required fields.');
      return;
    }

    if (isNaN(newProduct.value.price)) {
      alert('Price must be a number.');
      return;
    }

    const formData = new FormData();
    newProduct.value.images.forEach((image) => {
      formData.append('image[]', image); // append multiple images
    });
    formData.append('productname', newProduct.value.productname);
    formData.append('ownerId', newProduct.value.ownerId);
    formData.append('location', newProduct.value.location);
    formData.append('category', newProduct.value.category);
    formData.append('linklocation', newProduct.value.linklocation);
    formData.append('price', newProduct.value.price);
    formData.append('fasilitas', newProduct.value.fasilitas.split(',').map(f => f.trim()).join(','));
    formData.append('about', newProduct.value.about);
    formData.append('duration', newProduct.value.duration);

    const response = await axios.post('https://api.nearus.id/api/addproduct', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    products.value.push(response.data.data);
    showAddModal.value = false;
    resetNewProductForm();
    alert('Product successfully added!');
  } catch (error) {
    console.error('Failed to add product:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      alert(`Failed to add product. ${error.response.data.message || 'Please try again later.'}`);
    }
  }
};



const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`https://api.nearus.id/api/product/delete/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    products.value = products.value.filter(p => p.id !== productId);
  } catch (error) {
    console.error('Failed to delete product:', error);
  }
};

const openEditModal = (product) => {
  showEditModal.value = true;
  editedProduct.value = { ...product, fasilitas: product.fasilitas.split(','), imagePreview: product.image.url, images: product.images };
};

const resetNewProductForm = () => {
  newProduct.value = {
    productname: '',
    location: '',
    category: '',
    linklocation: '',
    price: '',
    fasilitas: '',
    ownerId: '',
    roomid: '',
    about: '',
    images: [],
    imagePreviews: [],
  };
};


const resetEditProductForm = () => {
  editedProduct.value = {
    ...newProduct.value,
    images: [],
  };
};

const deleteImage = (index) => {
  editedProduct.value.images.splice(index, 1);
};
</script>


<style scoped>
/* Add any necessary styles */
</style>
