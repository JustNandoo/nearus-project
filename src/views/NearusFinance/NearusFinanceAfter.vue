<template>
  <div class="flex flex-col min-h-screen font-montserrat">
    <Nav />
    <div class="pt-[72px] flex-grow">
      <div class="relative w-full h-[286px] bg-[#008dda] shadow-lg flex flex-col md:flex-row items-center">
        <div class="absolute left-5 md:left-20 text-white font-bold">
          <div class="text-2xl md:text-4xl mb-2">NeaRuS Finance</div>
          <div class="text-sm md:text-lg font-medium w-full md:w-[563px]">
            Atur management pembayaran serta mengatur kos yang telah di sewa dengan mudah hanya dengan NeaRuS Finance.
          </div>
        </div>
        <div class="absolute bottom-10 md:bottom-10 md:right-[90px] flex space-x-4">
          <img class="w-[100px] md:w-[150px] h-[100px] md:h-[150px]" :src="finance1" alt="Finance 1" />
          <img class="w-[100px] md:w-[150px] h-[100px] md:h-[150px]" :src="finance2" alt="Finance 2" />
          <img class="w-[100px] md:w-[150px] h-[100px] md:h-[150px]" :src="finance3" alt="Finance 3" />
        </div>
      </div>
      <div class="mt-6 md:mt-12 px-4">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="text-black text-xl md:text-[32px] font-bold ml-4">Kos yang disewa</div>
          <div class="flex items-center space-x-2 mt-2 md:mt-0">
            <i class="fas fa-filter text-black text-xl"></i>
            <span class="text-lg font-medium text-black">Filter</span>
          </div>
        </div>
        <hr class="border-t-2 border-black mt-2 mx-4" />
        <div class="flex justify-between mt-2 px-4">
          <div class="text-black text-base font-medium ml-4 mt-5">Showing all results</div>
        </div>

        <div class="mt-6 px-4 flex justify-center">
          <div class="relative w-full md:w-[1255px] h-auto md:h-[270px] bg-white rounded-[15px] border border-[#8692a6]/60">
            <div class="absolute top-7 right-7 flex items-center space-x-2">
              <img class="w-6 h-6" :src="checkmark" alt="Checkmark" />
              <div class="text-black text-[15px] font-bold leading-7">PAID</div>
            </div>

            <div class="absolute left-5 md:left-[537px] top-[22px] text-black text-xl font-bold w-full md:w-[238px] h-[23px]">
              Berong-Kost 2 Kudus
            </div>

            <div class="absolute left-5 md:left-[540px] top-[87px] flex items-center space-x-2">
              <img class="w-7 h-7" :src="bathroomImage" alt="Kamar Mandi Dalam" />
              <div class="text-black text-sm font-normal leading-7">Kamar Mandi Dalam</div>
            </div>
            <div class="absolute left-5 md:left-[745px] top-[95px] flex items-center space-x-2">
              <img class="w-7 h-7" :src="acImage" alt="AC" />
              <div class="text-black text-sm font-normal leading-7">AC</div>
            </div>
            <div class="absolute left-5 md:left-[540px] top-[141px] flex items-center space-x-2">
              <img class="w-7 h-7" :src="deskImage" alt="Meja" />
              <div class="text-black text-sm font-normal leading-7">Meja</div>
            </div>
            <div class="absolute left-5 md:left-[742px] top-[140px] flex items-center space-x-2">
              <img class="w-7 h-7" :src="toiletImage" alt="Kloset Duduk" />
              <div class="text-black text-sm font-normal leading-7">Kloset Duduk</div>
            </div>
            <!-- Border Lines -->
            <div class="absolute left-5 md:left-[537px] top-[63px] border border-[#8692a6]/60 w-full md:w-[699px] h-0"></div>
            <div class="absolute left-5 md:left-[932px] top-[61px] border border-[#8692a6]/60 w-full md:w-[129px] h-0 rotate-90 origin-top-left"></div>
            <!-- Manage Button -->
            <div class="absolute left-5 md:left-[537px] top-[203px] bg-[#008dda] rounded-[10px] shadow w-full md:w-[678px] pt-[15px] pb-4 flex justify-center items-center">
              <div class="text-center text-white text-base font-semibold">Manage</div>
            </div>
            <!-- Image and Price -->
            <img class="absolute left-0 w-full md:w-[510px] h-[270px] rounded-lg" :src="image3" />
            <div class="absolute left-5 md:left-[931px] top-[109px] text-center text-[#2171e3] text-2xl font-semibold w-full md:w-[305px] h-[41px]">
              Rp 7.200.000/6bln
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import checkmark from '@/assets/images2/lets-icons_check-fill.png';
import acImage from '@/assets/images2/streamline_hotel-air-conditioner.png';
import deskImage from '@/assets/images2/material-symbols-light_table-restaurant-outline.png';
import bathroomImage from '@/assets/images2/ph_shower-thin.png';
import toiletImage from '@/assets/images2/ph_toilet-thin.png';
import finance1 from '@/assets/images/finance1.png';
import finance2 from '@/assets/images/finance2.png';
import finance3 from '@/assets/images/finance3.png';
import image3 from '@/assets/images/image 3.png';
</script>

<style>
/* No additional styling needed */
</style>
