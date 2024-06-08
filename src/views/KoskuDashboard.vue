<template>
  <div class="flex">
    <sidebar/>
    <div class="overflow-auto w-[1580px] h-screen">
      <div class="w-[1500px] ml-8 mt-10">
        <div v-if="isLoading" class="text-gray-500">Loading...</div>
        <div v-else>
          <div v-for="product in products" :key="product.id" class="my-4">
            <div class="bg-white overflow-hidden shadow-md rounded-lg relative">
              <div class="absolute top-0 right-0 p-2">
                <font-awesome-icon :icon="faEllipsisV" class="text-gray-500 w-6 h-6" />
              </div>
              <div class="flex">
                <div class="w-1/3 h-[250px]">
                  <img class="object-cover w-full h-full" :src="product.image[0]" alt="Product image">
                </div>
                <div class="w-2/3 p-4">
                  <div class="text-xl font-semibold mb-2">{{ product.productname }}</div>
                  <p class="text-gray-700">{{ product.about }}</p>
                </div>
              </div>
              <div class="absolute bottom-0 right-0 p-2">
                <font-awesome-icon :icon="faTrashAlt" class="text-red-500 w-7 h-7" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed bottom-4 right-4 flex items-center">
    <div class="w-20 h-20 rounded-full shadow-lg bg-blue-primary flex justify-center items-center">
      <font-awesome-icon :icon="faPlus" class="text-white w-10 h-10"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faEllipsisV, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Sidebar from "@/components/sidebar.vue";

const products = ref([]);
const isLoading = ref(true);

// Fetch data from the API
const fetchData = async () => {
  try {
    const response = await axios.get('https://nearus.id/api/product');
    products.value = response.data.data;
    isLoading.value = false;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    isLoading.value = false;
  }
};

onMounted(fetchData);
</script>

<style lang="scss" scoped>
</style>
