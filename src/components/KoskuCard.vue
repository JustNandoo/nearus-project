<template>
  <div class="w-[60%] border-[1px] h-[200px] rounded-lg border-neutral-600">
    <img src="" class="w-30%" alt="">
  </div>
</template>

<script setup>
import axios from "axios";
import {ref} from "vue";
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
</script>

<style lang="scss" scoped>

</style>