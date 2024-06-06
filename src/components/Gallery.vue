<template>
  <div class="container ml-36 pt-32">
    <div class="grid grid-cols-5 w-auto">
      <div class="col-span-3 row-span-2">
        <img :src="images[0]" alt="Image 1" class="w-full h-[560px] object-cover rounded-lg shadow-lg">
      </div>
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
import { onMounted, ref } from 'vue';
import axios from 'axios';

const images = ref([
  'https://via.placeholder.com/600x400',
  'https://via.placeholder.com/300x200',
  'https://via.placeholder.com/300x200',
  'https://via.placeholder.com/300x200',
  'https://via.placeholder.com/300x200',
]);

onMounted(async () => {
  try {
    const response = await axios.get('https://nearus.id/api/product');
    console.log('API Response:', response);
    const data = response.data.data;
    console.log('Data:', data);

    if (data && data.length > 10 && data[10].image.length >= 5) {
      images.value = data[10].image;
    } else {
      console.error('Error: Insufficient data. Ensure that data[10] exists and has at least 5 images.');
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
});
</script>

<style scoped>
.container {
  margin-left: 9rem; /* Adjust as needed */
  padding-top: 8rem; /* Adjust as needed */
}
.error {
  color: red;
}
.grid {
  width: auto;
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
img {
  object-fit: cover;
  border-radius: 0.75rem; /* Adjust as needed */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adjust as needed */
}
</style>
