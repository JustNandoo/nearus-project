<template>
  <Nav/>
  <div class="head relative overflow-hidden rounded-b-3xl">
    <div class="carousel w-screen relative">
      <transition-group name="slide" tag="div">
        <div v-for="(item, index) in items" :key="index" v-show="currentIndex === index" class=" w-screen h-min bg-gray-300 flex items-center justify-center">
          <img :src="item.image" :alt="item.alt" class="max-h-screen max-w-screen mx-auto">
        </div>
      </transition-group>
      <div class="herotxt absolute inset-0 flex flex-col items-start justify-center px-6">
        <HeroText />
        <div class="mt-4 w-full">
          <SearchBar/>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 right-0 flex space-x-2 mr-12 mb-6">
      <button v-for="(item, index) in items" :key="index" @click="goToSlide(index)" :style="{transform: 'translateX(${-250*(currentIndex-1)}px)'}" :class="['h-5', 'w-5', 'rounded-full', 'border-2', {'bg-white': currentIndex === index, 'bg-transparent': currentIndex !== index}, 'focus:outline-none']"></button>
    </div>
    <div class="absolute bottom-0 left-0 mb-6 ml-16 p-2 bg-black bg-opacity-50 rounded-md">
      <p class="text-white text-sm">{{ text }}</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import HeroText from "@/components/HeroText.vue";
import SearchBar from "@/components/SearchBar.vue";
import Nav from "@/components/Nav.vue";

const currentIndex = ref(0);
const items = [
  { image: '../src/assets/images/carouseltesimg2.png', alt: 'Image 1', text: 'Berong-Kost 2' },
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
  }, 3000);
});

</script>

<style scoped>
.carousel {
  display: flex;
  transition: transform 0.3s ease;
}

.head {
  border-bottom-left-radius: 80px;
  border-bottom-right-radius: 80px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.herotxt {
  position: absolute;
  top: 65%;
  left: 42%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.navigation button {
  background-color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>


