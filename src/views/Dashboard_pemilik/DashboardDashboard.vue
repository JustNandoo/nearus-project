<template>
  <div class="">
    <div class="flex">
      <sidebar/>
     <div  class=" ml-[350px] overflow-auto w-screen h-screen">
       <div class="flex flex-col">
         <div class="flex justify-between items-center w-[1500px] mx-10 mt-5 gap-2 h-10px">
           <h1 class="text-black font-medium text-[20px]">Dashboard</h1>
           <div class="rounded-full gap-5 flex items-center justify-center">
             <div class="flex items-center justify-center gap-3">
               <img :src="profilePicture" alt="Profile Picture" class="object-cover rounded-full h-12 w-12">
               <p class="text-xl font-medium text-black">
                 {{ user.name }}
               </p>
             </div>
           </div>
         </div>
         <div class="ml-10 mt-4 font-medium text-[22px]">
           Halo, {{user.name}} apa rencanamu hari ini?
         </div>
         <div class="flex mt-8 mx-auto gap-8">
           <div class="w-[350px] h-full mx-auto overflow-hidden rounded-lg shadow-lg">
             <div class="relative bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
               <div class="flex items-center gap-2">
                 <h1 class="text-white font-semibold text-[18px]">Pemasukan</h1>
                 <font-awesome-icon :icon="faArrowUp" class="text-white"/>
               </div>
               <p class="text-white mt-2 font-bold text-[20px]">{{ formattedBalance }}</p>
             </div>
           </div>
           <div class="w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg">
             <div class="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
               <div class="flex items-center gap-2">
                 <h1 class="text-white font-semibold text-[18px]">Total Jumlah Kamar</h1>
                 <font-awesome-icon :icon="faDoorClosed" class="text-white"/>
               </div>
               <p class="text-white mt-2 font-bold text-[20px]">10 Kamar</p>
             </div>
           </div>
           <div class="w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg">
             <div class="relative bg-gradient-to-r from-green-500 to-teal-500 p-6">
               <div class="flex items-center gap-2">
                 <h1 class="text-white font-semibold text-[18px]">Total Jumlah Penyewa Kost</h1>
                 <font-awesome-icon :icon="faUser" class="text-white"/>
               </div>
               <p class="text-white mt-2 font-bold text-[20px] ">5 Penghuni Kost</p>
             </div>
           </div>
           <div class="w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg">
             <div class="relative bg-gradient-to-r from-orange-500 to-yellow-500 p-6">
               <div class="flex items-center gap-2">
                 <h1 class="text-white font-semibold text-[18px]">Sisa Saldo</h1>
                 <font-awesome-icon :icon="faMoneyBill" class="text-white"/>
               </div>
               <p class="text-white mt-2 font-bold text-[20px]">Rp. 0</p>
             </div>
           </div>
         </div>
          <ChartStatistik/>
       </div>
     </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { faArrowUp, faMoneyBill, faDoorClosed, faUser, faBell} from '@fortawesome/free-solid-svg-icons';
import {onMounted} from "vue";
import ChartStatistik from "@/components/DashboardPemilik/ChartStatistik.vue";
import {computed, ref} from "vue";
import imageProfileDefault from "@/assets/images/profile-pic.png";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
const profilePicture = computed(() => store.state.user?.photoprofile || imageProfileDefault);
const userName = computed(() => store.state.user?.name || 'Guest');
const store = useStore();
const user = computed(() => store.getters.getUser);
const router = useRouter();
const balance = ref(0);
const formattedBalance = computed(() => {
  return `Rp. ${balance.value.toLocaleString()}`;
});
const token = localStorage.getItem('token');
const fetchBalance = async () => {
  try {
    const response = await axios.get('https://api.nearus.id/api/orders/balance', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = response.data;
    if (data.success) {
      balance.value = data['Balance Count'];
    }
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
};
onMounted(()=>{

  store.dispatch('initializeStore');
})
</script>

<style lang="scss" scoped>
/* Add any additional styling here */
</style>
