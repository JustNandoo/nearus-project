<template>
  <div>
    <form @submit.prevent="resetPassword">
      <input type="email" v-model="email" placeholder="Enter your email">
      <button type="submit">Reset Password</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/constants';

export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    async resetPassword() {
      try {
        const response = await axios.post(`${API_URL}/reset-password`, { email: this.email });
        alert(response.data.message);
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  },
};
</script>
