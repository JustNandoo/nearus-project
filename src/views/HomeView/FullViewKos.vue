<template>
  <NavFixed />
  <div class="bg-white p-0 m-0 relative">
    <!-- Back Button -->
    <div class="absolute top-4 left-4 z-50">
      <button @click="goBack" class="text-gray-700 hover:text-gray-900 focus:outline-none">
        <i class="fas fa-arrow-left text-2xl"></i>
      </button>
    </div>
    <!-- Main Content -->
    <div class="main mt-24 px-4 sm:px-8 lg:px-16">
      <div class="flex items-center justify-between mb-8">
        <!-- Title -->
        <h2 class="text-3xl text-gray-900">Mitra Kost NeaRUS</h2>
        <!-- Search Bar -->
        <div class="relative w-full max-w-md">
          <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Kos..."
              class="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              @input="filterProducts"
          />
          <i class="fas fa-search absolute top-3 right-3 text-gray-500"></i>
        </div>
      </div>
      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard v-for="product in displayedProducts" :key="product.kostid" :product="product" :isLoading="isLoading" />
        <ProductCard v-if="isLoading" v-for="n in 4" :key="'loading-' + n" :isLoading="true" />
      </div>
      <div class="flex justify-center mt-10 mb-20">
        <!-- Button to load more products -->
      </div>
    </div>
    <ProfileCard v-if="showProfileCard" class="profile-card"/>
    <FooterComponent/>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

import NavFixed from "@/components/Pages/NavFixed.vue";
import ProductCard from "@/components/Home/ProductCard.vue";
import ProfileCard from "@/components/Profile/ProfileCard.vue";
import FooterComponent from "@/components/Pages/Footer.vue";

const showProfileCard = ref(false);
const allProducts = ref([]); // Store all products
const displayedProducts = ref([]); // Store currently displayed products
const isLoading = ref(true);
const searchQuery = ref('');

const fetchProducts = async () => {
  try {
    const response = await axios.get('https://api.nearus.id/api/product');
    allProducts.value = response.data.data;
    filterProducts(); // Filter products based on the initial search query
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching product data:', error);
    isLoading.value = false;
  }
};

const filterProducts = () => {
  if (!searchQuery.value.trim()) {
    displayedProducts.value = allProducts.value;
  } else {
    const query = searchQuery.value.toLowerCase();
    displayedProducts.value = allProducts.value.filter(product =>
        product.name.toLowerCase().includes(query)
    );
  }
};

const goBack = () => {
  window.history.back(); // Navigate to the previous page
};

onMounted(() => {
  fetchProducts();
});

// Watch for changes in searchQuery to automatically filter products
watch(searchQuery, filterProducts);
</script>

<style>
.bg-white {
  background-color: white;
}

.main {
  margin-left: 0;
  margin-right: 0;
  margin-top: 5rem;
}

.text-3xl {
  font-size: 1.875rem; /* Adjust font size */
}

input[type="text"] {
  font-size: 1rem; /* Adjust font size */
}

input[type="text"]::placeholder {
  color: #9ca3af;
}

input[type="text"]:focus {
  outline: none;
  border-color: #3b82f6; /* Tailwind Blue 500 */
}

input[type="text"] + .fa-search {
  pointer-events: none;
}

.profile-card {
  position: absolute;
  top: 5rem;
  right: 2rem;
  z-index: 1100;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

/* Spinner styling */
.spinner-border {
  border: 0.2em solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 0.2em solid #007bff;
  width: 1.5em;
  height: 1.5em;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
