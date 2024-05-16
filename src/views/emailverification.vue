<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
    <img :src="imageCloud1" class="absolute top-0 right-0">
    <img :src="imageCloud2" class="absolute bottom-0 left-0">
    <h1 class="text-3xl font-bold font-montserrat mb-4">Verifikasi Akun Anda</h1>
    <img :src="imageVerif" alt="head image">
    <div class="bg-blue-100 border border-blue-500 text-blue-500 px-4 py-3 rounded relative" v-if="message">
      <span class="block sm:inline">Silahkan check mailbox email anda untuk memverifikasi email anda.</span>
    </div>
    <button v-if="!timerRunning" class="mt-4 font-semibold text-blue-500 underline hover:text-blue-600" @click="resendVerification">Resend Verification</button>
    <div v-else class="mt-4 font-medium text-gray-500">Resend Verification in {{ timer }} seconds</div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/constants';
import imageVerif from '../assets/images/verif-email.png';
import imageCloud1 from '../assets/images/cloud-1.png';
import imageCloud2 from '../assets/images/cloud-2.png';
export default {
  data() {
    return {
      imageVerif: imageVerif,
      imageCloud1: imageCloud1,
      imageCloud2: imageCloud2,
      message: '',
      timer: 30,
      timerRunning: false,
      timerInterval: null,
    };
  },
  mounted() {
    console.log('Route Params:', this.$route.params);
    const { token } = this.$route.params.token;
    this.verifyEmail(token);
    const savedTimer = localStorage.getItem('timer');
    if (savedTimer) {
      this.timer = JSON.parse(savedTimer);
      this.startTimer();
    }
  },
  methods: {
    async verifyEmail(token, email) {
      try {
        const response = await axios.get(`${API_URL}/verify-email/${token}`);
        this.message = response.data.message;
      } catch (error) {
        this.message = 'Error verifying email';
        console.error('Error verifying email:', error);
      }
    },
    startTimer() {
      this.timerRunning = true;
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
          localStorage.setItem('timer', JSON.stringify(this.timer));
        } else {
          clearInterval(this.timerInterval);
          this.timerRunning = false;
          localStorage.removeItem('timer');
        }
      }, 1000);
    },
    resendVerification() {
      clearInterval(this.timerInterval);
      this.timerRunning = false;
      localStorage.removeItem('timer');
      this.message = '';
      this.timer = 30;
      this.startTimer();
      const email = this.$route.params.email;
      if (!email) {
        console.error('Email parameter missing in route params.');
        return;
      }

      console.log('Email to resend verification:', email);
      axios.post(`${API_URL}/resend-verification`, { email })
          .then(response => {
            console.log(response.data.message);
            this.message = response.data.message;
          })
          .catch(error => {
            console.error('Error resending verification email:', error);
            this.message = 'Error resending verification email';
          });
    }

  },
  beforeDestroy() {
    clearInterval(this.timerInterval);
  },
};
</script>
