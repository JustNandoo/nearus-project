<template>
  <div class="flex items-center justify-center h-screen">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-center mb-6">Reset Password</h2>
      <form @submit.prevent="resetPassword">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" v-model="email" id="email" name="email" class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <div class="text-center">
          <button type="submit" class="inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Reset Password
          </button>
        </div>
      </form>
    </div>
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

<style scoped>
/* Your scoped styles here */
</style>
