<template>
  <div class="flex">
    <!-- Set the width of the sidebar to 350px -->
    <sidebar class="w-[350px] bg-gray-800 text-white min-h-screen flex-shrink-0">
    </sidebar>

    <div class="ml-[350px] flex-1 p-8 bg-gray-100 min-h-screen overflow-auto">
      <div class="max-w-full">
        <div v-if="isLoading" class="text-gray-500">Loading...</div>
        <div v-else>
          <div class="flex-col gap-3">
            <h1 class="font-medium text-2xl mb-4 text-left">List Product</h1>
            <div class="flex-col gap-3 space-y-6">
              <div
                  v-for="product in products"
                  :key="product.kostid"
                  class="bg-white shadow-md rounded-lg p-4 relative flex items-center space-x-4"
              >
                <!-- Product Image -->
                <div class="flex-shrink-0">
                  <img
                      v-if="product.image.length > 0"
                      :src="product.image[0]"
                      alt="Product Image"
                      class="w-48 h-48 rounded object-cover"
                      @error="handleImageError"
                  />
                  <img
                      v-else
                      :src="placeholderImage"
                      alt="Placeholder Image"
                      class="w-48 h-48 rounded object-cover"
                  />
                </div>


                <!-- Product Details -->
                <div class="flex-1">
                  <h2 class="font-bold text-lg">{{ product.productname }}</h2>
                  <p class="text-gray-500">{{ product.location }}</p>
                  <p class="text-gray-700"><strong>Category:</strong> {{ product.category }}</p>
                  <p class="text-gray-700"><strong>Fasilitas:</strong> {{ product.fasilitas.join(', ') }}</p>
                  <p v-if="product.price !== null" class="text-gray-700">
                    <strong>Price:</strong> {{ formatPrice(product.price) }}
                  </p>
                </div>

                <!-- Manage Button -->
                <div class="absolute bottom-4 right-4">
                  <button
                      @click="manageProduct(product.id)"
                      class="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Manage
                  </button>
                </div>

                <!-- Three-dot menu -->
                <div class="absolute top-2 right-2">
                  <button
                      @click="toggleDropdown(product.id)"
                      class="focus:outline-none"
                  >
                    <font-awesome-icon :icon="faEllipsisV" class="text-black" />
                  </button>
                  <!-- Dropdown menu -->
                  <div v-if="dropdownVisible(product.id)" class="dropdown-menu absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg">
                    <button
                        @click="confirmDeleteProduct(product.id)"
                        class="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 flex items-center"
                    >
                      <font-awesome-icon :icon="faTrash" class="mr-2 text-red-500" />
                      Delete
                    </button>
                    <button
                        @click=""
                        class="block w-full text-left px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 flex items-center"
                    >
                      <font-awesome-icon :icon="faPencil" class="mr-2 text-blue-500" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>

  <!-- Add Product Modal -->
  <div class="fixed bottom-4 right-4">
    <button
        class="w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg flex justify-center items-center"
        @click="showAddModal = true"
    >
      <font-awesome-icon :icon="faPlus" class="w-8 h-8"/>
    </button>
  </div>
  <div v-if="showAddModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl max-h-screen overflow-y-auto relative">
      <button
          class="absolute top-2 right-2 text-gray-500"
          @click="closeAddModal"
      >
       <font-awesome-icon :icon="faTimes" class="w-6 h-6"/>
      </button>
      <h2 class="text-2xl font-bold mb-4">Tambahkan Data Kost Baru</h2>
      <form class="" @submit.prevent="addProduct">
        <div class="mb-5">
          <label class="block text-gray-700">Nama Kost</label>
          <input required type="text" v-model="newProduct.productname" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Masukan Nama Product">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Lokasi</label>
          <input required type="text" v-model="newProduct.location" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Masukan Alamat Kost">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Tipe Kost</label>
          <select required v-model="newProduct.category" class="w-full p-2 border border-gray-300 rounded mt-1">
            <option value="">Tipe Kost</option>
            <option value="pria">Pria</option>
            <option value="wanita">Wanita</option>
            <option value="campuran">Campuran</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Lokasi Koordinat</label>
          <div class="flex">
            <input required type="text" v-model="newProduct.linklocation" class="w-full p-2 border border-gray-300 rounded mt-1 mr-2" placeholder="Tekan Tombol Disamping untuk mendaptkan koordinat lokasi anda">
            <button type="button" class="bg-blue-primary rounded px-3 py-1" @click="getCurrentLocation">
              <font-awesome-icon :icon="faLocationDot" class="w-5h-5 text-white"/>
            </button>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Harga Kost</label>
          <input required type="number" v-model="newProduct.price" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter price">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Durasi Bayar</label>
          <input required type="text" v-model="newProduct.duration" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter duration">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Fasilitas</label>
          <input required type="text" v-model="newProduct.fasilitas" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter facilities, separated by commas">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Deskripsi</label>
          <input required type="text" v-model="newProduct.about" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter facilities, separated by commas">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Image</label>
          <input required type="file" multiple accept="image/*" @change="handleImageUpload" class="w-full p-2 border border-gray-300 rounded mt-1">
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import {faPlus, faTimes, faEllipsisV, faTrash, faLocationDot, faPencil} from '@fortawesome/free-solid-svg-icons'
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import placeholderImage from '@/assets/images/bg-loginPage.png'; // Adjust the path as needed

const router = useRouter()

const showAddModal = ref(false)
const isLoading = ref(false)
const searchQuery = ref('')
const sortOption = ref('name')
const products = ref([])
const newProduct = ref({
  productname: '',
  location: '',
  category: '',
  linklocation: '',
  price: null,
  duration: '',
  fasilitas: [],
  about: '',
  image: [],
  imagePreviews: [],
  ownerId: 0,
  roomId: null
})

const manageProduct = (ownerId) => {
  router.push(`/dashboard-kosku-detail/${ownerId}`)
}

const fetchData = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
    return;
  }
  isLoading.value = true;
  try {
    const productsResponse = await axios.get('https://api.nearus.id/api/product/ownerid', { headers: { Authorization: `Bearer ${token}` } });

    if (productsResponse.data && Array.isArray(productsResponse.data.data)) {
      products.value = productsResponse.data.datadata.map(product => ({
        ...product,
        id: product.id,
        image: Array.isArray(product.image) ? product.image : [],
        fasilitas: Array.isArray(product.fasilitas) ? product.fasilitas : []
      }));
    } else {
      console.error('Unexpected products response format:', productsResponse.data);
      products.value = [];
    }

    console.log('Products Response:', productsResponse.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
}



const dropdowns = ref({});

const toggleDropdown = (productId) => {
  dropdowns.value = { ...dropdowns.value, [productId]: !dropdowns.value[productId] }
}

const dropdownVisible = (productId) => {
  return dropdowns.value[productId] || false
}


const handleImageUpload = (event) => {
  newProduct.value.image = Array.from(event.target.files);
};

const confirmDeleteProduct = (productId) => {
  if (confirm('Are you sure you want to delete this product?')) {
    deleteProduct(productId)
  }
}

const deleteProduct = async (productId) => {
  if (!productId) {
    console.error('Product ID is undefined')
    return
  }

  const token = localStorage.getItem('token')
  if (!token) {
    console.error('No token found in localStorage')
    return
  }

  try {
    await axios.delete(`https://api.nearus.id/api/product/delete/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    products.value = products.value.filter(product => product.id !== productId)
  } catch (error) {
    console.error('Error deleting product:', error)
  }
}

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      newProduct.value.linklocation = `${latitude},${longitude}`;
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
};


const closeAddModal = () => {
  showAddModal.value = false
}

const addProduct = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    // Create FormData object
    const formData = new FormData();
    for (const key in newProduct.value) {
      if (key !== 'roomId') { // Exclude roomId from formData
        const value = newProduct.value[key];
        if (Array.isArray(value)) {
          value.forEach(item => formData.append(`${key}[]`, item));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      }
    }

    // Post request with multipart/form-data
    await axios.post('https://api.nearus.id/api/addproduct', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    // Reset form and close modal
    newProduct.value = {
      productname: '',
      location: '',
      category: '',
      linklocation: '',
      price: null,
      duration: '',
      fasilitas: [],
      about: '',
      image: [],
      imagePreviews: [],
      ownerId: 0,  // Reset default value
      roomId: null  // Reset roomId
    };
    closeAddModal();
    fetchData(); // Refresh data
  } catch (error) {
    console.error('Error adding product:', error.response.data); // Log detailed error response
  }
};



const formatPrice = (price) => {
  if (price == null) return 'N/A';
  return `Rp ${price.toLocaleString('id-ID')}`;
};


onMounted(fetchData);
</script>

<style scoped>

</style>
