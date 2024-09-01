<template>
  <div class="flex relative w-screen">
    <sidebar/>
    <div class="ml-[350px] w-full p-8">
      <!-- Back Button -->
      <button @click="$router.push('/dashboard-kosku')" class="mb-4 font-medium text-[20px]">
       <font-awesome-icon :icon="faArrowLeft" class=""/>
        Kembali
      </button>

      <div v-if="product" class="space-y-8">
        <div class="w-full h-[400px] bg-cover bg-center rounded-lg" :style="{ backgroundImage: `url(${product.image})` }"></div>
        <div class="text-gray-800 space-y-6">
          <h2 class="text-4xl font-bold">{{ product.productname }}</h2>
          <p class="text-lg text-gray-600">Alamat Kost: {{ product.location }}</p>

          <div class="grid grid-cols-2 gap-6">
            <div class="flex items-center">
              <font-awesome-icon :icon="faVenusMars" class=""/>
              <span class="text-gray-700 font-semibold ml-2">Category:</span>
              <span class="ml-2 text-blue-500">{{ product.category }}</span>
            </div>

            <!-- Price -->
            <div class="flex items-center">
              <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h1m-6 4h1v-4H7m0 8h10v-2H7v2zm-2-4h12v2H5v-2zm0-8h14v2H5V7z"></path></svg>
              <span class="text-gray-700 font-semibold ml-2">Price:</span>
              <span class="ml-2 text-green-500">{{ formatPrice(product.price) }}</span>
            </div>

            <!-- Facilities -->
            <div class="col-span-2">
              <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              <span class="text-gray-700 font-semibold ml-2">Facilities:</span>
              <p class="text-gray-600 ml-2 space-y-1">
                <span v-for="(facility, index) in product.fasilitas.split(',')" :key="index">{{ facility.trim() }}</span>
              </p>
            </div>

            <!-- Duration -->
            <div>
              <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.362 5.736a2.75 2.75 0 00-3.549-.463l-5.836 5.82a2.75 2.75 0 00-.462 3.55l.447.748a1 1 0 01-.218 1.33l-1.206 1.206a1 1 0 01-1.414-1.414l.786-.785a3.74 3.74 0 01.679-4.71l5.838-5.822a3.74 3.74 0 014.693-.679l.785-.786a1 1 0 011.414 1.414l-1.207 1.207a1 1 0 01-1.33-.218l-.748.447a2.75 2.75 0 00-3.549.462z"></path></svg>
              <span class="text-gray-700 font-semibold ml-2">Duration:</span>
              <p class="text-gray-600 ml-2">{{ product.duration }}</p>
            </div>

            <!-- Description -->
            <div class="col-span-2">
              <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 11h10m-6 4h6"></path></svg>
              <span class="text-gray-700 font-semibold ml-2">Description:</span>
              <p class="text-gray-600 ml-2">{{ product.about }}</p>
            </div>

            <!-- Location Link -->
            <div class="col-span-2">
              <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16h1v-1h-1v1zm0-2h1v-1h-1v1zm0-2h1v-1h-1v1z"></path></svg>
              <span class="text-gray-700 font-semibold ml-2">Location Link:</span>
              <a
                  :href="`https://www.google.com/maps?q=${product.linklocation}`"
                  target="_blank"
                  class="text-blue-500 underline ml-2"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-500">
        Loading...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { faVenusMars, faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const route = useRoute()
const productId = route.params.id
const product = ref(null)

const fetchProductDetails = async () => {
  console.log('Product ID:', productId)
  try {
    const response = await axios.get(`https://api.nearus.id/api/product/get/${productId}`)
    console.log('API Response:', response.data) // Print the API response
    product.value = response.data
  } catch (error) {
    console.error('Error fetching product details:', error)
  }
}

const formatPrice = (price) => {
  if (price == null) return 'N/A'
  return `Rp ${price.toLocaleString('id-ID')}`
}

onMounted(fetchProductDetails)
</script>

<style scoped>
/* Add your custom styles here */
</style>
