<template>
  <div class="relative">
    <div v-if="imagesLoaded" class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(image, index) in images" :key="index" class="swiper-slide">
          <img :src="image.url" alt="Carousel Image" class="w-full" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div class="swiper-button-next flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-full">
      <span>Loading images...</span>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';

export default {
  data() {
    return {
      images: [
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/300x200',
        'https://via.placeholder.com/300x200',
        'https://via.placeholder.com/300x200',
        'https://via.placeholder.com/300x200',
      ],
      imagesLoaded: false
    };
  },
  async mounted() {
    await this.fetchImages();
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  },
  methods: {
    async fetchImages() {
      try {
        const response = await fetch('https://nearus.id/api/product');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        this.images = data.images;
        this.imagesLoaded = true;
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

  }
};
</script>

<style>
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
}

.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.swiper-button-prev,
.swiper-button-next {
  /* Tailwind styles added directly in template */
}
</style>
