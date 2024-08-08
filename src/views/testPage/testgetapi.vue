<template>
  <div v-if="product">
    <h1>{{ product.productname }}</h1>
    <p>{{ product.location }}</p>
    <p>{{ product.about }}</p>
    <ul>
      <li v-for="facility in product.fasilitas" :key="facility">{{ facility }}</li>
    </ul>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const product = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('https://api.nearus.id/api/product');
    console.log('API Response:', response);
    product.value = response.data.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
});
</script>

<style lang="scss" scoped>
/* Add your scoped styles here */
</style>
