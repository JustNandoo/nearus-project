<template>
  <div class="flex">
    <sidebar/>
    <div class="flex flex-col mt-10">
      <h1 class="text-black text-[20px] ml-14">Data Kamar</h1>
      <div class="container p-4 w-screen mx-8">
        <div class="table-container border border-gray-200 rounded-lg shadow-md max-h-80 overflow-y-auto">
          <table class="min-w-full bg-white">
            <thead>
            <tr>
              <th class="py-2 px-4 border-b text-left">Name</th>
              <th class="py-2 px-4 border-b text-left">Age</th>
              <th class="py-2 px-4 border-b text-left">Email</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in paginatedData" :key="item.id">
              <td class="py-2 px-4 border-b">{{ item.name }}</td>
              <td class="py-2 px-4 border-b">{{ item.age }}</td>
              <td class="py-2 px-4 border-b">{{ item.email }}</td>
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
import { ref, computed } from 'vue';
import Sidebar from "@/components/sidebar.vue";

const data = ref([
  { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 30, email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', age: 27, email: 'alice@example.com' },
  { id: 4, name: 'Michael Brown', age: 22, email: 'michael@example.com' },
  { id: 5, name: 'Jessica White', age: 35, email: 'jessica@example.com' },
  { id: 6, name: 'Daniel Green', age: 29, email: 'daniel@example.com' },
  { id: 7, name: 'Laura Black', age: 31, email: 'laura@example.com' },
  { id: 8, name: 'James Blue', age: 28, email: 'james@example.com' },
  { id: 9, name: 'Emily Red', age: 26, email: 'emily@example.com' },
  { id: 10, name: 'David Pink', age: 33, email: 'david@example.com' },
  { id: 11, name: 'Sarah Purple', age: 24, email: 'sarah@example.com' },
]);

const currentPage = ref(1);
const rowsPerPage = 5;

const totalPages = computed(() => Math.ceil(data.value.length / rowsPerPage));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  return data.value.slice(start, start + rowsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
</script>

<style scoped>
.table-container {
  max-height: 320px;
}
</style>
