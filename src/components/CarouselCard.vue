<template>
    <div class="w-[646px] h-[817px] relative overflow-hidden">
      <carousel
        :per-page-custom="[[1, 2, 3]]"
        :autoplay="false"
        ref="carousel"
      >
        <slide v-for="(slide, index) in slides" :key="index" :style="{ backgroundImage: `url(${slide.image})` }">
          <div class="w-full h-full flex justify-center items-center text-center">
            <div>
              <h2 class="text-2xl font-bold mb-4 text-txt-black">{{ slide.heading }}</h2>
              <p class="text-lg text-txt-black">{{ slide.content }}</p>
            </div>
          </div>
        </slide>
      </carousel>
      <div class="absolute bottom-4 left-0 right-0 flex justify-center">
        <button @click="prevSlide" class="mx-1">&lt;</button>
        <button @click="nextSlide" class="mx-1">&gt;</button>
      </div>
    </div>
  </template>
  
  <script>
  import { Carousel, Slide } from 'vue-carousel';
  
  export default {
    components: {
      Carousel,
      Slide,
    },
    data() {
      return {
        slides: [
          {
            heading: 'Anda anak merantau?',
            content: 'Kesulitan mencari kos? Banyak kos yang tidak cocok?',
            image: require('@/assets/images/bg-loginPage.png'),
          },
          {
            heading: 'Nearus hadir sebagai platform',
            content: 'Website pencari kos disekitar anda dengan kriteria yang sesuai.',
            image: require('@/assets/images/bg-loginPage.png'),
          },
          {
            heading: 'Heading Slide 3',
            content: 'Content Slide 3',
            image: require('@/assets/images/bg-loginPage.png'),
          },
        ],git
        currentSlide: 0,
      };
    },
    methods: {
      nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
          this.currentSlide++;
          this.$refs.carousel.goToPage(this.currentSlide);
        } else {
          this.currentSlide = 0;
          this.$refs.carousel.goToPage(this.currentSlide);
        }
      },
      prevSlide() {
        if (this.currentSlide > 0) {
          this.currentSlide--;
          this.$refs.carousel.goToPage(this.currentSlide);
        } else {
          this.currentSlide = this.slides.length - 1;
          this.$refs.carousel.goToPage(this.currentSlide);
        }
      },
    },
  };
  </script>
  
  <style>
  .carousel__container {
    height: 100%;
  }
  
  h2, p {
    font-family: 'Montserrat', sans-serif;
  }
  </style>
  