<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
    <img :src="imageCloud1" class="absolute top-0 right-0">
    <img :src="imageCloud2" class="absolute bottom-0 left-0">
    <h1 class="text-3xl font-bold font-montserrat mb-4">Verifikasi Akun Anda</h1>
    <img :src="imageVerif">
    <div class="bg-blue-100 border border-blue-500 text-blue-500 px-4 py-3 rounded relative" v-if="message">
  <span class="block sm:inline">Silahkan check mailbox email anda untuk memverifikasi email anda.</span>
</div>
<button class="mt-4 font-semibold text-blue-500 underline hover:text-blue-600" @click="resendVerification">Resend Verification</button>

  </div>
</template>


<script>
import axios from 'axios';
import { API_URL } from '@/constants';
export default {
  data() {
    return {
      imageVerif:'../src/assets/images/verif-email.png',
      imageCloud1:'../src/assets/images/cloud-1.png',
      imageCloud2:'../src/assets/images/cloud-2.png',
      message: '',
    };
  },
  mounted() {

    const token = this.$route.params.token;
    this.verifyEmail(token);
  },
  methods: {
    async verifyEmail(token) {
      try {
        const response = await axios.get(`${API_URL}/verify-email/${token}`);
        this.message = response.data.message;
      } catch (error) {
        this.message = 'Error verifying email';
        console.error('Error verifying email:', error);
      }
    },
  },
};
</script>
