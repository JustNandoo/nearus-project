<template>
  <div class="profile-card bg-white rounded-lg shadow-lg w-[450px] h-[670px] px-5 z-[10000]">
    <div class="flex items-center justify-between border-b-[1px] border-black pb-4">
      <img class="mt-5 ml-1 w-[100px] h-[100px] object-cover rounded-full" :src="profilePicture" alt="">
      <div class="mt-5 mr-4">
        <h1 class="mb-4 font-bold text-[23px]">Calvin Aprilio Hariyanto</h1>
        <p>calvinapriliohariyanto04@gmail.com</p>
      </div>
    </div>
    <div>
      <div class="flex gap-7 py-6 items-center px-10 border-b-[1px] border-black">
        <font-awesome-icon class="text-black w-8 h-8" :icon="faHouseUser" />
        <p class="text-[22px] font-medium">Kosku</p>
      </div>
      <div class="flex gap-7 py-6 items-center px-10 border-b-[1px] border-black mb-7">
        <font-awesome-icon class="text-black w-8 h-8" :icon="faGear" />
        <p class="text-[22px] font-medium">Kosku</p>
      </div>
      <div class="w-full bg-gray-100 h-[10px]"></div>
      <div class="mt-5 ml-2">
        <h1 class="font-bold text-[22px]">Pusat Bantuan</h1>
      </div>
      <div class="flex gap-7 py-6 items-center px-10 border-b-[1px] border-black">
        <font-awesome-icon class="text-black w-8 h-8" :icon="faHeadset" />
        <p class="text-[22px] font-medium">Customer Service</p>
      </div>
      <div class="flex gap-7 py-6 items-center px-10 border-b-[1px] border-black">
        <font-awesome-icon class="text-black w-8 h-8" :icon="faCircleQuestion" />
        <p class="text-[22px] font-medium">Syarat dan Ketentuan</p>
      </div>
      <button class="bg-blue-primary flex items-center px-2 py-3 justify-center gap-5 w-full rounded-lg mt-7 text-white text-[22px] font-medium">
        <font-awesome-icon :icon="faRightFromBracket" class="text-white w-8 h-8"/>
        Keluar
      </button>
    </div>
  </div>
</template>

<script setup>
import { faHouseUser, faGear, faHeadset, faCircleQuestion, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import profilePicture from '../assets/images/tesimg1.jpeg'; // Updated to use import
</script>

<style scoped>
.profile-card {
  position: absolute;
  top: 4rem; /* Adjust as needed */
  right: 0;
  z-index: 1100;
}
</style>
