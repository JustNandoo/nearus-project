<template>
  <div class="min-h-screen flex flex-col bg-gray-50 font-montserrat">
    <!-- Navigation -->
    <NavFixed class="bg-white shadow-md" />

    <!-- Main Content -->
    <main class="flex-grow p-8 mx-auto w-full max-w-7xl bg-gray-50 mt-[100px]">
      <!-- Back Button -->
      <div
          class="mb-6 text-gray-600 text-lg font-semibold cursor-pointer hover:text-blue-600 transition duration-300"
      >
        ← Kembali
      </div>

      <!-- Main Image and Info -->
      <div
          v-if="transaction"
          class="flex flex-col lg:flex-row mb-10 items-center lg:items-start bg-white rounded-lg shadow-lg p-6"
      >
        <img
            class="w-full lg:w-1/2 h-[400px] rounded-lg object-cover shadow-lg"
            :src="transaction.image || 'https://via.placeholder.com/800x400'"
            alt="Main Image"
        />
        <div
            class="lg:ml-8 mt-6 lg:mt-0 flex flex-col justify-center text-center lg:text-left"
        >
          <h1 class="text-gray-800 text-4xl font-bold leading-tight mb-2">
            {{ transaction.name }}
          </h1>
          <p class="text-gray-500 text-lg font-medium mb-6">
            {{ transaction.detail }}
          </p>
          <div
              class="flex flex-wrap items-center justify-center lg:justify-start space-x-4 mb-6"
          >
            <span class="text-blue-500 font-bold text-lg">
              Rp. {{ transaction.price }}
            </span>
            <div
                class="text-sm text-green-600 font-semibold border border-green-600 px-2 py-1 rounded"
            >
              {{ transaction.status }}
            </div>
          </div>

          <!-- Facilities Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div class="flex items-center space-x-2">
              <img class="w-7 h-7" :src="acImage" alt="AC" />
              <span class="text-gray-600 font-medium">AC</span>
            </div>
            <div class="flex items-center space-x-2">
              <img class="w-7 h-7" :src="deskImage" alt="Meja" />
              <span class="text-gray-600 font-medium">Meja</span>
            </div>
            <div class="flex items-center space-x-2">
              <img class="w-7 h-7" :src="bathroomImage" alt="Kamar Mandi Dalam" />
              <span class="text-gray-600 font-medium">Kamar Mandi Dalam</span>
            </div>
            <div class="flex items-center space-x-2">
              <img class="w-7 h-7" :src="toiletImage" alt="Kloset Duduk" />
              <span class="text-gray-600 font-medium">Kloset Duduk</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div
          v-else
          class="flex justify-center items-center min-h-screen text-gray-600"
      >
        Loading...
      </div>

      <!-- Owner Details -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-gray-800 text-2xl font-semibold mb-4">
          Hubungi Pemilik
        </h2>
        <div class="flex items-center mb-6">
          <img
              class="w-20 h-20 rounded-full object-cover shadow-lg"
              :src="owner.image || 'https://via.placeholder.com/100'"
              alt="Owner Profile"
          />
          <div class="ml-4">
            <h3 class="text-gray-800 text-xl font-bold">{{ owner.name }}</h3>
            <p class="text-gray-600 text-lg font-medium">{{ owner.email }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <a
              :href="`https://wa.me/${owner.phonenumber}`"
              target="_blank"
              class="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition duration-300"
          >
            <i class="fab fa-whatsapp mr-2"></i> Hubungi Pemilik
          </a>
          <button
              @click="sendMessageToOwner"
              class="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition duration-300"
          >
            <i class="fas fa-comments mr-2"></i> Kirim Pesan
          </button>
          <button
              @click="cancelAction"
              class="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition duration-300"
          >
            Ajukan Pembatalan
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import NavFixed from "@/components/Pages/NavFixed.vue";
import Footer from "@/components/Pages/Footer.vue";
import acImage from "@/assets/images2/streamline_hotel-air-conditioner.png";
import deskImage from "@/assets/images2/material-symbols-light_table-restaurant-outline.png";
import bathroomImage from "@/assets/images2/ph_shower-thin.png";
import toiletImage from "@/assets/images2/ph_toilet-thin.png";
import { useRoute } from 'vue-router';

const transaction = ref(null);
const owner = ref({});
const route = useRoute();

const fetchOwnerDetail = async (ownerId) => {
  try {
    const response = await axios.get(`https://api.nearus.id/api/owner/${ownerId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.data) {
      owner.value = response.data;
      console.log('Owner data fetched successfully:', owner.value);
    } else {
      console.error('Failed to fetch owner details. Response:', response.data);
    }
  } catch (error) {
    console.error('Error fetching owner details:', error);
  }
};

const fetchTransactionDetail = async () => {
  try {
    const response = await axios.get(`https://api.nearus.id/api/orders/detail/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.data) {
      transaction.value = response.data;
      console.log('Transaction data fetched successfully:', transaction.value);
      // Fetch owner details using ownerId from transaction data
      fetchOwnerDetail(transaction.value.ownerId);
    } else {
      console.error('Failed to fetch transaction details. Response:', response.data);
    }
  } catch (error) {
    console.error('Error fetching transaction details:', error);
  }
};

onMounted(() => {
  fetchTransactionDetail();
});

const sendMessageToOwner = () => {
  // Implement logic to send message to owner
};

const cancelAction = () => {
  // Implement logic for cancellation action
};
</script>

<style scoped>
/* Add any scoped styles here if necessary */
</style>
