<template>
  <div class="container">
    <!-- Single Image Layout -->
    <div v-if="images.length === 1" class="single-image">
      <img :src="images[0]" alt="Single Image" class="image">
    </div>

    <!-- Two Images Layout -->
    <div v-else-if="images.length === 2" class="two-images">
      <img v-for="(img, index) in images" :key="index" :src="img" alt="Image" class="image">
    </div>

    <!-- Three or More Images Layout -->
    <div v-else class="grid-layout">
      <!-- Main Image -->
      <div class="main-image">
        <img :src="mainImage" alt="Main Image" class="image">
      </div>
      <div class="thumbnail-images">
        <div class="row">
          <img v-for="(img, index) in images.slice(1, 3)" :key="index + 1" :src="img" alt="Image"
               :class="{ 'selected': mainImage === img }" @click="selectImage(img, index + 1)" class="thumbnail-image">
        </div>
        <div class="row">
          <img v-for="(img, index) in images.slice(3, 5)" :key="index + 3" :src="img" alt="Image"
               :class="{ 'selected': mainImage === img }" @click="selectImage(img, index + 3)" class="thumbnail-image">
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, defineProps } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
});

// Reactive reference for the main image
const mainImage = ref('');

// Update mainImage whenever images prop changes
watch(() => props.images, (newImages) => {
  if (newImages.length > 0) {
    mainImage.value = newImages[0];
  }
}, {immediate: true});

// Method to handle image selection
function selectImage(image, index) {
  mainImage.value = image;
  console.log(`Image changed to ${image} (Index: ${index})`);
}
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

  width: 100%;
  margin-left: 6rem;
}

.single-image .image {
  width: 100%; /* Make image fill the container */
  height: 600px; /* Fixed height for consistency */
  object-fit: cover; /* Maintain aspect ratio and cover container */
  border-radius: 1rem; /* Rounded corners */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Enhanced shadow */
  transition: transform 0.3s, box-shadow 0.3s; /* Smooth transition */
}

/* Two Images Layout */
.two-images {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.two-images .image {
  width: 100%;
  height: 270px; /* Adjust as needed */
  object-fit: cover; /* Maintain aspect ratio and cover container */
  border-radius: 1rem; /* Rounded corners */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Enhanced shadow */
  transition: transform 0.3s, box-shadow 0.3s; /* Smooth transition */
}

/* Grid Layout for Three or More Images */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 1200px; /* Adjust based on your design */
  margin-right: 25rem; /* Remove auto margin */
  padding: 0 1rem; /* Add padding to shift grid to the left */
}

.main-image {
  grid-column: span 3;
  grid-row: span 3;
}

.main-image .image {
  height: 555px;
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

.thumbnail-image {
  width: 100%;
  height: 270px; /* Adjust height if necessary */
  object-fit: cover; /* Maintain aspect ratio and cover container */
  cursor: pointer; /* Pointer cursor to indicate clickable */
  border-radius: 1rem; /* Rounded corners */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Enhanced shadow */
  transition: transform 0.3s, box-shadow 0.3s; /* Smooth transition */
}


.grid-layout img {
  object-fit: cover;
  border-radius: 1rem; /* Rounded corners */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Enhanced shadow */
  aspect-ratio: 16/9; /* Adjust based on your design */
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .grid-layout {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid-layout {
    grid-template-columns: repeat(1, 1fr);
  }

  .main-image {
    grid-column: span 1;
    grid-row: span 1;
  }

  .thumbnail-images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
