<template>
    <div>
      <NavFixed />
      <div class="flex justify-center items-center min-h-screen">
        <div class="w-[541px] h-[407px] relative text-center">
          <img class="w-[266px] h-[266px] mx-auto" :src="NoDataImage" alt="No Data" />
          <div class="mt-6 text-black text-xl font-bold font-['Montserrat']">
            Anda belum pernah melakukan transaksi apapun
          </div>
          <div class="mt-4">
            <router-link to="/" class="inline-block">
              <button class="bg-[#008dda] hover:bg-[#006bb5] rounded-[10px] text-white text-xl font-bold font-['Montserrat'] p-4 cursor-pointer">
                Cari Kos Sekarang
              </button>
            </router-link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import NoDataImage from '@/assets/images/no_data.png';
  import NavFixed from '@/components/NavFixed.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    components: {
      NavFixed,
      Footer,
    },
    data() {
      return {
        NoDataImage,
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  
  </style>
  