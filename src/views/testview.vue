<template>
  <form @submit.prevent="login" class="w-[571px] h-[817px] left-0 top-[415px] absolute" id="LoginForm">
    <label for="emailInput" class="left-0 top-0 absolute text-neutral-500 text-xl font-medium font-sans leading-normal">Alamat email</label>
    <input id="emailInput" v-model="email" type="email" class="left-[1px] top-[60px] absolute text-black text-opacity-80 text-lg font-semibold font-sans leading-tight outline-none border-b border-black w-[570px]" placeholder="Masukkan Email Anda" required />

    <label for="passwordInput" class="left-0 top-[165px] absolute text-neutral-500 text-xl font-medium font-sans leading-normal">Kata Sandi</label>
    <input id="passwordInput" v-model="password" type="password" class="left-[1px] top-[225px] absolute text-black text-opacity-80 text-lg font-semibold font-sans leading-tight outline-none border-b border-black w-[570px]" placeholder="Masukkan Kata Sandi Anda" required />

    <button type="submit" class="w-[266px] h-[54px] left-0 top-[350px] absolute transition duration-300 ease-in-out transform hover:scale-105" id="btgn-login">
      <div class="w-[266px] h-[54px] left-0 top-0 absolute bg-gradient-to-r from-sky-300 to-blue-500 shadow"></div>
      <div class="w-[49px] h-[0px] left-[197px] top-[3px] absolute origin-top-left rotate-90 border border-white"></div>
      <div class="left-[65px] top-[15px] absolute text-white text-xl font-bold font-sans">Login</div>
      <div class="w-6 h-6 left-[220px] top-[15px] absolute flex items-center justify-center">
        <i class="fas fa-chevron-right text-white"></i>
      </div>
    </button>

    <!-- Error message display -->
    <div v-if="error" class="left-0 top-[420px] absolute text-red-500 text-lg font-semibold font-sans">{{ error }}</div>
  </form>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/constants';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`${API_URL}/masuk`, {
          email: this.email,
          password: this.password,
        });

        if (response.status === 200 && response.data.success) {
          console.log('Login successful:', response.data.message);
          localStorage.setItem('token', response.data.token);
          // Redirect or perform any actions upon successful login
        } else {
          console.error('Login failed:', response.data.message);
          this.error = response.data.message;
        }
      } catch (error) {
        console.error('Error during login:', error.message);
        this.error = 'An error occurred during login.';
      }
    },
  },
};

</script>