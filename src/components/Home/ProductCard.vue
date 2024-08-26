<template>
  <router-link v-if="!isLoading" :to="{ name: 'detailkost', params: { id: product.id } }" class="product-card-link">
    <div class="mt-10 product-card h-full w-[400px]">
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
        <h1 class="font-normal text-[15px]">Mulai dari <span class="font-bold">{{product.price}}</span>/ {{product.duration}}</h1>
      </div>
    </div>
  </router-link>
  <div v-else class="mt-10 product-card h-full w-[400px] animate-pulse">
    <div class="bg-gray-300 w-full h-[220px] rounded-lg"></div>
    <div class="flex mt-4 gap-4 text-[20px] items-center">
      <div class="bg-gray-300 w-6 h-6 rounded-full"></div>
      <p class="bg-gray-300 w-1/4 h-6 rounded"></p>
    </div>
    <div class="mt-3 bg-gray-300 h-6 rounded w-3/4"></div>
    <div class="mt-3 bg-gray-300 h-6 rounded w-1/2"></div>
    <div class="mt-3 bg-gray-300 h-6 rounded w-1/4"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChild } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
/* Your styles here */
</style>
