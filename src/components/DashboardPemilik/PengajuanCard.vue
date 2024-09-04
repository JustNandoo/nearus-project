<template>
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
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useToast } from 'vue-toastification';

const toast = useToast();
const store = useStore();

const isModalOpen = ref(false);
const withdrawAmount = ref(0);
const token = localStorage.getItem('token');

const balance = ref(0);
const formattedBalance = computed(() => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(balance.value);
});

const userName = computed(() => store.state.user?.name || 'Guest');
const phoneNumber = computed(() => store.state.user?.phonenumber || '');

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

fetchBalance();
</script>

<style lang="scss" scoped>
/* Add any additional styling here */
</style>
