<template>
  <div class="container ml-36 pt-32">
    <!-- Single Image Layout -->
    <div v-if="images.length === 1" class="single-image">
      <img :src="images[0]" alt="Single Image" class="w-full h-[560px] object-cover rounded-lg shadow-lg">
    </div>

    <!-- Two Images Layout -->
    <div v-else-if="images.length === 2" class="two-images">
      <img :src="images[0]" alt="Image 1" class="w-full h-[270px] object-cover rounded-lg shadow-lg">
      <img :src="images[1]" alt="Image 2" class="w-full h-[270px] object-cover rounded-lg shadow-lg">
    </div>

    <!-- Three or More Images Layout -->
    <div v-else class="grid-layout">
      <!-- Main Image -->
      <div class="col-span-3 row-span-2">
        <img :src="images[0]" alt="Main Image" class="w-full h-[560px] object-cover rounded-lg shadow-lg">
      </div>
      <!-- Secondary Images -->
      <div class="col-span-2 flex flex-col gap-4 px-5">
        <div class="flex gap-4">
          <img :src="images[1]" alt="Image 2" class="w-[330px] h-[270px] object-cover rounded-lg shadow-lg" v-if="images.length > 1">
          <img :src="images[2]" alt="Image 3" class="w-[330px] h-[270px] object-cover rounded-lg shadow-lg" v-if="images.length > 2">
        </div>
        <div class="flex gap-4">
          <img :src="images[3]" alt="Image 4" class="w-[330px] h-[270px] object-cover rounded-lg shadow-lg" v-if="images.length > 3">
          <img :src="images[4]" alt="Image 5" class="w-[330px] h-[270px] object-cover rounded-lg shadow-lg" v-if="images.length > 4">
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
  margin-left: 9rem;
  padding-top: 8rem;
}

/* Center single image */
.single-image {
  display: flex;
  justify-content: center;
  padding-left: 8rem;

}

.single-image img {
  width: 100%;
  height: 560px;
}

/* Center two images */
.two-images {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.two-images img {
  width: 100%;
  height: 270px;
}

/* Grid layout */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.col-span-3 {
  grid-column: span 3 / span 3;
}

.row-span-2 {
  grid-row: span 2 / span 2;
}

.grid-layout img {
  object-fit: cover;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
