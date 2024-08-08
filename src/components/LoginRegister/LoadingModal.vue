<template>
    <div class="full-screen-bg flex items-center justify-center h-screen relative">
      <div :class="{'blur-sm': isLoading}" class="container w-[1595px] h-[867px] relative">
        <!-- Existing content -->
        <div v-if="message" class="message">{{ message }}</div>
      </div>
      <LoadingModal v-if="isLoading" class="absolute inset-0 flex items-center justify-center z-50"/>
      <PopUpSuccess :isVisible="isPopupVisible" @close="closePopup" @login="goToLogin" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import imagePath from '@/assets/images/bg-loginPage.png';
  import imageLogo from '@/assets/images/nearus.png';
  import PopUpSuccess from '@/components/LoginRegister/PopUpSuccess.vue';
  import LoadingModal from '@/components/LoginRegister/LoadingModal.vue';
  import { API_URL } from '@/constants.js';
  
  export default {
    components: {
      PopUpSuccess,
      LoadingModal
    },
    // data and methods as previously defined
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
  .blur-sm {
    filter: blur(5px); /* Adjust blur value as needed */
  }
  </style>
  