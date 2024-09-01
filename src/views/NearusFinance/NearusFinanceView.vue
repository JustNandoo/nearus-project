<template>
  <div class="flex flex-col min-h-screen font-montserrat">
    <Nav />
    <div class="pt-[72px] flex-grow">
      <div class="relative w-full h-[286px] bg-[#008dda] shadow-lg flex items-center">
        <div class="absolute left-4 sm:left-20 text-white font-bold">
          <div class="text-2xl sm:text-4xl mb-2">NeaRuS Finance</div>
          <div class="text-sm sm:text-lg font-medium w-full sm:w-[563px]">
            Atur management pembayaran serta mengatur kos yang telah di sewa
            dengan mudah hanya dengan NeaRuS Finance.
          </div>
        </div>
        <div class="absolute flex space-x-2 sm:space-x-4 bottom-5 sm:bottom-10 right-4 sm:right-[90px]">
          <img class="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]" :src="finance1" alt="Finance 1" />
          <img class="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]" :src="finance2" alt="Finance 2" />
          <img class="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]" :src="finance3" alt="Finance 3" />
        </div>
      </div>

      <div class="mt-12 px-4">
        <div class="flex flex-col sm:flex-row items-center justify-between">
          <div class="text-black text-2xl sm:text-[32px] font-bold ml-4">
            Kos yang disewa
          </div>
          <div class="relative flex items-center mr-7 mt-4 sm:mt-0">
            <i class="fas fa-search absolute left-3 text-gray-400"></i>
            <input
                v-model="searchQuery"
                type="text"
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                placeholder="Search transactions..."
            />
          </div>
        </div>
        <hr class="border-t-2 border-black mt-2 mx-4" />

        <!-- Loading Animation -->
        <div v-if="isLoading" class="flex justify-center items-center mt-8">
          <div
              class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"
          ></div>
        </div>

        <!-- Transactions Content -->
        <div v-else>
          <div class="flex justify-between mt-2 px-4">
            <div class="text-black text-base font-medium ml-4 mt-5">
              Showing all results
            </div>
          </div>
          <div
              v-if="filteredTransactions.length > 0"
              class="flex flex-col items-center mt-4"
          >
            <div
                v-for="transaction in filteredTransactions"
                :key="transaction.id"
                class="relative w-full max-w-[1255px] h-auto sm:h-[270px] bg-white rounded-[15px] border border-[#8692a6]/60 mb-4 p-4 sm:p-0"
            >
              <div class="absolute top-4 sm:top-7 right-4 sm:right-7 flex items-center space-x-2">
                <img
                    class="w-5 h-5 sm:w-6 sm:h-6"
                    :src="transaction.status === 'Paid' ? checkmark : ''"
                    alt="Checkmark"
                />
                <div class="text-black text-sm sm:text-[15px] font-bold leading-7">
                  {{ transaction.status }}
                </div>
              </div>

              <div
                  class="mt-6 sm:mt-0 sm:absolute sm:left-[537px] sm:top-[22px] text-black text-sm font-bold w-full sm:w-[400px] h-auto sm:h-[23px]"
              >
                {{ transaction.detail }}
              </div>
              <div
                  class="mt-4 sm:mt-0 sm:absolute sm:left-[540px] sm:top-[87px] flex items-center space-x-2"
              >

              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                    v-for="facility in transaction.fasilitas.split(',')"
                    :key="facility"
                    class="bg-white border border-gray-300 rounded-lg p-2 text-center text-gray-700 text-sm font-medium"
                >
                  {{ facility }}
                </div>
              </div>
              <div
                  class="mt-4 sm:mt-0 sm:absolute sm:left-[537px] sm:top-[63px] border border-[#8692a6]/60 w-full sm:w-[699px] h-0"
              ></div>

              <router-link
                  :to="{ name: 'NearusFinance2', params: { id: transaction.id } }"
              >
                <button
                    class="mt-6 sm:mt-0 sm:absolute sm:left-[537px] sm:top-[203px] bg-[#008dda] rounded-[10px] shadow w-full sm:w-[678px] pt-4 sm:pt-[15px] pb-4 flex justify-center items-center"
                >
                  <div class="text-center text-white text-base font-semibold">
                    Manage
                  </div>
                </button>
              </router-link>
              <img
                  class="w-full sm:absolute sm:left-0 sm:w-[510px] h-auto sm:h-[270px] rounded-lg object-cover mt-4 sm:mt-0"
                  :src="transaction.image"
              />
              <div
                  class="mt-4 sm:mt-0 sm:absolute sm:left-[931px] sm:top-[109px] text-center text-[#2171e3] text-xl sm:text-2xl font-semibold w-full sm:w-[305px] h-auto sm:h-[41px]"
              >
                Rp. {{ formatPrice(transaction.price) }}
              </div>
            </div>
          </div>
          <div v-else>
            <NoData />
          </div>
        </div>
      </div>
    </div>
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
import acImage from '@/assets/images2/streamline_hotel-air-conditioner.png';
import deskImage from '@/assets/images2/material-symbols-light_table-restaurant-outline.png';
import bathroomImage from '@/assets/images2/ph_shower-thin.png';
import toiletImage from '@/assets/images2/ph_toilet-thin.png';
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
/* Add any custom styles here */
</style>
