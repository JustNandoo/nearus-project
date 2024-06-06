<template>
  <div class="w-full max-w-[975px] mx-auto mt-16 flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
    <div class="relative w-full max-w-[301px] h-[174px]">
      <div class="absolute w-full h-full bg-white rounded-[23px] shadow-lg -top-[90px]"></div>
      <div class="absolute w-[186px] -top-[40px] left-1/2 transform -translate-x-1/2 text-black text-xl font-bold font-montserrat text-center">
        Penyewaan Kost
      </div>
      <div class="absolute w-[186px] -top-[10px] left-1/2 transform -translate-x-1/2 text-center text-black text-[15px] font-normal font-montserrat">
        Kost terbaik dengan harga paling bagus dan fasilitas terjamin.
      </div>
      <div class="absolute w-[129px] -top-[75px] left-1/2 transform -translate-x-1/2">
        <img :src="imageNearusMini" alt="NEARuS" class="w-[129px] h-[35.51px]" />
      </div>
    </div>
    <div class="relative w-full max-w-[301px] h-[174px]">
      <div class="absolute w-full h-full bg-white rounded-[23px] shadow-lg -top-[90px]"></div>
      <div class="absolute w-[113px] -top-[40px] left-1/2 transform -translate-x-1/2 text-black text-xl font-bold font-montserrat text-center">
        Kemitraan
      </div>
      <div class="absolute w-[270px] -top-[10px] left-1/2 transform -translate-x-1/2 text-center text-black text-[15px] font-normal font-montserrat">
        Bergabunglah menjadi mitra kost kami dan mendapatkan banyak benefit yang menguntungkan.
      </div>
      <div class="absolute w-[129px] -top-[75px] left-1/2 transform -translate-x-1/2">
        <img :src="imageNearusMini" alt="NEARuS" class="w-[129px] h-[35.51px]" />
      </div>
    </div>
    <div class="relative w-full max-w-[301px] h-[174px]">
      <div class="absolute w-full h-full bg-white rounded-[23px] shadow-lg -top-[90px]"></div>
      <div class="absolute w-[91px] -top-[40px] left-1/2 transform -translate-x-1/2 text-black text-xl font-bold font-montserrat text-center">
        Finance
      </div>
      <div class="absolute w-[267px] -top-[15px] left-1/2 transform -translate-x-1/2 text-center text-black text-[15px] font-normal font-montserrat">
        Dapat mengatur segala pembayaran anda dan membuat transaksi menjadi jauh lebih mudah.
      </div>
      <div class="absolute w-[129px] -top-[75px] left-1/2 transform -translate-x-1/2">
        <img :src="imageNearusMini" alt="NEARuS" class="w-[129px] h-[35.51px]" />
      </div>
    </div>
  </div>
</template>

<script>
import imageNearusMini from '../assets/images/nearusmini.png';

export default {
  name: 'CardProductAboutUs',
  data() {
    return {
      imageNearusMini,
    };
  },
};
</script>

<style scoped>
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
