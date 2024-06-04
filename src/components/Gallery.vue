<template>
  <div class="container ml-36 pt-32">
    <div class="grid grid-cols-5 w-auto">
      <div class="col-span-3 row-span-2">
        <img v-if="images[0]" :src="images[0].url" alt="Image 1" class="w-full h-[560px] object-cover rounded-lg shadow-lg">
      </div>
      <div class="col-span-2 flex flex-col gap-4 px-5">
        <div class="flex gap-4">
          <img v-for="(image, index) in images.slice(1, 3)" :key="index" :src="image.url" alt="Image" class="w-[330px] h-[270px] object-cover rounded-lg shadow-lg">
        </div>
        <div class="flex gap-4">
          <img v-for="(image, index) in images.slice(3, 5)" :key="index" :src="image.url" alt="Image" class="w-[330px] h-[270px] object-cover rounded-lg shadow-lg">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const images = ref([
  { url: 'https://via.placeholder.com/600x400' },
  { url: 'https://via.placeholder.com/300x200' },
  { url: 'https://via.placeholder.com/300x200' },
  { url: 'https://via.placeholder.com/300x200' },
  { url: 'https://via.placeholder.com/300x200' },
]);

onMounted(async () => {
  try {
    const response = await axios.get('https://nearus.id/api/product');
    console.log('API Response:', response);
    const data = response.data.data;
    console.log('Data:', data);

    if (data && data.length > 0) {
      const productImages = data[11].images; // Adjust the index if needed
      images.value = productImages;
    } else {
      console.error('Error fetching product data: data[11] does not exist or has no images');
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
});
</script>

<style lang="scss" scoped>
</style>
