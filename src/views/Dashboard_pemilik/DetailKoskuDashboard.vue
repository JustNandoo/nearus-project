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
        <div v-for="room in rooms" :key="room.id" class="bg-white shadow-lg rounded-lg p-4 mt-8 relative">
          <img :src="room.image" alt="Room Image" class="w-full h-[200px] object-cover rounded-t-lg" />
          <div class="p-4">
            <h3 class="text-xl font-bold">{{ room.name }}</h3>
            <p class="text-black text-[18px]">Tipe Kamar: {{ room.category }}</p>
            <p class="text-black text-[18px]">Harga Sewa Kamar: {{ formatPrice(room.price) }}</p>
            <p class="text-black text-[18px]">Masa Sewa Kamar: {{ room.time }}</p>
            <p class="text-black text-[18px]">Ketersediaan: {{ room.availability === -1 ? 'Tidak Tersedia' : 'Tersedia' }}, {{room.availability}} Kamar Tersedia</p>
          </div>
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
            <input v-model="newRoom.name" placeholder="Masukan Judul Kamar" type="text" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Tipe Kamar:</label>
            <select v-model="newRoom.category" class="w-full p-2 border rounded" required>
              <option value="">Select Category</option>
              <option value="Pria">Pria</option>
              <option value="Campuran">Campuran</option>
              <option value="Wanita">Wanita</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Fasilitas:</label>
            <input v-model="newRoom.fasilitas" type="text" placeholder="Masukan Fasilitas Kamar (data dipisahkan dari tanda koma" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Gambar Kamar:</label>
            <input type="file" @change="handleFileUpload" class="w-full p-2 border rounded" multiple />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Harga Sewa Kamar:</label>
            <input v-model="newRoom.price" placeholder="Masukan Harga Sewa Kamar" type="number" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Masa Sewa Kamar:</label>
            <input v-model="newRoom.time" placeholder="Masukan Masa Sewa Kamar" type="text" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Ketersediaan Kamar:</label>
            <input v-model="newRoom.availability" placeholder="Masukan Ketersediaan Jumlah Kamar" type="number" class="w-full p-2 border rounded" required />
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
import { useToast } from 'vue-toastification';

const toast = useToast();
const route = useRoute()
const productId = route.params.id
const product = ref(null)
const rooms = ref([]) // Reactive variable for storing the list of rooms
const showAddRoomModal = ref(false)
const newRoom = ref({
  name: '',
  category: '',
  fasilitas: [], // Ensure this is an array
  image: [], // Ensure this is an array
  price: 0,
  time: '',
  availability: 0,
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
// Fetch room details
const fetchRoomDetails = async () => {
  if (product.value && product.value.kostid) {
    try {
      const response = await axios.get(`https://api.nearus.id/api/rooms/get/kost/${product.value.kostid}`)
      console.log('Fetch room details response:', response.data);
      rooms.value = response.data.data || [] // Update to use `rooms` instead of `room`
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
const confirmDelete = async (id) => {
  if (confirm('Are you sure you want to delete this room?')) {
    try {
      const response = await axios.delete(`https://api.nearus.id/api/rooms/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Delete room response:', response.data); // Log the response data for debugging
      toast.success('Room deleted successfully!');
      fetchRoomDetails(); // Refresh room list
    } catch (error) {
      // Log detailed error information
      console.error('Error deleting room:', error);

      // Show an error message to the user
      toast.error(`Error deleting room: ${error.response?.data?.message || error.message}`);
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

    // Convert fasilitas to an array if it's a string
    const fasilitasArray = typeof newRoom.value.fasilitas === 'string'
        ? newRoom.value.fasilitas.split(',').map(facility => facility.trim())
        : newRoom.value.fasilitas

    // Append facilities as an array
    fasilitasArray.forEach((facility, index) => {
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

    toast.success('Data Kamar berhasil ditambahkan!');
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
