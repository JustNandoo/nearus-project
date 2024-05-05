<template>
  <div>
    <input type="email" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <button @click="login">Login</button>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import {API_URL} from "@/constants.js";

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`${API_URL}/masuk`, {
          email: this.email,
          password: this.password,
        });

        if (response.data.success) {
          console.log('Login successful:', response.data.message);
          localStorage.setItem('token', response.data.token);
          this.$router.push('/dashboard');
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

