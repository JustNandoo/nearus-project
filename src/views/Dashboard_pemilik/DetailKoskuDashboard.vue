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
        <!-- Product Images -->
        <div class="w-full h-[400px] bg-cover bg-center rounded-lg">
          <img
              v-if="product.images.length === 1"
              :src="product.images[0]"
              alt="Product Image"
              class="w-full h-full object-cover rounded-lg"
          />
          <div v-else class="flex overflow-x-auto">
            <img
                v-for="(image, index) in product.images[0]"
                :key="index"
                :src="image"
                alt="Product Image"
                class="w-full h-[400px] object-cover rounded-lg mr-2"
            />
          </div>
        </div>
        <div class="text-gray-800 space-y-6">
          <h2 class="text-4xl font-bold">{{ product.productname }}</h2>
          <p class="text-lg text-gray-600">Alamat Kost: {{ product.location }}</p>
          <div class="flex flex-col gap-8">
            <div class="flex items-center">
              <font-awesome-icon :icon="faVenusMars" class=""/>
              <span class="text-gray-700 text-[18px] font-medium ml-2">Category:</span>
              <span class="ml-2 text-black text-[20px] font-semibold">{{ product.category }}</span>
            </div>
            <div class="flex items-center">
              <font-awesome-icon :icon="faMoneyBills" class=""/>
              <span class="text-gray-700 font-semibold ml-2">Price:</span>
              <span class="ml-2 text-black font-semibold">{{ formatPrice(product.price) }}</span>
            </div>
            <div class="flex items-center">
              <font-awesome-icon :icon="faHandHoldingHeart" class=""/>
              <span class="text-gray-700 font-semibold ml-2">Facilities:</span>
              <p class="text-gray-600 ml-2 space-y-1">
                <span v-for="(facility, index) in product.fasilitas.split(',')" :key="index">{{ facility.trim() }}</span>
              </p>
            </div>
            <div class="flex items-center">
              <font-awesome-icon :icon="faClock" class=""/>
              <span class="text-gray-700 font-semibold ml-2">Duration:</span>
              <p class="text-gray-600 ml-2">{{ product.duration }}</p>
            </div>

            <!-- Description -->
            <div class="flex items-center">
              <font-awesome-icon :icon="faInfoCircle" class=""/>
              <span class="text-gray-700 font-semibold ml-2">Description:</span>
              <p class="text-gray-600 ml-2">{{ product.about }}</p>
            </div>

            <!-- Location Link -->
            <div class="flex items-center">
              <font-awesome-icon :icon="faMap" class=""/>
              <span class="text-gray-700 font-semibold ml-2">Location Link:</span>
              <a
                  :href="`https://www.google.com/maps?q=${product.linklocation}`"
                  target="_blank"
                  class="text-blue-500 underline ml-2"
              >
                View on Google Maps
              </a>
              <p class="ml-2">Koordinat Lokasi : {{product.linklocation}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8 font-bold text-[25px]">
        List Produk Kamar
        <div v-if="room" class="bg-white shadow-lg rounded-lg p-4 mt-8">
          <img :src="room.image" alt="Room Image" class="w-full h-[200px] object-cover rounded-t-lg">
          <div class="p-4">
            <h3 class="text-xl font-bold">{{ room.name }}</h3>
            <p class="text-black text-[18px]">Category: {{ room.category }}</p>
            <p class="text-black text-[18px]">Price: {{ formatPrice(room.price) }}</p>
            <p class="text-black text-[18px]">Time: {{ room.time }}</p>
            <p class="text-black text-[18px]">Availability: {{ room.availability === -1 ? 'Available' : 'Not Available' }}, {{room.availability}} Kamar Tersedia</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faVenusMars, faArrowLeft, faMoneyBills, faHandHoldingHeart, faClock, faInfoCircle, faMap } from "@fortawesome/free-solid-svg-icons";

const route = useRoute()
const productId = route.params.id
const product = ref(null)
const room = ref(null)

// Fetch product details
const fetchProductDetails = async () => {
  console.log('Product ID:', productId)
  try {
    const response = await axios.get(`https://api.nearus.id/api/product/get/${productId}`)
    console.log('Product API Response:', response.data) // Print the API response
    // Assuming the product image is now an array
    product.value = {
      ...response.data,
      images: response.data.images || [response.data.image] // Convert to array if needed
    }
  } catch (error) {
    console.error('Error fetching product details:', error)
  }
}

// Fetch room details
const fetchRoomDetails = async () => {
  if (product.value && product.value.kostid) {
    console.log('Kost ID:', product.value.kostid)
    try {
      const response = await axios.get(`https://api.nearus.id/api/rooms/get/kost/${product.value.kostid}`)
      console.log('Room API Response:', response.data) // Print the API response
      // Extract the room data from the response
      room.value = response.data.data[0] || null
    } catch (error) {
      console.error('Error fetching room details:', error)
    }
  } else {
    console.error('No kostid found in product data.')
  }
}

// Format price
const formatPrice = (price) => {
  if (price == null) return 'N/A'
  return `Rp ${price.toLocaleString('id-ID')}`
}

// Fetch details on mount
onMounted(() => {
  fetchProductDetails()
})

// Watch for product changes and fetch room details
watch(product, (newProduct) => {
  if (newProduct) {
    fetchRoomDetails()
  }
})
</script>


<style scoped>
/* Add your custom styles here */
</style>
