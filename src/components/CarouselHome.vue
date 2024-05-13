<template>
  <div class="head relative overflow-hidden rounded-b-3xl">
    <div class="carousel w-screen">
      <transition-group name="slide" tag="div">
        <div v-for="(item, index) in items" :key="index" v-show="currentIndex === index" class="w-screen h-min bg-gray-300 flex items-center justify-center">
          <img :src="item.image" :alt="item.alt" class="max-h-screen max-w-screen mx-auto">
        </div>
      </transition-group>
    </div>
    <div class="absolute bottom-0 right-0 flex space-x-2 mr-12 mb-6 ">
      <button v-for="(item, index) in items" :key="index" @click="goToSlide(index)" :class="['h-5', 'w-5', 'rounded-full', 'border-2', {'bg-white': currentIndex === index, 'bg-transparent': currentIndex !== index}, 'focus:outline-none']"></button>
    </div>
    <div class="absolute bottom-0 left-0 mb-6 ml-12 p-4 bg-black bg-opacity-50 rounded-lg">
      <p class="text-white">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentIndex = ref(0);
const items = [
  { image: '../src/assets/images/carouseltesimg2.png', alt: 'Image 1', text: 'Text for Slide 1' },
  { image: '../src/assets/images/carouseltesimg2.png', alt: 'Image 2', text: 'Text for Slide 2' },
  { image: '../src/assets/images/carouseltesimg2.png', alt: 'Image 3', text: 'Text for Slide 3' },
  { image: '../src/assets/images/carouseltesimg2.png', alt: 'Image 4', text: 'Text for Slide 4' },
  { image: '../src/assets/images/carouseltesimg2.png', alt: 'Image 5', text: 'Text for Slide 5' },
];

const text = ref(items[currentIndex.value].text);

function goToSlide(index) {
  currentIndex.value = index;
  text.value = items[index].text;
}

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % items.length;
    text.value = items[currentIndex.value].text;
  }, 5000); // Adjust the interval (in milliseconds) as needed
});
</script>

<style>
.carousel {
  display: flex;
  transition: transform 0.3s ease;
}

.head{
  border-bottom-left-radius: 80px;
  border-bottom-right-radius: 80px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); /* Box shadow */
}

</style>
