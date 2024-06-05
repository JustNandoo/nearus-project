<template>
    <div class="w-[1599px] h-[322px] relative">
       <div class="w-[374px] h-[37px] left-[612px] top-0 absolute text-black text-3xl font-bold font-['Montserrat']">Dokumentasi Website</div>
       <div class="w-[1599px] h-[238px] left-0 top-[84px] absolute">
           <img class="w-[259px] h-[238px] left-0 top-0 absolute" :src="imageVue" />
           <img class="w-[259px] h-[238px] left-[335px] top-0 absolute" :src="imageTailwind" />
           <img class="w-[259px] h-[238px] left-[670px] top-0 absolute" :src="imagePHP" />
           <img class="w-[259px] h-[238px] left-[1005px] top-0 absolute" :src="imageLaravel" />
           <img class="w-[259px] h-[238px] left-[1340px] top-0 absolute" :src="imageVite" />
       </div>
   </div>
   </template>
   
   <script>
   import imagePHP from '../assets/images/php_icon.png';
   import imageLaravel from '../assets/images/laravel_icon.png';
   import imageVue from '../assets/images/vue_icon.png';
   import imageTailwind from '../assets/images/tailwind_icon.png';
   import imageVite from '../assets/images/vite_icon.png';
   
   export default {
     
     data() {
       return {
         imagePHP,
         imageLaravel,
         imageVue,
         imageTailwind,
         imageVite
       };
     },
   };
   </script>
   
   <style lang="scss" scoped>
   
   </style>
   