<template>
  <div class="flex relative w-screen">
    <sidebar />
    <div class="ml-[350px] w-full p-8">
      <!-- Back Button -->
      <button @click="$router.push('/dashboard-kosku')" class="mb-4 font-medium text-[20px]">
        <font-awesome-icon :icon="faArrowLeft" class="" />
        Kembali
      </button>
      <div v-if="product" class="space-y-8">
        <!-- Product Images -->
        <div class="w-full h-[400px] bg-cover bg-center rounded-lg">
          <img v-if="product.images.length === 1" :src="product.images[0]" alt="Product Image" class="w-full h-full object-cover rounded-lg" />
          <div v-else class="flex overflow-x-auto">
            <img v-for="(image, index) in product.images" :key="index" :src="image" alt="Product Image" class="w-full h-[400px] object-cover rounded-lg mr-2" />
          </div>
        </div>
        <div class="text-gray-800 space-y-6">
          <h2 class="text-4xl font-bold">{{ product.productname }}</h2>
          <p class="text-lg text-gray-600">Alamat Kost: {{ product.location }}</p>
          <div class="flex flex-col gap-8">
            <div class="flex items-center">
              <font-awesome-icon :icon="faVenusMars" class="" />
              <span class="text-gray-700 text-[18px] font-medium ml-2">Category:</span>
              <span class="ml-2 text-black text-[20px] font-semibold">{{ product.category }}</span>
            </div>
            <div class="flex items-center">
              <font-awesome-icon :icon="faMoneyBills" class="" />
              <span class="text-gray-700 font-semibold ml-2">Price:</span>
              <span class="ml-2 text-black font-semibold">{{ formatPrice(product.price) }}</span>
            </div>
            <div class="flex items-center">
              <font-awesome-icon :icon="faHandHoldingHeart" class="" />
              <span class="text-gray-700 font-semibold ml-2">Facilities:</span>
              <p class="text-gray-600 ml-2 space-y-1">
                <span v-for="(facility, index) in product.fasilitas.split(',')" :key="index">{{ facility.trim() }}</span>
              </p>
            </div>
            <div class="flex items-center">
              <font-awesome-icon :icon="faClock" class="" />
              <span class="text-gray-700 font-semibold ml-2">Duration:</span>
              <p class="text-gray-600 ml-2">{{ product.duration }}</p>
            </div>

            <!-- Description -->
            <div class="flex items-center">
              <font-awesome-icon :icon="faInfoCircle" class="" />
              <span class="text-gray-700 font-semibold ml-2">Description:</span>
              <p class="text-gray-600 ml-2">{{ product.about }}</p>
            </div>

            <!-- Location Link -->
            <div class="flex items-center">
              <font-awesome-icon :icon="faMap" class="" />
              <span class="text-gray-700 font-semibold ml-2">Location Link:</span>
              <a :href="`https://www.google.com/maps?q=${product.linklocation}`" target="_blank" class="text-blue-500 underline ml-2">
                View on Google Maps
              </a>
              <p class="ml-2">Koordinat Lokasi : {{product.linklocation}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8 font-bold text-[25px]">
        List Produk Kamar
        <div v-if="room" class="bg-white shadow-lg rounded-lg p-4 mt-8 relative">
          <img :src="room.image" alt="Room Image" class="w-full h-[200px] object-cover rounded-t-lg" />
          <div class="p-4">
            <h3 class="text-xl font-bold">{{ room.name }}</h3>
            <p class="text-black text-[18px]">Category: {{ room.category }}</p>
            <p class="text-black text-[18px]">Price: {{ formatPrice(room.price) }}</p>
            <p class="text-black text-[18px]">Time: {{ room.time }}</p>
            <p class="text-black text-[18px]">Availability: {{ room.availability === -1 ? 'Available' : 'Not Available' }}, {{room.availability}} Kamar Tersedia</p>
          </div>
          <!-- Delete Button -->
          <button
              @click="confirmDelete(room.id)"
              class="absolute bottom-4 right-4 bg-red-600 text-white font-bold py-1 px-2 text-[20px] rounded-md"
          >
            Delete Room
          </button>
        </div>
        <button @click="openAddRoomModal" class="mt-10 shadow-md mb-6 bg-blue-600 text-white text-[20px] font-bold py-2 px-4 rounded">
          Tambah Kamar
        </button>
      </div>
    </div>
    <div v-if="showAddRoomModal" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div class="bg-white rounded-lg p-8 w-1/2">
        <h2 class="text-xl font-bold mb-4">Tambah Kamar</h2>
        <form @submit.prevent="addRoom">
          <div class="mb-4">
            <label class="block text-gray-700">Nama Kamar:</label>
            <input v-model="newRoom.name" type="text" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Category:</label>
            <select v-model="newRoom.category" class="w-full p-2 border rounded" required>
              <option value="">Select Category</option>
              <option value="Pria">Pria</option>
              <option value="Campuran">Campuran</option>
              <option value="Wanita">Wanita</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Fasilitas:</label>
            <input v-model="newRoom.fasilitas" type="text" placeholder="Enter facilities, separated by commas" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Images:</label>
            <input type="file" @change="handleFileUpload" class="w-full p-2 border rounded" multiple />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Price:</label>
            <input v-model="newRoom.price" type="number" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Time:</label>
            <input v-model="newRoom.time" type="text" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Availability:</label>
            <input v-model="newRoom.availability" type="number" class="w-full p-2 border rounded" required />
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeAddRoomModal" class="bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2">Cancel</button>
            <button type="submit" class="bg-blue-600 text-white font-bold py-2 px-4 rounded">Add Room</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faVenusMars, faArrowLeft, faMoneyBills, faHandHoldingHeart, faClock, faInfoCircle, faMap } from "@fortawesome/free-solid-svg-icons"
import Sidebar from "@/components/DashboardPemilik/sidebar.vue"

const route = useRoute()
const productId = route.params.id
const product = ref(null)
const room = ref(null)
const showAddRoomModal = ref(false)
const newRoom = ref({
  name: '',
  category: '',
  fasilitas: [], // Changed to array
  image: [], // Changed to array
  price: null,
  time: '',
  availability: null,
})

// Fetch product details
const fetchProductDetails = async () => {
  try {
    const response = await axios.get(`https://api.nearus.id/api/product/get/${productId}`)
    product.value = {
      ...response.data,
      images: response.data.images || [response.data.image]
    }
  } catch (error) {
    console.error('Error fetching product details:', error)
  }
}

// Open Add Room Modal
const openAddRoomModal = () => {
  showAddRoomModal.value = true
}

// Fetch room details
const fetchRoomDetails = async () => {
  if (product.value && product.value.kostid) {
    try {
      const response = await axios.get(`https://api.nearus.id/api/rooms/get/kost/${product.value.kostid}`)
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

// Confirm and Delete Room
const confirmDelete = async (roomId) => {
  if (confirm('Are you sure you want to delete this room?')) {
    try {
      await axios.delete(`https://api.nearus.id/api/rooms/delete/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      alert('Room deleted successfully!')
      room.value = null
    } catch (error) {
      alert('Error deleting room: ' + error.message)
    }
  }
}

const closeAddRoomModal = () => {
  showAddRoomModal.value = false
}

const handleFileUpload = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    newRoom.value.image = Array.from(files) // Store File objects directly
  }
}


const addRoom = async () => {
  try {
    // Create a FormData object
    const formData = new FormData()

    // Append room details
    formData.append('roomid', 0) // Assuming this is managed server-side
    formData.append('ownerId', product.value.ownerId)
    formData.append('kostid', product.value.kostid)
    formData.append('name', newRoom.value.name)
    formData.append('category', newRoom.value.category)
    formData.append('price', newRoom.value.price)
    formData.append('time', newRoom.value.time)
    formData.append('availability', newRoom.value.availability)

    // Append facilities as an array
    newRoom.value.fasilitas.forEach((facility, index) => {
      formData.append(`fasilitas[${index}]`, facility)
    })

    // Append images
    newRoom.value.image.forEach((file, index) => {
      formData.append(`image[${index}]`, file)
    })

    // Send form data
    const response = await axios.post('https://api.nearus.id/api/rooms/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })

    alert('Room added successfully!')
    fetchRoomDetails() // Refresh room list
    closeAddRoomModal()
  } catch (error) {
    console.error('Error adding room:', error)
    alert('Error adding room: ' + error.response?.data?.message || error.message)
  }
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
