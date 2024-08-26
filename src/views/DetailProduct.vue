<template>
  <div class="flex">
    <div class="flex flex-col w-full p-4">
      <div class="flex items-center gap-2 mb-4">
        <FontAwesomeIcon class="text-black cursor-pointer" :icon="faChevronLeft" @click="goBack" />
        <router-link to="/dashboard-kosku" class="text-black font-bold text-lg">Kembali</router-link>
      </div>
      <hr class="w-full bg-black h-[2px] mb-4" />
      <h1 class="text-center text-black font-bold text-2xl mb-4">Detail Kost</h1>
      <div class="bg-white shadow-lg rounded-lg p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <!-- Product Name -->
          <div class="flex flex-col">
            <label class="text-gray-600 font-semibold mb-1">Product Name</label>
            <input v-model="product.productname" type="text" class="p-2 border border-gray-300 rounded-md" />
          </div>
          <!-- Location -->
          <div class="flex flex-col">
            <label class="text-gray-600 font-semibold mb-1">Location</label>
            <input v-model="product.location" type="text" class="p-2 border border-gray-300 rounded-md" />
          </div>
          <!-- Category -->
          <div class="flex flex-col">
            <label class="text-gray-600 font-semibold mb-1">Category</label>
            <input v-model="product.category" type="text" class="p-2 border border-gray-300 rounded-md" />
          </div>
          <!-- Price -->
          <div class="flex flex-col">
            <label class="text-gray-600 font-semibold mb-1">Price</label>
            <input v-model="product.price" type="number" class="p-2 border border-gray-300 rounded-md" />
          </div>
          <!-- Duration -->
          <div class="flex flex-col">
            <label class="text-gray-600 font-semibold mb-1">Duration</label>
            <input v-model="product.duration" type="text" class="p-2 border border-gray-300 rounded-md" />
          </div>
        </div>
        <!-- Image Gallery -->
        <div class="mb-4">
          <label class="text-gray-600 font-semibold mb-1">Images</label>
          <div v-for="(image, index) in product.image" :key="index" class="mb-2 flex flex-col">
            <img :src="image" alt="Product Image" class="w-24 h-24 object-cover rounded-md mb-2" />
            <input type="file" @change="handleImageChange($event, index)" class="p-2 border border-gray-300 rounded-md" />
          </div>
        </div>
        <!-- Facilities -->
        <div class="mb-4">
          <label class="text-gray-600 font-semibold mb-1">Facilities</label>
          <div v-for="(facility, index) in product.fasilitas" :key="index" class="mb-2">
            <input v-model="product.fasilitas[index]" type="text" class="p-2 border border-gray-300 rounded-md w-full" />
          </div>
        </div>
        <!-- About -->
        <div class="mb-4">
          <label class="text-gray-600 font-semibold mb-1">About</label>
          <textarea v-model="product.about" rows="4" class="p-2 border border-gray-300 rounded-md w-full"></textarea>
        </div>
        <!-- Save Button -->
        <button @click="saveChanges" class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// Get router and route
const router = useRouter();
const route = useRoute();
const facilities = ref(""); // Initialize as an empty array
const rooms = ref([]);
const ownerId = ref(null);
const roomImages = ref([]);

const product = ref({
  productname: "",
  location: "",
  category: "",
  price: 0,
  duration: "",
  image: [],
  fasilitas: [],
  about: "",
  ownerId: null,
  roomid: null,
});

const fetchProductData = async () => {
  try {
    const response = await axios.get(`https://api.nearus.id/api/product/get/${productId}`);
    const selectedProduct = response.data;

    if (selectedProduct) {
      localStorage.setItem('produk', JSON.stringify({
        name: response.data.productname,
        location: response.data.location
      }));
      product.value = selectedProduct;
      facilities.value = selectedProduct.fasilitas;
      ownerId.value = selectedProduct.ownerId;
      roomImages.value = Array.isArray(selectedProduct.image) ? selectedProduct.image : [selectedProduct.image];
    } else {
      console.error('Error fetching product data: no data response');
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
};

onMounted(() => {
  fetchProductData();
});

function goBack() {
  router.push('/dashboard-kosku');
}

function handleImageChange(event, index) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      product.value.image[index] = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

async function saveChanges() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    if (!product.value.productname || !product.value.location || !product.value.category || !product.value.price || !product.value.fasilitas.length || !product.value.about) {
      alert('Please fill out all required fields.');
      return;
    }

    if (isNaN(product.value.price)) {
      alert('Price must be a number.');
      return;
    }

    const formData = new FormData();
    product.value.image.forEach((img, index) => {
      formData.append('images[]', img);
    });
    formData.append('productname', product.value.productname);
    formData.append('location', product.value.location);
    formData.append('category', product.value.category);
    formData.append('price', product.value.price);
    formData.append('duration', product.value.duration);
    formData.append('fasilitas', product.value.fasilitas.join(','));
    formData.append('about', product.value.about);

    const response = await axios.post('https://api.nearus.id/api/product/edit', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Product details saved:', response.data);
    // Navigate away or update the UI here
  } catch (error) {
    console.error('Failed to save product:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      alert(`Failed to save product. ${error.response.data.message || 'Please try again later.'}`);
    }
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
