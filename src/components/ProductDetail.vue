<template>
  <div class="container ml-36 pt-32">
    <div v-if="error" class="error">
      Error fetching images: {{ error }}
    </div>
    <div v-if="images.length" class="gallery">
      <swiper :slides-per-view="1" :space-between="10" pagination="true" navigation="true">
        <swiper-slide v-for="(image, index) in images" :key="index">
          <img :src="image" :alt="'Image ' + (index + 1)" class="object-cover rounded-lg shadow-lg w-full h-auto" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

// Import Swiper Vue components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

const images = ref([
  'https://via.placeholder.com/600x400',
  'https://via.placeholder.com/300x200',
  'https://via.placeholder.com/300x200',
  'https://via.placeholder.com/300x200',
  'https://via.placeholder.com/300x200',
]);

const error = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('https://nearus.id/api/product');
    console.log('API Response:', response);
    const data = response.data.data;
    console.log('Data:', data);

    if (data && data.length > 10 && data[10].image.length >= 5) {
      images.value = data[10].image;
    } else {
      error.value = 'Error: Insufficient data. Ensure that data[10] exists and has at least 5 images.';
    }
  } catch (err) {
    error.value = 'Error fetching product data: ' + err.message;
    console.error(error.value);
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
.gallery {
  width: 100%;
}
img {
  object-fit: cover;
  border-radius: 0.75rem; /* Adjust as needed */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adjust as needed */
}
</style>
