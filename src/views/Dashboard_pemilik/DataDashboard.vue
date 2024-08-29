<template>
  <div class="flex">
    <sidebar />

    <div class="flex flex-col mt-10">
      <div class="relative ml-12 mb-3">
        <button @click="toggleDropdown" class="text-black bg-white shadow-lg border-[1px] border-blue-300 px-4 py-1 rounded-lg text-[18px] font-bold flex items-center space-x-1">
          <div>{{ dropdownText }}</div>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="{ 'rotate-180': isDropdownOpen }"
          >
            <path
                fill-rule="evenodd"
                d="M10 18a1 1 0 0 1-.707-.293l-6-6a1 1 0 0 1 1.414-1.414L10 15.586l5.293-5.293a1 1 0 0 1 1.414 1.414l-6 6A1 1 0 0 1 10 18z"
            />
          </svg>
        </button>
        <div
            v-show="isDropdownOpen"
            @click.away="closeDropdown"
            class="absolute z-10 top-full mt-2 w-48 bg-white rounded-lg shadow-md py-1"
        >
          <button @click="changeDropdownText('Data Kost')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Data Kost
          </button>
          <button @click="changeDropdownText('Data Penyewa')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Data Penyewa
          </button>
          <button @click="changeDropdownText('Data Kamar')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Data Kamar
          </button>
        </div>
      </div>

      <!-- Search Input -->
      <div class="container mx-8 mb-3">
        <input
            v-model="searchQuery"
            type="text"
            class="w-[1500px] py-2 px-4 ml-4 mt-4 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Search..."
        />
      </div>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="flex justify-center items-center h-80">
        <loading
            :active="isLoading"
            :is-full-page="false"
            color="#1E3A8A"
            background-color="rgba(255, 255, 255, 0.7)"
            :width="60"
            :height="60"
        />
      </div>

      <!-- Data Table -->
      <div v-else class="container p-4 w-screen mx-8">
        <div class="table-container border border-gray-200 rounded-lg shadow-md max-h-80 overflow-y-auto">
          <table class="min-w-full bg-white">
            <thead>
            <tr>
              <th class="py-2 px-4 border-b text-left">No</th>
              <th v-if="dropdownText === 'Data Kost'" class="py-2 px-4 border-b text-left">Nama Kost</th>
              <th v-if="dropdownText === 'Data Kost'" class="py-2 px-4 border-b text-left">Tipe Kost</th>
              <th v-if="dropdownText === 'Data Kost'" class="py-2 px-4 border-b text-left">Lokasi</th>
              <th v-if="dropdownText === 'Data Kost'" class="py-2 px-4 border-b text-left">Harga</th>

              <th v-if="dropdownText === 'Data Penyewa'" class="py-2 px-4 border-b text-left">Nama</th>
              <th v-if="dropdownText === 'Data Penyewa'" class="py-2 px-4 border-b text-left">Nomor Telpon</th>
              <th v-if="dropdownText === 'Data Penyewa'" class="py-2 px-4 border-b text-left">Status Pembayaran</th>

              <th v-if="dropdownText === 'Data Kamar'" class="py-2 px-4 border-b text-left">Nama Kamar</th>
              <th v-if="dropdownText === 'Data Kamar'" class="py-2 px-4 border-b text-left">Tipe Kamar</th>
              <th v-if="dropdownText === 'Data Kamar'" class="py-2 px-4 border-b text-left">Fasilitas</th>
              <th v-if="dropdownText === 'Data Kamar'" class="py-2 px-4 border-b text-left">Harga</th>
              <th v-if="dropdownText === 'Data Kamar'" class="py-2 px-4 border-b text-left">Ketersediaan</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(item, index) in paginatedData"
                :key="index"
                :class="{'bg-gray-100': index % 2 === 0, 'bg-gray-200': index % 2 === 1}"
            >
              <td class="py-2 px-4 border-b">{{ (currentPage - 1) * rowsPerPage + index + 1 }}</td>

              <!-- Data Kost Columns -->
              <td v-if="dropdownText === 'Data Kost'" class="py-2 px-4 border-b">{{ item.productname }}</td>
              <td v-if="dropdownText === 'Data Kost'" class="py-2 px-4 border-b">{{ item.category }}</td>
              <td v-if="dropdownText === 'Data Kost'" class="py-2 px-4 border-b">{{ item.location }}</td>
              <td v-if="dropdownText === 'Data Kost'" class="py-2 px-4 border-b">{{ item.price ? `Rp.${item.price}` : 'N/A' }}</td>

              <!-- Data Penyewa Columns -->
              <td v-if="dropdownText === 'Data Penyewa'" class="py-2 px-4 border-b">{{ item.name }}</td>
              <td v-if="dropdownText === 'Data Penyewa'" class="py-2 px-4 border-b">{{ item.phonenumber }}</td>
              <td v-if="dropdownText === 'Data Penyewa'" class="py-2 px-4 border-b">{{ item.status }}</td>

              <!-- Data Kamar Columns -->
              <td v-if="dropdownText === 'Data Kamar'" class="py-2 px-4 border-b">{{ item.name }}</td>
              <td v-if="dropdownText === 'Data Kamar'" class="py-2 px-4 border-b">{{ item.category }}</td>
              <td v-if="dropdownText === 'Data Kamar'" class="py-2 px-4 border-b">{{ item.fasilitas }}</td>
              <td v-if="dropdownText === 'Data Kamar'" class="py-2 px-4 border-b">{{ item.price ? `Rp.${item.price}` : 'N/A' }}</td>
              <td v-if="dropdownText === 'Data Kamar'" class="py-2 px-4 border-b">{{ item.availability }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-between items-center mt-4">
          <button @click="prevPage" :disabled="currentPage === 1" class="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
import axios from 'axios';
import Loading from 'vue-loading-overlay';


const data = ref([]);
const currentPage = ref(1);
const rowsPerPage = 5;
const searchQuery = ref('');
const isDropdownOpen = ref(false);
const dropdownText = ref('Data Kost');
const isOrdersPaid = ref(false);
const isLoading = ref(false);

const totalPages = computed(() => Math.ceil(filteredData.value.length / rowsPerPage));

const filteredData = computed(() => {
  if (!Array.isArray(data.value)) {
    return [];
  }
  return data.value.filter(item =>
      (item.productname?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.name?.toLowerCase().includes(searchQuery.value.toLowerCase())) || !searchQuery.value
  );
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  return filteredData.value.slice(start, start + rowsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const changeDropdownText = async (text) => {
  dropdownText.value = text;
  isDropdownOpen.value = false;
  await fetchData();
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    let url;
    if (dropdownText.value === 'Data Kost') {
      url = 'https://api.nearus.id/api/product';
      isOrdersPaid.value = false;
    } else if (dropdownText.value === 'Data Kamar') {
      url = 'https://api.nearus.id/api/rooms/get';
      isOrdersPaid.value = false;
    } else {
      url = 'https://api.nearus.id/api/orders/paid';
      isOrdersPaid.value = true;
    }


    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('API Response:', response);
    if (Array.isArray(response.data.data)) {
      data.value = response.data.data;
    } else if (dropdownText.value === 'Data Penyewa' && Array.isArray(response.data.orders)) {
      data.value = response.data.orders;
    } else {
      data.value = [];
    }

    console.log('Processed Data:', data.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style>
.table-container {
  max-height: 20rem;
  overflow-y: auto;
}
</style>