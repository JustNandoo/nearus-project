<template>
    <Nav />
    <div>
      <div className="w-[1920px] h-[731px] relative">
        <div className="w-[1920px] h-[731px] left-0 top-0 absolute bg-sky-600 shadow" />
        <div className="w-[750px] left-[585px] top-[269px] absolute text-center text-white text-[44px] font-bold font-['Montserrat']">
          Sewa Kost Terpercaya Aman dan Mudah Serta Dengan Harga Terbaik Hanya Di NeaRuS
        </div>
        <div className="w-[563px] left-[679px] top-[479px] absolute text-center text-white text-lg font-medium font-['Montserrat']">
          Di NeaRuS, Anda dapat menemukan berbagai macam kost dengan kualitas terbaik dan harga terjangkau. Temukan hunian nyaman, aman, dan sesuai dengan kebutuhan Anda. NeaRuS menyediakan pilihan kost ideal untuk keseharian yang lebih baik.
        </div>
        <img className="w-[300px] h-[300px] left-[1504px] top-[60px] absolute" :src="imageLaptop" />
        <img className="w-[300px] h-[300px] left-[136px] top-[60px] absolute" :src="imageRating" />
        <img className="w-[300px] h-[300px] left-[1504px] top-[400px] absolute" :src="imageOrang" />
        <img className="w-[300px] h-[300px] left-[136px] top-[400px] absolute" :src="imagePenthouse" />
        <img className="w-[138px] h-[149px] left-[891px] top-[120px] absolute" :src="imageMedali" />
      </div>
    </div>
  </template>
  
  <script>
  import Nav from '@/components/Nav.vue';
  import imageLaptop from '../assets/images/laptop.png';
  import imageMedali from '../assets/images/medali.png';
  import imageOrang from '../assets/images/orang.png';
  import imagePenthouse from '../assets/images/penthouse.png';
  import imageRating from '../assets/images/rating.png';

  
  export default {
    components: {
      Nav,
    },
    data() {
      return {
        imageLaptop,
        imageMedali,
        imageOrang,
        imagePenthouse,
        imageRating,
        
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>

  </style>
  