<template>
  <div class="w-full max-w-screen-xl mx-auto p-6">
    <div class="flex justify-center mb-8">
      <div class="text-black text-3xl font-bold font-['Montserrat'] mr-2">Keuntungan Kos di</div>
      <div class="text-[#008dda] text-3xl font-bold font-['Montserrat']">NEARuS</div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="flex flex-col items-center">
        <img class="w-full max-w-xs rounded-[23px] shadow-lg transition-transform duration-300 transform hover:scale-105" :src="furnishImage" />
        <div class="text-black text-xl md:text-2xl font-bold font-['Montserrat'] text-center mt-4">Fully furnished</div>
      </div>
      <div class="flex flex-col items-center">
        <img class="w-full max-w-xs rounded-[23px] shadow-lg transition-transform duration-300 transform hover:scale-105" :src="amanImage" />
        <div class="text-black text-xl md:text-2xl font-bold font-['Montserrat'] text-center mt-4">Aman</div>
      </div>
      <div class="flex flex-col items-center">
        <img class="w-full max-w-xs rounded-[23px] shadow-lg transition-transform duration-300 transform hover:scale-105" :src="layananImage" />
        <div class="text-black text-xl md:text-2xl font-bold font-['Montserrat'] text-center mt-4">Layanan Menyeluruh</div>
      </div>
      <div class="flex flex-col items-center">
        <img class="w-full max-w-xs rounded-[23px] shadow-lg transition-transform duration-300 transform hover:scale-105" :src="bayarImage" />
        <div class="text-black text-xl md:text-2xl font-bold font-['Montserrat'] text-center mt-4">Pembayaran Fleksibel</div>
      </div>
    </div>
  </div>
</template>


<script setup>
import furnishImage from '../assets/images/furnish.webp';
import amanImage from '../assets/images/aman.jpg';
import layananImage from '../assets/images/layanan.webp';
import bayarImage from '../assets/images/bayar.webp';
</script>


<style lang="scss" scoped>
</style>
