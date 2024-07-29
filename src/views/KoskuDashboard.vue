<template>
  <div class="flex">
    <sidebar/>
    <div class="overflow-auto w-[1580px] h-screen">
      <div class="w-[1500px] ml-8 mt-10">
        <div v-if="isLoading" class="text-gray-500">Loading...</div>
        <div v-else>
          <div v-for="product in products" :key="product.kostid" class="my-4">
            <div class="bg-white overflow-hidden shadow-md rounded-lg relative">
              <div class="absolute top-0 right-0 p-2">
                <font-awesome-icon
                    :icon="faEllipsisV"
                    class="text-gray-500 w-6 h-6 cursor-pointer"
                    @click="toggleMenu(product.kostid)"
                />
                <div v-if="showMenu === product.kostid" class="absolute right-0 bg-white shadow-md rounded-lg p-2">
                  <div class="cursor-pointer p-2" @click="editProduct(product.kostid)">Edit</div>
                  <div class="cursor-pointer p-2 text-red-500" @click="deleteProduct(product.kostid)">Delete</div>
                </div>
              </div>
              <div class="flex">
                <div class="w-1/3">
                  <img :src="product.image[0]" alt="Product Image" class="w-50 h-50 object-cover">
                </div>
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
    <div class="w-20 h-20 rounded-full shadow-lg bg-blue-primary flex justify-center items-center" @click="showAddModal = true">
      <font-awesome-icon :icon="faPlus" class="text-white w-10 h-10"/>
    </div>
  </div>

  <div v-if="showAddModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="bg-white p-8 rounded-lg shadow-lg w-3/4 max-h-3/4 overflow-y-auto relative">
      <button class="absolute top-2 right-2 text-gray-500" @click="showAddModal = false">
        <font-awesome-icon :icon="faTimes" class="w-6 h-6"/>
      </button>
      <h2 class="text-2xl font-bold mb-4">Add New Product</h2>
      <form @submit.prevent="addProduct">
        <div class="mb-4">
          <label class="block text-gray-700">Image URL</label>
          <input type="text" v-model="newProduct.image" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="https://via.placeholder.com/640x480.png/008877?text=products+quae">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Product Name</label>
          <input type="text" v-model="newProduct.productname" class="w-full p-2 border border-gray-300 rounded mt-1">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Owner ID</label>
          <input type="number" v-model="newProduct.ownerId" class="w-full p-2 border border-gray-300 rounded mt-1">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Location</label>
          <input type="text" v-model="newProduct.location" class="w-full p-2 border border-gray-300 rounded mt-1">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Category</label>
          <input type="text" v-model="newProduct.category" class="w-full p-2 border border-gray-300 rounded mt-1">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Link Location</label>
          <input type="text" v-model="newProduct.linklocation" class="w-full p-2 border border-gray-300 rounded mt-1">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Price</label>
          <input type="number" v-model="newProduct.price" class="w-full p-2 border border-gray-300 rounded mt-1">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Facilities</label>
          <input type="text" v-model="newProduct.fasilitas" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Comma-separated values">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Room ID</label>
          <input type="number" v-model="newProduct.roomid" class="w-full p-2 border border-gray-300 rounded mt-1">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">About</label>
          <textarea v-model="newProduct.about" class="w-full p-2 border border-gray-300 rounded mt-1"></textarea>
        </div>
        <div class="flex justify-end">
          <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded mr-2" @click="showAddModal = false">Cancel</button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faEllipsisV, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import Sidebar from "@/components/sidebar.vue";

const products = ref([]);
const isLoading = ref(true);
const errorMessage = ref('');
const showMenu = ref(null); // To keep track of which product's menu is shown
const showAddModal = ref(false); // To control the visibility of the add product modal
const newProduct = ref({
  image: '',
  productname: '',
  ownerId: null,
  location: '',
  category: '',
  linklocation: '',
  price: null,
  fasilitas: '',
  roomid: null,
  about: ''
});

// Fetch data from the API
const fetchData = async () => {
  try {
    const response = await axios.get('https://api.nearus.id/api/product');
    products.value = response.data.data;
    isLoading.value = false;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    errorMessage.value = 'Failed to load products. Please try again later.';
    isLoading.value = false;
  }
};

// Toggle menu visibility
const toggleMenu = (kostid) => {
  if (showMenu.value === kostid) {
    showMenu.value = null;
  } else {
    showMenu.value = kostid;
  }
};

// Delete product
const deleteProduct = async (kostid) => {
  try {
    await axios.delete(`https://api.nearus.id/api/product/delete/${kostid}`);
    products.value = products.value.filter(product => product.kostid !== kostid);
  } catch (error) {
    console.error('Failed to delete product:', error);
    alert('Failed to delete product. Please try again later.');
  }
};

// Edit product (placeholder function)
const editProduct = (kostid) => {
  alert(`Edit product with ID: ${kostid}`);
};

// Add new product
const addProduct = async () => {
  try {
    const newProductData = {
      image: [newProduct.value.image],
      productname: newProduct.value.productname,
      ownerId: newProduct.value.ownerId,
      location: newProduct.value.location,
      category: newProduct.value.category,
      linklocation: newProduct.value.linklocation,
      price: newProduct.value.price,
      fasilitas: newProduct.value.fasilitas.split(',').map(f => f.trim()),
      roomid: newProduct.value.roomid,
      about: newProduct.value.about
    };

    const response = await axios.post('https://api.nearus.id/api/product', newProductData);
    products.value.push(response.data.data);
    showAddModal.value = false;
    resetNewProductForm();
  } catch (error) {
    console.error('Failed to add product:', error);
    alert('Failed to add product. Please try again later.');
  }
};

// Reset new product form
const resetNewProductForm = () => {
  newProduct.value = {
    image: '',
    productname: '',
    ownerId: null,
    location: '',
    category: '',
    linklocation: '',
    price: null,
    fasilitas: '',
    roomid: null,
    about: ''
  };
};

onMounted(fetchData);
</script>


<style lang="scss" scoped>
.modal-content {
  max-width: 90%;
  max-height: 80%;
  overflow-y: auto;
}
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
}
</style>

