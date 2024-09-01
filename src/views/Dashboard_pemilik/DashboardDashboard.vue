<template>
  <div class="">
    <div class="flex">
      <sidebar/>
      <div class="ml-[350px] overflow-auto w-screen h-screen">
        <div class="flex flex-col">
          <div class="flex justify-between items-center w-[1500px] mx-10 mt-5 gap-2 h-10px">
            <h1 class="text-black font-medium text-[20px]">Dashboard</h1>
            <div class="rounded-full gap-5 flex items-center justify-center">
              <div class="flex items-center justify-center gap-3">
                <img :src="profilePicture" alt="Profile Picture" class="object-cover rounded-full h-12 w-12">
                <p class="text-xl font-medium text-black">
                  {{ userName }}
                </p>
              </div>
            </div>
          </div>
          <div class="ml-10 mt-4 font-medium text-[22px]">
            Halo, {{userName}} apa rencanamu hari ini?
          </div>
          <div class="flex mt-8 mx-auto gap-8 relative">
            <div class="w-[350px] h-full mx-auto overflow-hidden rounded-lg shadow-lg">
              <div class="relative bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
                <div class="flex items-center gap-2">
                  <h1 class="text-white font-semibold text-[18px]">Pemasukan</h1>
                  <font-awesome-icon :icon="faArrowDown" class="text-white"/>
                </div>
                <p class="text-white mt-2 font-bold text-[20px]">{{ formattedBalance }}</p>
              </div>
            </div>
            <div class="w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg">
              <div class="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
                <div class="flex items-center gap-2">
                  <h1 class="text-white font-semibold text-[18px]">Total Jumlah Produk</h1>
                  <font-awesome-icon :icon="faDoorClosed" class="text-white"/>
                </div>
                <p class="text-white mt-2 font-bold text-[20px]">{{totalProducts}} Produk</p>
              </div>
            </div>
            <div class="w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg">
              <div class="relative bg-gradient-to-r from-green-500 to-teal-500 p-6">
                <div class="flex items-center gap-2">
                  <h1 class="text-white font-semibold text-[18px]">Total Jumlah Penyewa Kost</h1>
                  <font-awesome-icon :icon="faUser" class="text-white"/>
                </div>
                <p class="text-white mt-2 font-bold text-[20px] ">{{totalTenants}} Penghuni</p>
              </div>
            </div>
            <div class="w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg relative">
              <div class="relative bg-gradient-to-r from-orange-500 to-yellow-500 p-6">
                <div class="flex items-center gap-2">
                  <h1 class="text-white font-semibold text-[18px]">Sisa Saldo</h1>
                  <font-awesome-icon :icon="faMoneyBill" class="text-white"/>
                </div>
                <p class="text-white mt-2 font-bold text-[20px]">{{ formattedBalance }}</p>
              </div>
            </div>
            <button @click="openModal" class="absolute right-[0px] bottom-[-60px] bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg">
              Penarikan Dana
            </button>
          </div>
          <ChartStatistik/>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-8 w-[400px]">
        <h2 class="text-xl font-bold mb-4">Penarikan Dana</h2>
        <p class="text-lg mb-4">Total Saldo: {{ formattedBalance }}</p>
        <input type="number" v-model="withdrawAmount" placeholder="Masukkan jumlah penarikan" class="w-full p-2 mb-4 border rounded-lg"/>
        <div class="flex justify-end gap-2">
          <button @click="closeModal" class="bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg">Batal</button>
          <button @click="submitWithdrawal" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg">Tarik</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { faArrowDown, faMoneyBill, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import { onMounted, computed, ref } from "vue";
import ChartStatistik from "@/components/DashboardPemilik/ChartStatistik.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import { useToast } from 'vue-toastification';

const toast = useToast();
const store = useStore();
const router = useRouter();
const profilePicture = computed(() => store.state.user?.photoprofile || '/path/to/default-image.png');
const userName = computed(() => store.state.user?.name || 'Guest');
const phoneNumber = computed(() => store.state.user?.phonenumber || '');
const balance = ref(0);
const totalProducts = ref(0);
const totalTenants = ref(0);
const isModalOpen = ref(false); // For controlling the modal visibility
const withdrawAmount = ref(0); // For storing the inputted withdrawal amount

const formattedBalance = computed(() => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(balance.value);
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

const fetchTotalProducts = async () => {
  try {
    const response = await axios.get('https://api.nearus.id/api/product/ownerid', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = response.data;
    if (data.message === "success get all product by owner Id") {
      totalProducts.value = data.data.length;  // Accessing the correct array to get the length
    }
  } catch (error) {
    console.error('Error fetching total products:', error);
  }
};

const fetchTotalTenants = async () => {
  try {
    const response = await axios.get('https://api.nearus.id/api/orders/paid', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = response.data;
    if (data.success) {
      totalTenants.value = data.orders.length;  // Adjust this based on the actual structure of the response
    }
  } catch (error) {
    console.error('Error fetching total tenants:', error);
  }
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const submitWithdrawal = async () => {
  try {
    const response = await axios.post('https://api.nearus.id/api/orders/request-disbursement', {
      name: userName.value,
      ownerId: store.state.user.id,
      amount: withdrawAmount.value,
      phonenumber: phoneNumber.value,
      id: store.state.user.id,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      toast.success(`Penarikan dana berhasil: ${response.data.message}`);
      closeModal();
    } else {
      toast.error(`Penarikan dana gagal: ${response.data.message}`);
    }
  } catch (error) {
    console.error('Error submitting withdrawal:', error);
    toast.error('Terjadi kesalahan saat memproses penarikan dana.');
  }
};

onMounted(() => {
  fetchBalance();
  fetchTotalProducts();
  fetchTotalTenants();
  store.dispatch('initializeStore');
});
</script>


<style lang="scss" scoped>
/* Add any additional styling here */
</style>
