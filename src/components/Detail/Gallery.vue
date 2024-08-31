<template>
  <div class="container">
    <!-- Single Image Layout -->
    <div v-if="images.length === 1" class="single-image">
      <div class="image-wrapper">
        <img :src="images[0]" alt="Single Image" class="image">
      </div>
    </div>

    <!-- Two Images Layout -->
    <div v-else-if="images.length === 2" class="two-images">
      <div class="image-wrapper">
        <img v-for="(img, index) in images" :key="index" :src="img" alt="Image" class="image">
      </div>
    </div>

    <!-- Three or Four Images Layout -->
    <div v-else class="main-and-thumbnails">
      <!-- Main Image -->
      <div class="main-image">
        <div class="image-wrapper">
          <img :src="mainImage" alt="Main Image" class="image">
        </div>
      </div>

      <!-- Thumbnail Images in 2x2 Layout -->
      <div class="thumbnail-images">
        <div v-for="(img, index) in images.slice(0, 3)" :key="index" class="thumbnail-wrapper">
          <img :src="img" alt="Thumbnail" class="thumbnail-image"
               :class="{ 'selected': mainImage === img }"
               @click="selectImage(img)">
        </div>
        <!-- Full View Thumbnail -->
        <div v-if="images.length > 3" class="thumbnail-wrapper full-view-thumbnail">
          <img :src="images[3]" alt="Full View" class="thumbnail-image"
               @click="openModal(3)">
        </div>
      </div>
    </div>

    <!-- Modal for Full View -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" @click="closeModal">
      <div class="relative bg-white p-6 rounded-lg overflow-hidden w-full max-w-4xl" @click.stop>
        <button class="absolute top-2 right-2 text-2xl text-gray-700 hover:text-gray-900" @click="closeModal">&times;</button>
        <div class="relative">
          <div class="flex justify-center items-center overflow-hidden h-96">
            <img v-for="(img, index) in images" :key="index" :src="img" alt="Full Image" class="absolute inset-0 transition-opacity duration-500" :class="{ 'opacity-100': currentIndex === index, 'opacity-0': currentIndex !== index }">
          </div>
          <button class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" @click="prevImage">&lt;</button>
          <button class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" @click="nextImage">&gt;</button>
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

// Reactive references for the main image and modal
const mainImage = ref('');
const isModalOpen = ref(false);
const currentIndex = ref(0);

// Update mainImage whenever images prop changes
watch(() => props.images, (newImages) => {
  if (newImages.length > 0) {
    mainImage.value = newImages[0];
  }
}, { immediate: true });

// Method to handle image selection
function selectImage(image) {
  mainImage.value = image;
}

// Methods for modal operations
function openModal(index) {
  isModalOpen.value = true;
  currentIndex.value = index; // Set the index of the image to be displayed in the modal
}

function closeModal() {
  isModalOpen.value = false;
}

function prevImage() {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
}

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding-top: 8rem;
  margin-left: 9rem;
}

/* Single Image Layout */
.single-image {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-left: 6rem;
}

.single-image .image {
  width: 100%;
  height: 600px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
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
  height: 270px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}

/* Main Image and Thumbnail Images Layout */
.main-and-thumbnails {
  display: flex;
  gap: 1rem;
}

.main-image {
  flex: 3;
}

.main-image .image {
  width: 100%;
  height: 555px;
  object-fit: cover;
}

.thumbnail-images {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.thumbnail-wrapper {
  width: 100%;
  height: 100%;
}

.thumbnail-image {
  width: 100%;
  height: 270px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}

.thumbnail-image.selected {
  position: relative;
}

.thumbnail-image.selected::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
}

/* Full View Thumbnail */
.full-view-thumbnail {
  border: 3px solid #007bff;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  width: 80%;
  max-width: 900px;
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  overflow: hidden;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  cursor: pointer;
}

.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.prev {
  left: 0;
}

.next {
  right: 0;
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .main-and-thumbnails {
    flex-direction: column;
  }

  .thumbnail-images {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .main-image {
    flex: 1;
  }

  .thumbnail-images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
