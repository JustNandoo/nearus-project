<template>
  <footer class="bg-blue-primary w-screen h-[400px] text-white mt-32">
    <div class="py-8 border-b-2 border-white mx-10">
      <img class="w-[200px] h-full" :src="logowhite" alt="Logo">
    </div>
   <div class=" mx-10 mt-5 gap-10 flex items-center">
     <div class="">
       <p class="text-gray-100 text-[18px] mb-2">lokasi</p>
       <p class="text-white text-[20px]">Jalan Sukun Raya No.09, Besito Kulon, Besito, Kec.</p>
       <p class="text-white text-[20px]"> Gebog, Kabupaten Kudus, Jawa Tengah 59333</p>
     </div>
     <div class="">
       <p class="text-gray-100 text-[18px] mb-2">Hubungi Kami</p>
       <div class="flex items-center gap-4 mb-3">
         <img :src="logophone" alt="">
         <p class="text-[20px]">+62 895-3263-62332</p>
       </div>
       <div class="flex items-center gap-4">
         <img :src="logogmail" alt="">
         <p class="text-[20px]">nearuswebsite@gmail.com</p>
       </div>
     </div>
   </div>
  </footer>
</template>

<script setup>
import logowhite from '../assets/images/logowhite.png';
import logophone from '../assets/images/phone.png'
import logogmail from '../assets/images/gmail.png'

</script>

<style scoped>
/* Your styles here */
</style>
