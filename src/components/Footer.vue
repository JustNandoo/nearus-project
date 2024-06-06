<template>
  <footer class="bg-blue-primary w-full h-[400px] text-white mt-32">
    <div class="py-8 border-b-2 border-white mx-10">
      <img class="w-[200px] h-full" :src="logowhite" alt="Logo">
    </div>
    <div class="mx-10 mt-5 flex justify-between">
      <div class="flex-1">
        <p class="text-gray-100 text-[18px] mb-2">Lokasi</p>
        <p class="text-white text-[20px]">Jalan Sukun Raya No.09, Besito Kulon, Besito, Kec.</p>
        <p class="text-white text-[20px]">Gebog, Kabupaten Kudus, Jawa Tengah 59333</p>
      </div>
      <div class="flex-1">
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
      <div class="flex-1">
        <p class="text-gray-100 text-[18px] mb-2">Ikuti Kami</p>
        <div class="flex gap-5 items-center">
          <a href="https://www.instagram.com/rzq_19_?igsh=MXgzazQyNXJtcHl1NQ==" target="_blank">
            <div
                class="border-2 border-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-white"
                @mouseenter="hoveringInstagram = true"
                @mouseleave="hoveringInstagram = false"
            >
              <img :src="hoveringInstagram ? logogram2 : logogram" class="w-5 h-5" alt="Instagram Logo">
            </div>
          </a>
          <a href="https://www.twitter.com" target="_blank">
            <div
                class="border-2 border-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-white"
                @mouseenter="hoveringTwitter = true"
                @mouseleave="hoveringTwitter = false"
            >
              <img :src="hoveringTwitter ? logotwit2 : logotwit" class="w-5 h-5" alt="Twitter Logo">
            </div>
          </a>
          <a href="https://www.facebook.com/danish.rizqy.1?mibextid=ZbWKwL" target="_blank">
            <div
                class="border-2 border-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-white"
                @mouseenter="hoveringFacebook = true"
                @mouseleave="hoveringFacebook = false"
            >
              <img :src="hoveringFacebook ? logofb2 : logofb" class="w-5 h-5" alt="Facebook Logo">
            </div>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import logowhite from '../assets/images/logowhite.png';
import logophone from '../assets/images/phone.png';
import logogmail from '../assets/images/gmail.png';
import logogram from '../assets/images/gram.png';
import logotwit from '../assets/images/twit.png';
import logofb from '../assets/images/fb.png';
import logogram2 from '../assets/images/gram2.png';
import logotwit2 from '../assets/images/twit2.png';
import logofb2 from '../assets/images/fb2.png';

const hoveringInstagram = ref(false);
const hoveringTwitter = ref(false);
const hoveringFacebook = ref(false);
</script>

<style scoped>
/* Your styles here */
</style>
