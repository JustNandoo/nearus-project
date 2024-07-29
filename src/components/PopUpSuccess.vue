<template>
    <transition name="modal">
      <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Registrasi Berhasil
              </h3>
              <button @click="closePopup" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close</span>
              </button>
            </div>
            <div class="p-4 md:p-5 space-y-4">
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Permintaan anda telah dikirim dan akan segera dilakukan verifikasi oleh admin nearus.
              </p>
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Silahkan menunggu, karena proses verifikasi akan dilakukan dalam waktu 2x24 jam. Jika sudah selesai maka anda akan mendapatkan notifikasi yang langsung dikirimkan ke email anda.
              </p>
            </div>
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button @click="goToLogin" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    isVisible: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['close', 'login']);
  
  const closePopup = () => {
    emit('close');
  };
  
  const goToLogin = () => {
    emit('login');
  };
  </script>
  
  <style lang="scss" scoped>
  @keyframes modal-fade-in {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes modal-fade-out {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.95);
    }
  }
  
  .modal-enter-active {
    animation: modal-fade-in 0.3s ease-out forwards;
  }
  
  .modal-leave-active {
    animation: modal-fade-out 0.3s ease-out forwards;
  }
  </style>
  