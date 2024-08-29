<template>
  <div class="container">
    <!-- Single Image Layout -->
    <div v-if="images.length === 1" class="single-image">
      <img :src="images[0]" alt="Single Image" class="w-full h-[560px] object-cover rounded-lg shadow-lg">
    </div>

    <!-- Two Images Layout -->
    <div v-else-if="images.length === 2" class="two-images">
      <img v-for="(img, index) in images" :key="index" :src="img" alt="Image"
           class="w-full h-[270px] object-cover rounded-lg shadow-lg">
    </div>

    <!-- Three or More Images Layout -->
    <div v-else class="grid-layout">
      <!-- Main Image -->
      <div class="main-image">
        <img :src="images[0]" alt="Main Image" class="w-full h-[560px] object-cover rounded-lg shadow-lg">
      </div>
      <div class="thumbnail-images">
        <div class="row">
          <img v-for="(img, index) in images.slice(1, 3)" :key="index" :src="img" alt="Image"
               class="w-[330px] h-[270px] object-cover rounded-lg shadow-lg">
        </div>
        <div class="row">
          <img v-for="(img, index) in images.slice(3, 5)" :key="index" :src="img" alt="Image"
               class="w-[330px] h-[270px] object-cover rounded-lg shadow-lg">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';

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
  display: flex;
  justify-content: center;
}

/* Single Image Layout */
.single-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.single-image img {
  width: 100%; /* Make image fill the container */
  height: 400px; /* Fixed height for consistency */
  object-fit: cover; /* Maintain aspect ratio and cover container */
}

/* Two Images Layout */
.two-images {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.two-images img {
  width: 100%;
  height: 270px; /* Adjust as needed */
  object-fit: cover; /* Maintain aspect ratio and cover container */
}

/* Grid Layout for Three or More Images */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 1200px; /* Adjust based on your design */
  margin: 0 auto; /* Center grid layout */
}

.main-image {
  grid-column: span 3;
  grid-row: span 2;
}

.thumbnail-images {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 0.5rem;
}

.row {
  display: flex;
  gap: 1rem;
}

.grid-layout img {
  object-fit: cover;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  aspect-ratio: 16/9; /* Adjust based on your design */
}

</style>
