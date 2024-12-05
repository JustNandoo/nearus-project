<template>
  <div class="flex flex-col min-h-screen font-montserrat bg-gray-100">
    <Nav />
    <main class="pt-[72px] flex-grow">
      <section class="relative w-full h-[286px] bg-[#008dda] shadow-lg flex items-center justify-center">
        <div class="absolute inset-0 flex flex-col sm:flex-row items-center sm:justify-between px-4 sm:px-20 text-white">
          <div class="text-center sm:text-left">
            <div class="text-2xl sm:text-4xl font-bold mb-2">NeaRuS Finance</div>
            <p class="text-sm sm:text-lg font-medium max-w-[563px]">
              Atur management pembayaran serta mengatur kos yang telah di sewa
              dengan mudah hanya dengan NeaRuS Finance.
            </p>
          </div>
          <div class="absolute flex space-x-4 bottom-5 right-4 sm:bottom-10 sm:right-10">
            <img class="w-24 h-24 sm:w-36 sm:h-36 object-cover" :src="finance1" alt="Finance 1" />
            <img class="w-24 h-24 sm:w-36 sm:h-36 object-cover" :src="finance2" alt="Finance 2" />
            <img class="w-24 h-24 sm:w-36 sm:h-36 object-cover" :src="finance3" alt="Finance 3" />
          </div>
        </div>
      </section>

      <section class="mt-12 px-4">
        <div class="flex flex-col sm:flex-row items-center justify-between mb-4">
          <h2 class="text-black text-2xl sm:text-3xl font-bold">Kos yang disewa</h2>
          <div class="relative flex items-center w-full sm:w-auto">
            <i class="fas fa-search absolute left-3 text-gray-400"></i>
            <input
                v-model="searchQuery"
                type="text"
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                placeholder="Search transactions..."
            />
          </div>
        </div>
        <hr class="border-t-2 border-black mb-6" />

        <!-- Loading Animation -->
        <div v-if="isLoading" class="flex justify-center items-center mt-8">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>

        <!-- Transactions Content -->
        <div v-else>
          <div v-if="filteredTransactions.length > 0">
            <!-- Grid Layout for larger screens, List Layout for smaller screens -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div v-for="transaction in filteredTransactions" :key="transaction.id" class="relative bg-white rounded-lg border border-gray-300 shadow-md p-4">

                <!-- Rental Name and Payment Status Section -->
                <div class="flex flex-col sm:flex-row justify-between items-start mb-4">
                  <div class="text-black text-lg font-bold mb-2 sm:mb-0">{{ transaction.detail }}</div>
                  <div class="flex items-center space-x-2">
                    <img class="w-5 h-5 sm:w-6 sm:h-6" :src="transaction.status === 'Paid' ? checkmark : ''" alt="Checkmark" />
                    <div class="text-black text-sm font-bold">{{ transaction.status }}</div>
                  </div>
                </div>

                <!-- Image Section -->
                <img class="w-full h-[280px] object-cover rounded-lg mb-4" :src="transaction.image" />

                <!-- Facilities Section -->
                <div class="grid grid-cols-2 gap-2 mb-4">
                  <div
                      v-for="(facility, index) in transaction.fasilitas.split(',')"
                      :key="index"
                      class="bg-white border border-gray-300 rounded-lg px-2 py-1 text-center text-gray-700 font-medium"
                  >
                    {{ facility }}
                  </div>
                </div>
                <hr class="border-gray-500 mb-3" />

                <!-- Price and Manage Button -->
                <div class="text-center text-[#2171e3] text-xl font-semibold mb-4">
                  Rp. {{ formatPrice(transaction.price) }}
                </div>
                <router-link :to="{ name: 'NearusFinance2', params: { id: transaction.id } }">
                  <button class="bg-[#008dda] rounded-lg shadow-lg w-full py-2 flex justify-center items-center text-white font-semibold">
                    Manage
                  </button>
                </router-link>
              </div>
            </div>
          </div>
          <NoData v-else />
        </div>
      </section>
    </main>
    <Footer />
    <ProfileCard v-if="showProfileCard" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import axios from 'axios';
import Nav from '@/components/Pages/Nav.vue';
import Footer from '@/components/Pages/Footer.vue';
import NoData from '@/components/NearusFinance/NoData.vue';
import checkmark from '@/assets/images2/lets-icons_check-fill.png';
import finance1 from '@/assets/images/finance1.png';
import finance2 from '@/assets/images/finance2.png';
import finance3 from '@/assets/images/finance3.png';
import ProfileCard from '@/components/Profile/ProfileCard.vue';
import { useRouter } from 'vue-router';

const transactions = ref([]);
const isLoading = ref(true);
const showProfileCard = ref(false);
const searchQuery = ref('');
const router = useRouter();

const fetchTransactions = () => {
  axios
      .get('https://api.nearus.id/api/orders/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          transactions.value = response.data.data;
        }
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      })
      .finally(() => {
        isLoading.value = false;
      });
};

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const toggleProfileCard = () => {
  showProfileCard.value = !showProfileCard.value;
};

onMounted(() => {
  fetchTransactions();
  window.addEventListener('toggle-profile-card', toggleProfileCard);
});

onBeforeUnmount(() => {
  window.removeEventListener('toggle-profile-card', toggleProfileCard);
});

// Computed property to filter transactions based on search query
const filteredTransactions = computed(() => {
  return transactions.value.filter((transaction) =>
      transaction.detail.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
/* Custom styles if needed */
</style>
