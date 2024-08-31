<template>
  <div>
    <NavSearch /> <!-- Navigation and search bar component -->
    <div class="container mx-auto p-6 mt-24 bg-white rounded-lg shadow-lg">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-extrabold text-gray-800">List Full Kos</h1>
        <div class="relative w-full max-w-md">
          <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Kos..."
              class="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              @input="filterProducts"
          />
          <i class="fas fa-search absolute top-3 right-4 text-gray-500"></i>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            :isLoading="isLoading"
        />
        <ProductCard
            v-if="isLoading"
            v-for="n in 4"
            :key="'loading-' + n"
            :isLoading="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import ProductCard from "@/components/Home/ProductCard.vue";
import NavSearch from "@/components/Pages/NavSearch.vue";

const products = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');

const fetchProducts = async () => {
  try {
    const response = await axios.get('https://api.nearus.id/api/product');
    products.value = response.data.data;
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching product data:', error);
    isLoading.value = false;
  }
};

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) {
    return products.value;
  }
  return products.value.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const filterProducts = () => {
  // This method is used to trigger the reactivity of computed property
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.container {
  max-width: 1200px; /* Adjust as needed */
}

.bg-white {
  background-color: white;
}

input[type="text"] {
  font-size: 1rem;
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
</style>
