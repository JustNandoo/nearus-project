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
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChild } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
</style>
