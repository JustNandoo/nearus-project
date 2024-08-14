<template>
  <div class="flex flex-col min-h-screen font-montserrat">
    <Nav />
    <div class="pt-[72px] flex-grow">
      <div class="relative w-full h-[286px] bg-[#008dda] shadow-lg flex items-center">
        <div class="absolute left-20 text-white font-bold">
          <div class="text-4xl mb-2">NeaRuS Finance</div>
          <div class="text-lg font-medium w-[563px]">
            Atur management pembayaran serta mengatur kos yang telah di sewa
            dengan mudah hanya dengan NeaRuS Finance.
          </div>
        </div>
        <div class="absolute flex space-x-4 bottom-10 right-[90px]">
          <img class="w-[150px] h-[150px]" :src="finance1" alt="Finance 1" />
          <img class="w-[150px] h-[150px]" :src="finance2" alt="Finance 2" />
          <img class="w-[150px] h-[150px]" :src="finance3" alt="Finance 3" />
        </div>
      </div>

      <div class="mt-12 px-4">
        <div class="flex items-center justify-between">
          <div class="text-black text-[32px] font-bold ml-4">
            Kos yang disewa
          </div>
          <div class="flex items-center space-x-2 mr-7">
            <i class="fas fa-filter text-black text-xl"></i>
            <span class="text-lg font-medium text-black">Filter</span>
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
              v-if="transactions.length > 0"
              class="flex flex-col items-center mt-4"
          >
            <div
                v-for="transaction in transactions"
                :key="transaction.id"
                class="relative w-[80%] max-w-[1255px] h-[270px] bg-white rounded-[15px] border border-[#8692a6]/60 mb-4"
            >
              <div
                  class="absolute top-7 right-7 flex items-center space-x-2"
              >
                <img
                    class="w-6 h-6"
                    :src="transaction.status === 'Paid' ? checkmark : ''"
                    alt="Checkmark"
                />
                <div class="text-black text-[15px] font-bold leading-7">
                  {{ transaction.status }}
                </div>
              </div>

              <div
                  class="absolute left-[537px] top-[22px] text-black text-sm font-bold w-[400px] h-[23px]"
              >
                {{ transaction.detail }}
              </div>
              <div
                  class="absolute left-[540px] top-[87px] flex items-center space-x-2"
              >
                <img
                    class="w-7 h-7"
                    :src="bathroomImage"
                    alt="Kamar Mandi Dalam"
                />
                <div class="text-black text-sm font-normal leading-7">
                  Kamar Mandi Dalam
                </div>
              </div>
              <div
                  class="absolute left-[745px] top-[87px] flex items-center space-x-2"
              >
                <img class="w-7 h-7" :src="acImage" alt="AC" />
                <div class="text-black text-sm font-normal leading-7">AC</div>
              </div>
              <div
                  class="absolute left-[540px] top-[141px] flex items-center space-x-2"
              >
                <img class="w-7 h-7" :src="deskImage" alt="Meja" />
                <div class="text-black text-sm font-normal leading-7">Meja</div>
              </div>
              <div
                  class="absolute left-[745px] top-[141px] flex items-center space-x-2"
              >
                <img class="w-7 h-7" :src="toiletImage" alt="Kloset Duduk" />
                <div class="text-black text-sm font-normal leading-7">
                  Kloset Duduk
                </div>
              </div>
              <div
                  class="absolute left-[537px] top-[63px] border border-[#8692a6]/60 w-[699px] h-0"
              ></div>
              <div
                  class="absolute left-[932px] top-[61px] border border-[#8692a6]/60 w-[129px] h-0 rotate-90 origin-top-left"
              ></div>
              <router-link
                  :to="{ name: 'NearusFinance2', params: { id: transaction.id } }"
              >
                <button
                    class="absolute left-[537px] top-[203px] bg-[#008dda] rounded-[10px] shadow w-[678px] pt-[15px] pb-4 flex justify-center items-center"
                >
                  <div class="text-center text-white text-base font-semibold">
                    Manage
                  </div>
                </button>
              </router-link>
              <img
                  class="absolute left-0 w-[510px] h-[270px] rounded-lg object-cover"
                  :src="transaction.image"
              />
              <div
                  class="absolute left-[931px] top-[109px] text-center text-[#2171e3] text-2xl font-semibold w-[305px] h-[41px]"
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
import {ref, onMounted, onBeforeUnmount} from 'vue';
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
import {useRouter} from 'vue-router';

const transactions = ref([]);
const isLoading = ref(true);
const showProfileCard = ref(false);
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
</script>

<style>
/* Add any custom styles here */
</style>
