<template>
  <div class="flex justify-center pt-32 mx-28">
    <!-- Single Image Layout -->
    <div v-if="images.length === 1" class="flex justify-center items-center w-full overflow-hidden">
      <img :src="images[0]" alt="Single Image" class="w-[1620px] h-[600px] object-cover rounded-xl" @click="openModal(0)">
    </div>

    <!-- Two Images Layout -->
    <div v-else-if="images.length === 2" class="flex flex-col gap-4 w-full">
      <img v-for="(img, index) in images" :key="index" :src="img" alt="Image" class="w-full h-[270px] object-cover rounded-md shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105" @click="openModal(index)">
    </div>

    <!-- Three or Four Images Layout -->
    <div v-else class="flex gap-4">
      <!-- Main Image with Transition -->
      <div class="flex-3">
        <transition name="fade">
          <img :src="mainImage" alt="Main Image" class="w-[1000px]  h-[600px] object-cover rounded-xl" @click="openModal(mainImageIndex)">
        </transition>
      </div>

      <!-- Thumbnail Images in 2x2 Layout -->
      <div class="flex-1 grid grid-cols-2 gap-4">
        <!-- Thumbnail Images -->
        <div v-for="(img, index) in images.slice(0, 3)" :key="index" class="relative">
          <img :src="img" alt="Thumbnail" class="w-[290px] h-[290px] object-cover cursor-pointer rounded-lg shadow-md transition-opacity duration-300 ease-in-out hover:opacity-70"
               :class="{ 'opacity-80': mainImage === img }"
               @click="selectImage(img, index)">
        </div>
        <!-- Full View Thumbnail with Camera Icon -->
        <div v-if="images.length > 3" class="relative">
          <!-- Full View Image -->
          <img :src="images[3]" alt="Full View" class="w-[290px] h-[290px] object-cover cursor-pointer rounded-lg shadow-md transition-opacity duration-300 ease-in-out hover:opacity-70"
               @click="openModal(3)">

          <!-- Camera Icon and Text -->
          <div class="absolute inset-0 flex flex-col justify-center items-center text-white text-2xl bg-black bg-opacity-25 hover:underline rounded-lg cursor-pointer" @click="openModal(3)">
            <i class="fas fa-camera mb-2 "></i>
            <span class="text-xs">Image Detail</span>
          </div>
        </div>



        <!-- Modal for Full View with Image Transition -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center z-50" @click="closeModal">
      <div class="relative bg-white rounded-lg w-full max-w-[980px] p-8 overflow-hidden shadow-lg animate__animated animate__fadeIn animate__faster" @click.stop>
        <!-- Close Button -->
        <button class="absolute top-4 right-4 text-2xl text-gray-800" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>

        <!-- Modal Header -->
        <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">Detail Image</h2>

        <!-- Image and Navigation -->
        <div class="relative flex justify-center items-center">
          <!-- Image without Transition -->
          <img :src="images[currentIndex]" :key="currentIndex" class="w-full max-w-[840px] h-[480px] object-cover rounded-lg shadow-md">

          <!-- Navigation Buttons -->
          <div class="absolute inset-y-1/2 flex justify-between w-full px-4">
            <!-- Left Navigation Button -->
            <button class="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-300 ease-in-out transform -translate-x-6" @click="prevImage">
              <i class="fas fa-chevron-left text-lg"></i>
            </button>

            <!-- Right Navigation Button -->
            <button class="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-300 ease-in-out transform translate-x-6" @click="nextImage">
              <i class="fas fa-chevron-right text-lg"></i>
            </button>
          </div>
        </div>
      </div>
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
