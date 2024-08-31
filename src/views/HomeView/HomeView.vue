<template>
  <div class="bg-white p-0 m-0 relative">
    <CarouselHome />
    <div class="main ml-20 mt-20">
      <h1 class="font-extrabold text-3xl">Mitra Kost Kami</h1>
      <div class="grid grid-cols-4 gap-4">
        <ProductCard v-for="product in displayedProducts" :key="product.kostid" :product="product" :isLoading="isLoading" />
        <ProductCard v-if="isLoading" v-for="n in 4" :key="'loading-' + n" :isLoading="true" />
      </div>
      <div class="flex justify-center mt-10 mb-20">
        <button
            class="bg-blue-primary flex items-center px-2 py-3 justify-center gap-5 w-[250px] rounded-lg text-white text-[22px] font-medium shadow-lg relative"
            @click="loadMoreProducts"
            :disabled="isLoadingMore"
        >
          <span v-if="isLoadingMore" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span v-else>Lihat Lebih Banyak</span>
        </button>
      </div>
      <h1 class="font-extrabold text-3xl">Cari Kos Sesuai Kategori</h1>
      <PriceSortCard />
      <div class="grid grid-cols-4 gap-4">
        <ProductCard v-for="product in displayedProducts" :key="product.id" :product="product" :isLoading="isLoading" />
        <ProductCard v-if="isLoading" v-for="n in 4" :key="'loading-' + n" :isLoading="true" />
      </div>
      <div class="flex justify-center mt-10 mb-20">
        <button
            class="bg-blue-primary flex items-center px-2 py-3 justify-center gap-5 w-[250px] rounded-lg text-white text-[22px] font-medium shadow-lg relative"
            @click="loadMoreProducts"
            :disabled="isLoadingMore"
        >
          <span v-if="isLoadingMore" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span v-else>Lihat Lebih Banyak</span>
        </button>
      </div>
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
import PriceSortCard from "@/components/Home/PriceSortCard.vue";
import ProfileCard from "@/components/Profile/ProfileCard.vue";
import FooterComponent from "@/components/Pages/Footer.vue";
import Chatbot from "@/components/Chat/ChatBot.vue";

const showProfileCard = ref(false);
const allProducts = ref([]); // Store all products
const displayedProducts = ref([]); // Store currently displayed products
const isLoading = ref(true);
const isLoadingMore = ref(false); // Loading state for the "Lihat Semua" button
const productsToShow = ref(4); // Number of products to display at a time

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
  if (isLoadingMore.value) return; // Prevent multiple requests
  isLoadingMore.value = true;
  try {
    const currentLength = displayedProducts.value.length;
    const nextProducts = allProducts.value.slice(currentLength, currentLength + productsToShow.value);
    displayedProducts.value = [...displayedProducts.value, ...nextProducts];
  } catch (error) {
    console.error('Error loading more products:', error);
  } finally {
    isLoadingMore.value = false;
  }
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
