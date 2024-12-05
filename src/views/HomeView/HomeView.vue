<template>
  <div class="bg-white p-0 m-0 relative">
    <CarouselHome />
    <div class="main ml-20 mt-20">
      <h1 class="font-extrabold text-3xl">Mitra Kost Kami</h1>
      <div class="grid grid-cols-4 gap-4">
        <ProductCard
            v-for="product in displayedProducts"
            :key="product.kostid"
            :product="product"
            :isLoading="isLoading"
        />
        <ProductCard v-if="isLoading" v-for="n in 4" :key="'loading-' + n" :isLoading="true" />
      </div>

      <div v-if="displayedProducts.length === 0 && !isLoading" class="text-center text-gray-500 mt-10">
        <p>No data available</p>
      </div>

      <div class="flex justify-center mt-20 mb-20">
        <button
            v-if="!showingLess"
            class="bg-blue-primary flex items-center px-2 py-3 justify-center gap-5 w-[250px] rounded-lg text-white text-[22px] font-medium shadow-lg relative"
            @click="loadMoreProducts"
            :disabled="isLoadingMore"
        >
          <span v-if="isLoadingMore" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span v-else>Lihat Lebih Banyak</span>
        </button>
        <button
            v-if="showingLess"
            class="bg-blue-primary flex items-center px-2 py-3 justify-center gap-5 w-[250px] rounded-lg text-white text-[22px] font-medium shadow-lg relative"
            @click="showLessProducts"
        >
          <span>Lihat Lebih Sedikit</span>
        </button>
      </div>

      <CategoryFilter :allProducts="displayedProducts" :isLoading="isLoading" />
    </div>
    <ProfileCard v-if="showProfileCard" class="profile-card"/>
    <Chatbot />
    <FooterComponent/>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';

import CarouselHome from "@/components/Home/CarouselHome.vue";
import ProductCard from "@/components/Home/ProductCard.vue";
import CategoryFilter from "@/components/Home/PriceSortCard.vue";
import ProfileCard from "@/components/Profile/ProfileCard.vue";
import FooterComponent from "@/components/Pages/Footer.vue";
import Chatbot from "@/components/Chat/ChatBot.vue";

const showProfileCard = ref(false);
const allProducts = ref([]);
const displayedProducts = ref([]);
const isLoading = ref(true);
const isLoadingMore = ref(false);
const productsToShow = ref(4);
const showingLess = ref(false); // New state for toggle

const fetchProducts = async () => {
  try {
    const response = await axios.get('https://api.nearus.id/api/product');
    allProducts.value = response.data.data;
    displayedProducts.value = allProducts.value.slice(0, productsToShow.value);
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching product data:', error);
    isLoading.value = false;
  }
};

const loadMoreProducts = async () => {
  if (isLoadingMore.value) return;
  isLoadingMore.value = true;
  try {
    const currentLength = displayedProducts.value.length;
    const nextProducts = allProducts.value.slice(currentLength, currentLength + productsToShow.value);
    displayedProducts.value = [...displayedProducts.value, ...nextProducts];
    showingLess.value = true; // Show 'Less' button when more products are loaded
  } catch (error) {
    console.error('Error loading more products:', error);
  } finally {
    isLoadingMore.value = false;
  }
};

const showLessProducts = () => {
  displayedProducts.value = allProducts.value.slice(0, productsToShow.value);
  showingLess.value = false; // Hide 'Less' button when showing initial products
};

onMounted(() => {
  window.addEventListener('toggle-profile-card', toggleProfileCard);
  fetchProducts();
});

onBeforeUnmount(() => {
  window.removeEventListener('toggle-profile-card', toggleProfileCard);
});

const toggleProfileCard = () => {
  showProfileCard.value = !showProfileCard.value;
};
</script>


<style>
.bg-white {
  background-color: white;
}

.main {
  margin-left: 5rem;
  margin-right: 1.25rem;
  margin-top: 5rem;
}

.bg-blue-primary {
  background-color: #007bff;
}

.profile-card {
  position: absolute;
  top: 5rem;
  right: 2rem;
  z-index: 1100;
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
