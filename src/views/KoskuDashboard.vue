<template>
  <div class="flex">
    <sidebar/>
    <div class="overflow-auto w-[1580px] h-screen">
      <div class="w-[1500px] ml-8 mt-10">
        <div v-if="isLoading" class="text-gray-500">Loading...</div>
        <div v-else>
          <div v-for="product in products" :key="product.id" class="my-4">
            <div class="bg-white overflow-hidden shadow-md rounded-lg relative h-32">
              <div class="absolute top-0 right-0 p-2">
                <font-awesome-icon
                    :icon="faEllipsisV"
                    class="text-gray-500 w-6 h-6 cursor-pointer"
                    @click="toggleMenu(product.id)"
                />
                <div v-if="showMenu === product.id" class="absolute right-0 bg-white shadow-md rounded-lg p-2">
                  <div class="cursor-pointer p-2" @click="openEditModal(product)">Edit</div>
                  <div class="cursor-pointer p-2 text-red-500" @click="deleteProduct(product.id)">Delete</div>
                </div>
              </div>
              <div class="flex">
                <div class="w-2/3 p-4">
                  <div class="text-xl font-semibold mb-2">{{ product.productname }}</div>
                  <p class="text-gray-700">{{ product.about }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed bottom-4 right-4 flex items-center">
    <div class="w-20 h-20 rounded-full shadow-lg bg-blue-primary flex justify-center items-center cursor-pointer" @click="showAddModal = true">
      <font-awesome-icon :icon="faPlus" class="text-white w-10 h-10"/>
    </div>
  </div>

  <div v-if="showAddModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="bg-white p-8 rounded-lg shadow-lg w-3/4 max-h-3/4 overflow-y-auto relative">
      <button class="absolute top-2 right-2 text-gray-500" @click="closeAddModal">
        <font-awesome-icon :icon="faTimes" class="w-6 h-6"/>
      </button>
      <h2 class="text-2xl font-bold mb-4">Tambahkan Data Kamar Baru</h2>
      <form @submit.prevent="addProduct">
        <div class="flex flex-row justify-between gap-3">
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Nama Kamar</label>
            <input type="text" v-model="newProduct.productname" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter room name">
          </div>
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Lokasi</label>
            <input type="text" v-model="newProduct.location" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter location">
          </div>
        </div>
        <div class="flex flex-row justify-between gap-3">
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Category</label>
            <select v-model="newProduct.category" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Select category">
              <option value="">Select Category</option>
              <option value="pria">Pria</option>
              <option value="wanita">Wanita</option>
              <option value="campuran">Campuran</option>
            </select>
          </div>
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Link Location</label>
            <div class="flex items-center justify-between">
              <input type="text" v-model="newProduct.linklocation" class="w-full p-2 border border-gray-300 rounded mt-1 mr-2" placeholder="Enter or get current location">
              <button type="button" class="bg-white border border-gray-300 rounded p-2 px-4" @click="getCurrentLocation"><FontAwesomeIcon class="w-5 h-5" :icon="faLocationDot"/></button>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-between gap-3">
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Harga</label>
            <input type="number" v-model="newProduct.price" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter price">
          </div>
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Fasilitas</label>
            <input type="text" v-model="newProduct.fasilitas" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter facilities, separated by commas">
          </div>
        </div>
        <div class="flex flex-row justify-between gap-3">
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Owner ID</label>
            <input type="number" v-model="newProduct.ownerId" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter owner ID">
          </div>
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Room ID</label>
            <input type="number" v-model="newProduct.roomid" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter room ID">
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">About</label>
          <textarea v-model="newProduct.about" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter description"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Image</label>
          <input type="file" @change="handleFileUpload" class="w-full p-2 border border-gray-300 rounded mt-1">
        </div>
        <div class="flex justify-end">
          <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded mr-2" @click="closeAddModal">Cancel</button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        </div>
      </form>
    </div>
  </div>

  <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="bg-white p-8 rounded-lg shadow-lg w-3/4 max-h-3/4 overflow-y-auto relative">
      <button class="absolute top-2 right-2 text-gray-500" @click="closeEditModal">
        <font-awesome-icon :icon="faTimes" class="w-6 h-6"/>
      </button>
      <h2 class="text-2xl font-bold mb-4">Edit Data Kamar</h2>
      <form @submit.prevent="editProduct">
        <div class="flex flex-row justify-between gap-3">
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Nama Kamar</label>
            <input type="text" v-model="editedProduct.productname" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter room name">
          </div>
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Lokasi</label>
            <input type="text" v-model="editedProduct.location" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter location">
          </div>
        </div>
        <div class="flex flex-row justify-between gap-3">
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Category</label>
            <select v-model="editedProduct.category" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Select category">
              <option value="">Select Category</option>
              <option value="pria">Pria</option>
              <option value="wanita">Wanita</option>
              <option value="campuran">Campuran</option>
            </select>
          </div>
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Link Location</label>
            <div class="flex items-center justify-between">
              <input type="text" v-model="editedProduct.linklocation" class="w-full p-2 border border-gray-300 rounded mt-1 mr-2" placeholder="Enter or get current location">
              <button type="button" class="bg-white border border-gray-300 rounded p-2 px-4" @click="getCurrentLocation"><FontAwesomeIcon class="w-5 h-5" :icon="faLocationDot"/></button>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-between gap-3">
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Harga</label>
            <input type="number" v-model="editedProduct.price" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter price">
          </div>
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Fasilitas</label>
            <input type="text" v-model="editedProduct.fasilitas" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter facilities, separated by commas">
          </div>
        </div>
        <div class="flex flex-row justify-between gap-3">
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Owner ID</label>
            <input type="number" v-model="editedProduct.ownerId" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter owner ID">
          </div>
          <div class="mb-4 w-full">
            <label class="block text-gray-700">Room ID</label>
            <input type="number" v-model="editedProduct.roomid" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter room ID">
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">About</label>
          <textarea v-model="editedProduct.about" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter description"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Image</label>
          <input type="file" @change="handleEditFileUpload" class="w-full p-2 border border-gray-300 rounded mt-1">
        </div>
        <div class="flex justify-end">
          <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded mr-2" @click="closeEditModal">Cancel</button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Update Product</button>
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
import Sidebar from "@/components/sidebar.vue";


const products = ref([]);
const showMenu = ref(null);
const isLoading = ref(true);
const showAddModal = ref(false);
const showEditModal = ref(false);
const newProduct = ref({
  productname: '',
  location: '',
  category: '',
  linklocation: '',
  price: '',
  fasilitas: '',
  ownerId: '',
  roomid: '',
  about: '',
  image: null,
});
const editedProduct = ref({ ...newProduct.value });

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

const closeAddModal = () => {
  showAddModal.value = false;
  resetNewProductForm();
};

const closeEditModal = () => {
  showEditModal.value = false;
  resetEditProductForm();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    newProduct.value.image = file;
  }
};

const handleEditFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    editedProduct.value.image = file;
  }
};

const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    newProduct.value.linklocation = `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
    editedProduct.value.linklocation = `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
  });
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
    formData.append('image', newProduct.value.image);
    formData.append('productname', newProduct.value.productname);
    formData.append('ownerId', newProduct.value.ownerId);
    formData.append('location', newProduct.value.location);
    formData.append('category', newProduct.value.category);
    formData.append('linklocation', newProduct.value.linklocation);
    formData.append('price', newProduct.value.price);
    formData.append('fasilitas', newProduct.value.fasilitas.split(',').map(f => f.trim()).join(','));
    formData.append('roomid', newProduct.value.roomid);
    formData.append('about', newProduct.value.about);

    const response = await axios.post('https://api.nearus.id/api/addproduct', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    products.value.push(response.data.data);
    showAddModal.value = false;
    resetNewProductForm();
  } catch (error) {
    console.error('Failed to add product:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      alert(`Failed to add product. ${error.response.data.message || 'Please try again later.'}`);
    }
  }
};

const editProduct = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    if (!editedProduct.value.productname || !editedProduct.value.location || !editedProduct.value.category || !editedProduct.value.linklocation || !editedProduct.value.price || !editedProduct.value.fasilitas || !editedProduct.value.about) {
      alert('Please fill out all required fields.');
      return;
    }

    if (isNaN(editedProduct.value.price)) {
      alert('Price must be a number.');
      return;
    }

    let fasilitasArray = [];
    if (typeof editedProduct.value.fasilitas === 'string') {
      fasilitasArray = editedProduct.value.fasilitas.split(',').map(f => f.trim());
    } else if (Array.isArray(editedProduct.value.fasilitas)) {
      fasilitasArray = editedProduct.value.fasilitas;
    } else {
      fasilitasArray = [];
    }

    const formData = new FormData();
    formData.append('image', editedProduct.value.image);
    formData.append('productname', editedProduct.value.productname);
    formData.append('ownerId', editedProduct.value.ownerId);
    formData.append('location', editedProduct.value.location);
    formData.append('category', editedProduct.value.category);
    formData.append('linklocation', editedProduct.value.linklocation);
    formData.append('price', editedProduct.value.price);
    formData.append('fasilitas', fasilitasArray.join(','));
    formData.append('roomid', editedProduct.value.roomid);
    formData.append('about', editedProduct.value.about);

    console.log("Sending data: ", Object.fromEntries(formData));

    const response = await axios.get(`https://api.nearus.id/api/product/${editedProduct.value.id}/edit`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    const index = products.value.findIndex(product => product.id === editedProduct.value.id);
    if (index !== -1) {
      products.value[index] = response.data.data;
    }
    showEditModal.value = false;
    resetEditProductForm();
  } catch (error) {
    console.error('Failed to update product:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      alert(`Failed to update product. ${error.response.data.message || 'Please try again later.'}`);
    }
  }
};



const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const response = await axios.delete(`https://api.nearus.id/api/product/delete/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    products.value = products.value.filter(product => product.id !== productId);
  } catch (error) {
    console.error('Failed to delete product:', error);
  }
};

const openEditModal = (product) => {
  editedProduct.value = { ...product };
  showEditModal.value = true;
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
    image: null,
  };
};

const resetEditProductForm = () => {
  editedProduct.value = { ...newProduct.value };
};
</script>

<style scoped>
/* Add any necessary styles */
</style>
