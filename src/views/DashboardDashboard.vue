<template>
  <div class="">
    <div class="flex">
      <sidebar/>
     <div class="flex flex-col">
       <div class="flex justify-between items-center w-[1500px] mx-10 mt-5 gap-2 h-10px">
         <h1 class="text-black font-medium text-[18px]">Dashboard</h1>
         <div class="flex items-center gap-4">
           <img class="w-10 h-10 rounded-full" :src="profilePicture" alt="">
           <h1>Nando Fajar</h1>
         </div>
       </div>
       <div class="flex mt-8 mx-auto gap-8">
           <div class="w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg">
             <div class="relative bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
               <div class="flex items-center gap-2">
                 <h1 class="text-white font-semibold text-xl">Pemasukan</h1>
                 <font-awesome-icon :icon="faArrowUp" class="text-white"/>
               </div>
               <p class="text-white mt-2 font-bold">Rp. 7.200.000</p>
             </div>
           </div>
         <div class="w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg">
           <div class="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
             <div class="flex items-center gap-2">
               <h1 class="text-white font-semibold text-xl">Total Jumlah Kamar</h1>
               <font-awesome-icon :icon="faDoorClosed" class="text-white"/>
             </div>
             <p class="text-white mt-2 font-bold">12 Kamar</p>
           </div>
         </div>
         <div class="w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg">
           <div class="relative bg-gradient-to-r from-green-500 to-teal-500 p-6">
             <div class="flex items-center gap-2">
               <h1 class="text-white font-semibold text-xl">Total Jumlah Penyewa Kost</h1>
               <font-awesome-icon :icon="faUser" class="text-white"/>
             </div>
             <p class="text-white mt-2 font-bold">12 Penghuni Kost</p>
           </div>
         </div>
         <div class="w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg">
           <div class="relative bg-gradient-to-r from-orange-500 to-yellow-500 p-6">
             <div class="flex items-center gap-2">
               <h1 class="text-white font-semibold text-xl">Sisa Saldo</h1>
               <font-awesome-icon :icon="faMoneyBill" class="text-white"/>
             </div>
             <p class="text-white mt-2 font-bold">Rp. 7.200.000</p>
           </div>
         </div>
       </div>
     </div>
    </div>
  </div>
</template>

<script setup>
import profilePicture from '../assets/images/tesimg1.jpeg';
import Sidebar from "@/components/sidebar.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { faArrowUp, faMoneyBill, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';

</script>

<style lang="scss" scoped>
/* Add any additional styling here */
</style>
