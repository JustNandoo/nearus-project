<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-3xl font-semibold mb-4">Email Verification</h1>
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" v-if="message">
      <span class="block sm:inline">Link Verifikasi Telah Dikirimkan ke Email Faza Sayang</span>

    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { API_URL } from '@/constants';
export default {
  data() {
    return {
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
