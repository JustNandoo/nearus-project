<template>
  <div class="container">
    <!-- Single Image Layout -->
    <div v-if="images.length === 1" class="single-image">
      <div class="image-wrapper">
        <img :src="images[0]" alt="Single Image" class="image" @click="openModal(0)">
      </div>
    </div>

    <!-- Two Images Layout -->
    <div v-else-if="images.length === 2" class="two-images">
      <div class="image-wrapper">
        <img v-for="(img, index) in images" :key="index" :src="img" alt="Image" class="image" @click="openModal(index)">
      </div>
    </div>

    <!-- Three or Four Images Layout -->
    <div v-else class="main-and-thumbnails">
      <!-- Main Image with Transition -->
      <div class="main-image">
        <div class="image-wrapper">
          <transition name="fade">
            <img :src="mainImage" alt="Main Image" class="image" @click="openModal(mainImageIndex)">
          </transition>
        </div>
      </div>

      <!-- Thumbnail Images in 2x2 Layout -->
      <div class="thumbnail-images">
        <div v-for="(img, index) in images.slice(0, 3)" :key="index" class="thumbnail-wrapper">
          <img :src="img" alt="Thumbnail" class="thumbnail-image hover:opacity-50 transition-opacity duration-300"
               :class="{ 'selected': mainImage === img }"
               @click="selectImage(img)">
        </div>
        <!-- Full View Thumbnail with Camera Icon -->
        <div v-if="images.length > 3" class="thumbnail-wrapper full-view-thumbnail relative">
          <img :src="images[3]" alt="Full View" class="thumbnail-image hover:opacity-50 transition-opacity duration-300"
               @click="openModal(3)">
          <i class="fas fa-camera absolute inset-0 flex justify-center items-center text-white text-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" @click="openModal(3)"></i>
        </div>
      </div>
    </div>

    <!-- Modal for Full View with Image Transition -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center z-50" @click="closeModal">
      <div class="relative bg-white p-4 rounded-lg w-[900px] h-[520px] overflow-hidden" @click.stop>
        <button class="absolute top-4 right-4 text-2xl text-gray-700 hover:text-gray-900" @click="closeModal"></button>
        <div class="relative flex justify-center items-center h-full">
          <transition name="fade">
            <img :src="images[currentIndex]" class="w-[800px] h-[470px] object-cover">
          </transition>
          <button class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full" @click="prevImage">&lt;</button>
          <button class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full" @click="nextImage">&gt;</button>
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
const mainImageIndex = ref(0);

// Update mainImage whenever images prop changes
watch(() => props.images, (newImages) => {
  if (newImages.length > 0) {
    mainImage.value = newImages[0];
    mainImageIndex.value = 0;
  }
}, { immediate: true });

function selectImage(image, index) {
  mainImage.value = image;
  mainImageIndex.value = index;
}

function openModal(index) {
  isModalOpen.value = true;
  currentIndex.value = index;
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
/* Container Styles */
.container {
  display: flex;
  justify-content: center;
  padding-top: 8rem;
  margin-left: 11rem;
}

/* Single Image Layout */
.single-image {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: hidden; /* Hide overflow to allow image to be clipped */
  margin-left: calc(50% - 50vw); /* Center image and maintain large margins */
  margin-right: calc(50% - 50vw); /* Center image and maintain large margins */
}

.single-image .image {
  width: 1650px;
  height: 600px; /* Full viewport height for large images */
  object-fit: cover; /* Cover ensures the image covers the container without distortion */
  border-radius: 1rem;
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
  border-radius: 5px;
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
  height: 500px;
  object-fit: cover;
  border-radius: 20px;
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
  height: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  cursor: pointer;
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
}

.thumbnail-image:hover {
  opacity: 0.7;
}

.thumbnail-image.selected,
.thumbnail-image:focus,
.thumbnail-image:active {
  opacity: 0.8;
}

.full-view-thumbnail.selected,
.full-view-thumbnail:focus,
.full-view-thumbnail:active {
  opacity: 0.8;
}


.full-view-thumbnail {
  position: relative;
}

/* Camera Icon on Hover */
.full-view-thumbnail .fa-camera {
  opacity: 0;
  transition: opacity 0.3s;
}

.full-view-thumbnail:hover .fa-camera {
  opacity: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Modal Styles */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal-content {
  position: relative;
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  overflow: hidden;
  width: 80%;
  max-width: 900px;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-images-container {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.modal-image-wrapper {
  flex: 1;
  overflow: hidden;
}

.modal-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Close button */
.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  cursor: pointer;
}

/* Navigation buttons */
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
  }
}
</style>
