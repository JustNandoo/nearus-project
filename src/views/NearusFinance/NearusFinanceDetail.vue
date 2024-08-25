<template>
  <div class="min-h-screen flex flex-col bg-gray-50 font-montserrat">
    <!-- Navigation -->
    <NavFixed class="bg-white shadow-md" />

    <!-- Main Content -->
    <main class="flex-grow p-4 md:p-8 mx-auto w-full max-w-7xl bg-gray-50 mt-[100px]">
      <!-- Back Button -->
      <div
          class="mb-6 text-gray-600 text-lg font-semibold cursor-pointer hover:text-blue-600 transition duration-300"
          @click="$router.go(-1)"
      >
        ← Kembali
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>

      <!-- Main Content -->
      <div v-else>
        <div
            v-if="transaction"
            class="flex flex-col lg:flex-row mb-10 items-center lg:items-start bg-white rounded-lg shadow-lg p-4 md:p-6"
        >
          <img
              class="w-full h-[300px] md:h-[400px] rounded-lg object-cover shadow-lg"
              :src="transaction.image || 'https://via.placeholder.com/800x400'"
              alt="Main Image"
          />
          <div class="lg:ml-6 mt-4 lg:mt-0 flex flex-col justify-center text-center lg:text-left">
            <h1 class="text-gray-800 text-3xl md:text-4xl font-bold leading-tight mb-2">
              {{ transaction.detail }}
            </h1>
            <p class="text-gray-500 text-base md:text-lg font-medium mb-4">{{ produk.location }}</p>
            <div class="flex flex-wrap items-center justify-center lg:justify-start space-x-4 mb-6">
              <span class="text-blue-500 font-bold text-lg">Rp. {{ transaction.price }}</span>
              <div class="text-sm text-green-600 font-semibold border border-green-600 px-2 py-1 rounded">
                {{ transaction.status }}
              </div>
            </div>
            <!-- Remaining Time -->
            <div class="text-black-500 font-bold text-lg">
              Kos Disewa Sampai : {{ formattedEndDate }}
            </div>
            <!-- Facilities Section -->
            <div class="mt-6">
              <h2 class="text-gray-800 text-xl md:text-2xl font-semibold mb-4">Fasilitas</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                    v-for="facility in transaction.fasilitas.split(',')"
                    :key="facility"
                    class="bg-white border border-gray-300 rounded-lg p-2 text-center text-gray-700 text-sm font-medium"
                >
                  {{ facility }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Owner Details -->
        <div class="bg-white rounded-lg shadow-lg p-4 md:p-6 mt-10">
          <h2 class="text-gray-800 text-xl md:text-2xl font-semibold mb-6">Hubungi Pemilik</h2>
          <div class="flex items-center mb-6">
            <img
                class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-lg"
                :src="owner.image || imageProfileDefault"
                alt="Owner Profile"
            />
            <div class="ml-4 text-center md:text-left">
              <h3 class="text-gray-800 text-lg md:text-xl font-bold mb-1">{{ owner.name }}</h3>
              <p class="text-gray-600 text-base md:text-lg font-medium">{{ owner.email }}</p>
            </div>
            <div class="ml-auto flex space-x-4">
              <button
                  @click="extendRental"
                  class="flex items-center justify-center bg-blue-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition duration-300"
              >
                Ajukan perpanjangan sewa
              </button>
              <button
                  @click="sendMessageToOwner"
                  class="flex items-center justify-center bg-blue-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition duration-300"
              >
                <i class="fas fa-comments mr-2"></i> Kirim Pesan
              </button>
            </div>
          </div>
        </div>

        <!-- Alert Component -->
        <Alert ref="alertPopup" />
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import NavFixed from "@/components/Pages/NavFixed.vue";
import imageProfileDefault from '@/assets/images/profile-pic.png';
import Footer from "@/components/Pages/Footer.vue";
import { useRoute } from 'vue-router';
import Alert from '@/components/NearusFinance/Alert.vue';

const isLoading = ref(true);
const transaction = ref(null);
const owner = ref({});
const endDate = ref('');
const route = useRoute();
const produk = ref(JSON.parse(localStorage.getItem('produk')));
const alertPopup = ref(null);

// Fetch owner details
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

// Fetch transaction details
const fetchTransactionDetail = async () => {
  try {
    const response = await axios.get(`https://api.nearus.id/api/orders/detail/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.data) {
      localStorage.setItem('detailfinance', response.data.id);
      transaction.value = response.data;
      console.log('Transaction data fetched successfully:', transaction.value);

      // Set the end date from the duration field
      endDate.value = new Date(transaction.value.duration);

      fetchOwnerDetail(transaction.value.ownerId);
    } else {
      console.error('Failed to fetch transaction details. Response:', response.data);
    }
  } catch (error) {
    console.error('Error fetching transaction details:', error);
  } finally {
    isLoading.value = false;
  }
};

// Format end date
const formattedEndDate = computed(() => {
  if (!endDate.value) return '';
  return endDate.value.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

// Extend rental
const extendRental = async () => {
  const detailfinanceId = localStorage.getItem('detailfinance');

  try {
    const response = await axios.post(
        `https://api.nearus.id/api/orders/extend/${detailfinanceId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
    );

    if (response.data.snapToken) {
      // Call Midtrans Snap to show the payment popup
      window.snap.pay(response.data.snapToken, {
        onSuccess: function (result) {
          alert("Pembayaran berhasil!"); // Handle success logic here
          location.reload(); // Reload the page to update the rental duration
        },
        onPending: function (result) {
          alert("Pembayaran tertunda!"); // Handle pending payment logic here
        },
        onError: function (result) {
          alert("Pembayaran gagal!"); // Handle payment failure here
        },
        onClose: function () {
          alertPopup.value.open(); // Show the alert popup
        }
      });
    } else {
      console.error('Failed to get Snap token:', response.data);
    }
  } catch (error) {
    console.error('Error during the extension request:', error);
  }
};

// Send message to owner
const sendMessageToOwner = () => {
  // Implement message sending functionality here
};

onMounted(() => {
  fetchTransactionDetail();
});
</script>

<style scoped>
/* Add any scoped styles for your component here */
</style>
