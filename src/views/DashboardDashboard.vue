<template>
  <div class="flex">
    <sidebar/>
   <div class="flex justify-between items-center w-screen mx-10 mt-5 gap-2 h-full">
     <h1 class="text-black font-medium text-[18px]">Dashboard</h1>
      <div class="flex items-center gap-4">
        <img class="w-10 h-10 rounded-full" :src="profilePicture" alt="">
        <h1>Nando Fajar</h1>
      </div>
   </div>

  </div>
</template>

<script setup>
import profilePicture from '../assets/images/tesimg1.jpeg';
import Sidebar from "@/components/sidebar.vue";
</script>

<style lang="scss" scoped>
/* Add any additional styling here */
</style>
