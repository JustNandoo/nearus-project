<template>
  <div v-for="product in products" :key="product.id" class="w-[60%] border-[1px] border-neutral-600 h-[180px] rounded-lg flex m-5">
    <div v-if="isLoading">Loading...</div>
    <div v-else class="flex items-center gap-2 w-full p-2">
      <div class="w-[320px] h-[180px]">
        <img class="w-full h-full rounded-lg object-cover" :src="product.image[0]" alt="Product Image">
      </div>
      <div class="flex flex-col justify-between flex-1 h-full">
        <div>
          <h1 class="font-bold text-[20px]">{{ product.productname }}</h1>
          <hr class="my-2 w-full">
        </div>
        <button class="bg-[#008DDA] rounded-lg w-full">
          <a href="" class="text-white block text-center py-2">Manage</a>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const products = ref([]);
const isLoading = ref(true);

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

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

button a {
  text-decoration: none;
}
</style>
