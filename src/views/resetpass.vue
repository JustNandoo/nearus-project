<template>
  <div class="full-screen-bg flex items-center justify-center h-screen">
    <div class="container w-[1595px] h-[867px] relative">
      <div class="w-[1595px] h-[867px] relative">
        <div class="w-[1595px] h-[865px] left-0 top-[2px] absolute bg-white rounded-[20px] shadow"></div>
        <div class="w-[646px] h-[817px] left-[920px] top-[25px] absolute" id="onBoardingCard">
          <img class="image w-[646px] h-[817px]" :src="imagePath" />
          <div
            class="h-[243px] left-[147px] top-[287px] absolute flex-col justify-start items-start gap-[33px] inline-flex">
            <div class="w-[340px] text-white text-[26px] font-bold font-sans">Anda anak merantau? kesulitan mencari kos?
              banyak kos yang tidak cocok?</div>
            <div class="w-[351px] text-white text-lg font-normal font-sans">Nearus hadir sebagai platform website
              pencari kos disekitar anda dengan kriteria yang sesuai.</div>
            <div class="w-[312px] h-[15px] justify-center items-start gap-3 inline-flex">
              <div class="w-24 h-[15px] bg-white shadow"></div>
              <div class="w-[95px] h-[15px] bg-white bg-opacity-40 shadow"></div>
              <div class="w-24 h-[15px] bg-white bg-opacity-40 shadow"></div>
            </div>
          </div>
        </div>

        <div class="w-[708px] h-[440px] left-[50px] top-[80px] absolute">
          <div class="w-[172px] h-[49px] left-0 top-0 absolute">
            <div class="left-0 top-0 absolute text-sky-600 text-[40px] font-bold font-montserrat">NEARuS</div>
            <div class="w-4 h-4 left-[118px] top-[1px] absolute"></div>
            <div class="w-2 h-[8.17px] left-[137px] top-[5.87px] absolute bg-sky-600 rounded-full"></div>
          </div>
          <div class="w-[707px] left-[1px] top-[81px] absolute text-black text-[34px] font-bold font-montserrat leading-[41.48px] tracking-wide">Silahkan Masukkan Email anda untuk Reset Password</div>
          <div class="w-[571px] h-[161px] left-0 top-[203px] absolute">
            <div class="left-0 top-0 absolute text-neutral-500 text-xl font-medium font-montserrat leading-normal">Alamat email</div>
            <div class="w-[520px] left-[1px] top-[120px] absolute text-neutral-500/opacity-50 text-[15px] font-regular font-montserrat leading-[18.30px]">*silahkan masukkan email anda lalu check inbox di dalam email anda  dan lakukan prosedur reset password sesuai yang kami berikan di dalam inbox email anda</div>
            <form @submit.prevent="resetPassword" class="left-[1px] top-[60px] absolute w-[570px]">
              <input id="emailInput" v-model="email" name="email" type="email" class="text-black text-opacity-80 text-lg font-semibold font-sans leading-tight outline-none border-b border-black w-full" placeholder="Masukkan alamat email anda" />
              <div class="text-red-500" v-if="emailError" t>{{ emailError }}</div>
            </form>
          </div>
          <div class="w-[266px] h-[54px] left-[1px] top-[400px] absolute">
            <button type="submit" @click="resetPassword" class="w-[266px] h-[54px] left-0 top-0 absolute transition duration-300 ease-in-out transform hover:scale-105 rounded-md flex items-center justify-center">
              <div class="w-[266px] h-[54px] left-0 top-0 absolute bg-gradient-to-r from-sky-300 to-blue-500 shadow"></div>
              <div class="left-[45px] top-[15px] absolute text-white text-xl font-bold font-montserrat">Reset Password</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/constants';

export default {
  data() {
    return {
      imagePath: '../src/assets/images/bg-loginPage.png',
      email: '',
      emailError: '', 
    };
  },
  methods: {
    async resetPassword() {
      if (!this.email) {
        this.emailError = 'Email harus diisi'; 
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(this.email)) {
        this.emailError = 'Format email tidak valid'; 
        return;
      }
      
      this.emailError = '';
      
      try {
        const response = await axios.post(`${API_URL}/reset-password`, { email: this.email });
        alert(response.data.message);
        // Handle success message or redirect as needed
      } catch (error) {
        alert(error.response.data.message);
        // Handle error message as needed
      }
    }
  }
};
</script>

<style scoped>
.full-screen-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: url('@/assets/images/bg-loginPage.png') center/cover no-repeat;
}
</style>
