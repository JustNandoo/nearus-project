<template>
    <div class="full-screen-bg flex items-center justify-center h-screen">
      <div class="w-[1147px] h-[803px] relative">
        <div
          class="w-[1147px] h-[650px] left-0 top-0 absolute bg-white rounded-[15px] shadow shadow-inner border border-blue-600" />
        <div class="w-[1038px] h-[0px] left-[55px] top-[112px] absolute border-4 border-blue-400"></div>
        <div class="w-[172px] h-[49px] left-[55px] top-[47px] absolute">
          <img class="left-0 top-0 absolute" :src="imageLogo" />
          <div class="w-4 h-4 left-[118px] top-[1px] absolute" />
          <div class="w-2 h-[8.17px] left-[137px] top-[5.87px] absolute bg-sky-600 rounded-full" />
        </div>
        <div class="w-[707px] left-[55px] top-[160px] absolute text-black text-[28px] font-bold font-montserrat leading-[41.48px] tracking-wide">Silahkan Masukkan Kata Sandi Baru Anda </div>
        <div class="w-[571px] h-[90px] left-[55px] top-[250px] absolute" id="PasswordInput">
    <label for="passwordInput" class="left-0 top-0 absolute text-neutral-500 text-xl font-medium font-sans leading-normal">Kata Sandi</label>
    <input id="passwordInput" v-model="password" type="text" class="left-[1px] top-[60px] absolute text-black text-opacity-80 text-lg font-semibold font-sans leading-tight outline-none border-b border-black w-[570px]" placeholder="Masukkan Kata Sandi Baru Anda" />
  </div>
  <div class="w-[571px] h-[90px] left-[55px] top-[380px] absolute" id="ConfirmPasswordInput">
    <label for="confirmPasswordInput" class="left-0 top-0 absolute text-neutral-500 text-xl font-medium font-sans leading-normal">Konfirmasi Kata Sandi</label>
    <input id="confirmPasswordInput" v-model="confirmPassword" type="text" class="left-[1px] top-[60px] absolute text-black text-opacity-80 text-lg font-semibold font-sans leading-tight outline-none border-b border-black w-[570px]" placeholder="Konfirmasi Masukkan Kata Sandi Baru Anda" />
    <span v-if="password !== confirmPassword" class="absolute left-[1px] top-[90px] text-red-500 text-sm font-medium">Kata sandi yang anda masukkan harus sesuai</span>
  </div>
  <button @click="validatePassword" class="w-[266px] h-[54px] left-[55px] top-[520px] absolute transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-sky-300 to-blue-500 rounded-md shadow">
    <span class="absolute left-[50px] top-[15px] text-white text-xl font-bold font-montserrat">Ubah Password</span>
    <span class="absolute w-6 h-6 left-[220px] top-[15px]"></span>
  </button>
      </div>
      
      
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        imageLogo: '../src/assets/images/nearus.png',
        imageMail: '../src/assets/images/icon-mail.png',
      };
    },
    methods: {
    validatePassword() {
      if (this.password !== this.confirmPassword) {
        alert("Kata sandi yang Anda masukkan tidak sesuai. Silakan coba lagi.");
        this.password = '';
        this.confirmPassword = '';
      } else {
        // Kata sandi dan konfirmasi kata sandi cocok
      }
    },
  },
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
  