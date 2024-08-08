<template>
  <div class="container mx-auto pt-32">
    <div class="grid grid-cols-5 gap-4">
      <!-- Main Image -->
      <div class="col-span-3 row-span-2">
        <img :src="images[0]" alt="Main Image" class="main-image" v-if="images.length > 0">
      </div>
      <!-- Secondary Images -->
      <div class="col-span-2 flex flex-col gap-4">
        <div class="flex gap-4">
          <img :src="images[1]" alt="Image 2" class="secondary-image" v-if="images.length > 1">
          <img :src="images[2]" alt="Image 3" class="secondary-image" v-if="images.length > 2">
        </div>
        <div class="flex gap-4">
          <img :src="images[3]" alt="Image 4" class="secondary-image" v-if="images.length > 3">
          <img :src="images[4]" alt="Image 5" class="secondary-image" v-if="images.length > 4">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
.container {
  padding-top: 8rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
.main-image {
  width: 100%;
  height: 560px;
  object-fit: cover;
  border-radius: 0.75rem; /* 12px */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.secondary-image {
  width: 330px;
  height: 270px;
  object-fit: cover;
  border-radius: 0.75rem; /* 12px */
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
