<template>
  <div class="w-[975px] h-[175px] relative mx-auto mt-4 flex justify-between">
    <div class="relative w-[301px] h-[174px]">
      <div class="absolute w-full h-full bg-white rounded-[23px] shadow top-[-90px]" />
      <div class="absolute w-[186px] top-[-40px] left-[50%] transform -translate-x-1/2 text-black text-xl font-bold font-['Montserrat']">
        Penyewaan Kost
      </div>
      <div class="absolute w-[186px] top-[-10px] left-[50%] transform -translate-x-1/2 text-center text-black text-[15px] font-normal font-['Montserrat']">
        Kost terbaik dengan harga paling bagus dan fasilitas terjamin.
      </div>
      <div class="absolute w-[129px] top-[-75px] left-[50%] transform -translate-x-1/2">
        <img :src="imageNearusMini" alt="NEARuS" class="w-[129px] h-[35.51px]" />
      </div>
    </div>
    <div class="relative w-[301px] h-[174px]">
      <div class="absolute w-full h-full bg-white rounded-[23px] shadow top-[-90px]" />
      <div class="absolute w-[113px] top-[-40px] left-[50%] transform -translate-x-1/2 text-black text-xl font-bold font-['Montserrat']">
        Kemitraan
      </div>
      <div class="absolute w-[270px] top-[-10px] left-[50%] transform -translate-x-1/2 text-center text-black text-[15px] font-normal font-['Montserrat']">
        Bergabunglah menjadi mitra kost kami dan mendapatkan banyak benefit yang menguntungkan.
      </div>
      <div class="absolute w-[129px] top-[-75px] left-[50%] transform -translate-x-1/2">
        <img :src="imageNearusMini" alt="NEARuS" class="w-[129px] h-[35.51px]" />
      </div>
    </div>
    <div class="relative w-[301px] h-[174px]">
      <div class="absolute w-full h-full bg-white rounded-[23px] shadow top-[-90px]" />
      <div class="absolute w-[91px] top-[-40px] left-[50%] transform -translate-x-1/2 text-black text-xl font-bold font-['Montserrat']">
        Finance
      </div>
      <div class="absolute w-[267px] top-[-15px] left-[50%] transform -translate-x-1/2 text-center text-black text-[15px] font-normal font-['Montserrat']">
        Dapat mengatur segala pembayaran anda dan membuat transaksi menjadi jauh lebih mudah.
      </div>
      <div class="absolute w-[129px] top-[-75px] left-[50%] transform -translate-x-1/2">
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

<style lang="scss" scoped>
</style>
