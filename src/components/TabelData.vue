<template>
  <div class="flex">
    <div class="flex flex-col mt-10">
      <div class="flex items-center gap-2">
        <div class="container mx-8 mb-3">
          <input
              v-model="searchQuery"
              type="text"
              class="w-full py-2 px-4 ml-4 mt-4 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Search..."
          />
        </div>
      </div>
      <div class="container p-4 w-full mx-8">
        <div class="table-container border border-gray-200 rounded-lg shadow-md max-h-80 overflow-y-auto">
          <table class="min-w-full bg-white">
            <thead>
            <tr>
              <th class="py-2 px-4 border-b text-left">ID</th>
              <th class="py-2 px-4 border-b text-left">Product Name</th>
              <th class="py-2 px-4 border-b text-left">Category</th>
              <th class="py-2 px-4 border-b text-left">Location</th>
              <th class="py-2 px-4 border-b text-left">Price</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(item, index) in paginatedData"
                :key="item.id"
                :class="{'bg-gray-100': index % 2 === 0, 'bg-gray-200': index % 2 === 1}"
            >
              <td class="py-2 px-4 border-b">{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
              <td class="py-2 px-4 border-b">{{ item.productname }}</td>
              <td class="py-2 px-4 border-b">{{ item.category }}</td>
              <td class="py-2 px-4 border-b">{{ item.location }}</td>
              <td class="py-2 px-4 border-b">{{ item.price }}</td>
            </tr>
            </tbody>
          </table>
        </div>
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
import Sidebar from "@/components/sidebar.vue";
import axios from 'axios';

const data = ref([]);
const currentPage = ref(1);
const rowsPerPage = 5;
const searchQuery = ref('');
const isDropdownOpen = ref(false);
const dropdownText = ref('Data Kamar'); // Reactive variable for dropdown text

const totalPages = computed(() => Math.ceil(filteredData.value.length / rowsPerPage));

const filteredData = computed(() => {
  return data.value.filter(item =>
      item.productname.toLowerCase().includes(searchQuery.value.toLowerCase())
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

const changeDropdownText = (text) => {
  dropdownText.value = text;
  isDropdownOpen.value = false; // Close the dropdown when an option is selected
};

// Fetch data from the API
const fetchData = async () => {
  try {
    const response = await axios.get('https://nearus.id/api/product');
    data.value = response.data.data; // Assuming the API response structure
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

onMounted(fetchData);
</script>


<style scoped>
.table-container {
  max-height: 400px;
}
</style>
