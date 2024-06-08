<template>
  <router-link to="/detail-kost">
  <div class="mt-10 product-card h-full w-[400px]" v-if="product">
    <img class="w-full h-[220px] rounded-lg object-cover" :src="product.image[0]" alt="Product Image">
    <div class="flex mt-4 gap-4 text-[20px] items-center">
      <font-awesome-icon class="text-black w-6 h-6" :icon="faChild" />
      <p class="font-normal text-[16px]">{{ product.category }}</p>
    </div>
    <div class="mt-3">
      <h1 class="font-bold text-[20px]">{{ product.productname }}</h1>
    </div>
    <div class="mt-3">
      <h1 class="font-normal text-[15px]">{{ product.location }}</h1>
    </div>
    <div class="mt-3">
      <h1 class="font-normal text-[15px]">Mulai dari <span class="font-bold">{{ product.price }}</span>/Bulan</h1>
    </div>
  </div>
</router-link>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChild } from '@fortawesome/free-solid-svg-icons';

const product = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('https://nearus.id/api/product');
    console.log('API Response:', response);

    const data = response.data.data;

    if (data && data.length > 0) {
      product.value = {
        image: data[10].image,
        productname: data[10].productname,
        location: data[10].location,
        category: data[10].category,
        price: data[10].price
      };
    } else {
      console.error('Error fetching product data: No data received from API');
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
});
</script>

<style scoped>
</style>
