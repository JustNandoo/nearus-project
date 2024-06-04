<template>
  <aside class="w-[344px] h-[430px] bg-white shadow-lg rounded-lg p-6 space-y-4">
    <!-- Card Header -->
    <div class="text-center mb-4">
      <h2 class="text-2xl font-semibold text-gray-800">User Settings</h2>
      <p class="text-sm text-gray-500">Manage your account settings</p>
    </div>
    
    <!-- Profile Button -->
    <div class="w-full h-[63px] bg-gradient-to-r bg-gray-100 text-gray-800 flex items-center justify-center rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
      <router-link 
        to="/profile" 
        class="no-underline text-xl font-medium font-['Montserrat']"
        :class="{'font-bold': selected === 'profile'}"
        @click="selected = 'profile'">Ubah Data Profil</router-link>
    </div>
    
    <!-- Private Data Button -->
    <div class="w-full h-[63px] bg-gray-100 flex items-center justify-center rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
      <router-link 
        to="/privatedata" 
        class="no-underline text-xl font-medium font-['Montserrat'] text-gray-800"
        :class="{'text-blue-500 font-bold': selected === 'privatedata'}"
        @click="selected = 'privatedata'">Data Pribadi</router-link>
    </div>
    
    <!-- Password Data Button -->
    <div class="w-full h-[63px] bg-gray-100 flex items-center justify-center rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
      <router-link 
        to="/passworddata" 
        class="no-underline text-xl font-medium font-['Montserrat'] text-gray-800"
        :class="{'text-blue-500 font-bold': selected === 'passworddata'}"
        @click="selected = 'passworddata'">Ubah Kata Sandi</router-link>
    </div>

    <!-- Log Out Button -->
    <div class="w-full h-[63px] bg-gray-100 flex items-center justify-center rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105">
      <router-link 
        to="/logout" 
        class="no-underline text-xl font-medium font-['Montserrat'] text-gray-800"
        :class="{'text-blue-500 font-bold': selected === 'logout'}"
        @click="selected = 'logout'">Log Out</router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const selected = ref('');
</script>

<style scoped>
.text-xl:last-child {
  margin-bottom: 0;
}
</style>
