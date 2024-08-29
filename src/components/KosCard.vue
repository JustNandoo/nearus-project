<template>
  <div v-for="product in products" :key="product.id" class="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-sm flex flex-col relative">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-4">
        <img class="w-20 h-20 rounded-lg object-cover" :src="product.image[0]" alt="Product Image">
        <div>
          <router-link :to="{ name: 'DetailProduct', params: { id: product.id } }" class="text-lg font-medium">
            {{ product.productname }}
          </router-link>
          <p class="text-gray-500">{{ product.location }}</p>
        </div>
      </div>
      <font-awesome-icon
          :icon="faEllipsisV"
          class="text-gray-500 cursor-pointer"
          @click="toggleMenu(product.id)"
      />
      <div v-if="showMenu === product.id" class="absolute right-0 mt-8 bg-white shadow-md rounded-lg p-2">
        <div class="cursor-pointer p-2 text-red-500" @click="deleteProduct(product.id)">Delete</div>
      </div>
    </div>
    <hr class="my-2">
    <div class="flex justify-between items-center text-gray-600">
      <span>5 Penyewa</span>
      <span>10 Kamar Tersedia</span>
    </div>
    <button class="mt-4 bg-blue-500 text-white rounded-full py-2 w-full hover:bg-blue-600 transition duration-300">
      <a :href="`/dashboard-kosku-detail/${product.ownerId}`" class="block text-center">Manage</a>
    </button>
  </div>
</template>
<script setup>
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import axios from "axios";
import {onMounted} from "vue";

const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`https://api.nearus.id/api/product/delete/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    products.value = products.value.filter(p => p.id !== productId);
  } catch (error) {
    console.error('Failed to delete product:', error);
  }
};

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://api.nearus.id/api/product', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    products.value = response.data.data;
    isLoading.value = false;
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
});
</script>