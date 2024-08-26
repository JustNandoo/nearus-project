<template>
  <div class="flex">
    <Sidebar />
    <div class="flex flex-col w-full">
      <div class="flex items-center gap-2 ml-4 mt-4 mb-2">
        <FontAwesomeIcon class="text-black" :icon="faChevronLeft" />
        <router-link to="/dashboard-kosku" class="text-black font-bold text-[20px]">Kembali</router-link>
      </div>
      <hr class="w-full bg-black h-[2px]">
      <div class="flex justify-between items-center p-4">
        <h1 class="text-center mt-2 text-black font-bold text-[25px]">List Kamar</h1>
        <div class="flex items-center gap-4">
          <input
              type="text"
              placeholder="Search..."
              v-model="searchQuery"
              class="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
              v-model="filterCategory"
              class="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Pria">Pria</option>
            <option value="Wanita">Wanita</option>
            <option value="Campur">Campur</option>
          </select>
        </div>
      </div>
      <div v-if="isLoading" class="text-center">Loading...</div>
      <div v-else>
        <div v-if="filteredRooms.length === 0" class="text-center text-gray-500 mt-4">
          Maaf, belum ada data kamar
        </div>
        <div v-else class="flex flex-col gap-6 p-4">
          <RoomCard v-for="room in filteredRooms" :key="room.roomid" :room="room" />
        </div>
      </div>
    </div>
    <!-- Add Room Button -->
    <button
        @click="showModal = true"
        class="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Add Room
    </button>
    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 class="text-lg font-bold mb-4">Add Room</h2>
        <form @submit.prevent="addRoom" enctype="multipart/form-data">
          <div class="mb-4">
            <label for="productname" class="block text-sm font-medium text-gray-700">Room Name</label>
            <input
                id="productname"
                v-model="newRoom.productname"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
            />
          </div>
          <div class="mb-4">
            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
            <select
                id="category"
                v-model="newRoom.category"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
            >
              <option value="Pria">Pria</option>
              <option value="Wanita">Wanita</option>
              <option value="Campur">Campur</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <input
                id="location"
                v-model="newRoom.location"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                readonly
            />
            <button
                type="button"
                @click="getCurrentLocation"
                class="mt-2 bg-gray-200 text-black px-4 py-2 rounded-md shadow-sm hover:bg-gray-300"
            >
              Use Current Location
            </button>
          </div>
          <div class="mb-4">
            <label for="linklocation" class="block text-sm font-medium text-gray-700">Location Coordinates</label>
            <input
                id="linklocation"
                v-model="newRoom.linklocation"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                readonly
            />
          </div>
          <div class="mb-4">
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <input
                id="price"
                v-model="newRoom.price"
                type="number"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
            />
          </div>
          <div class="mb-4">
            <label for="fasilitas" class="block text-sm font-medium text-gray-700">Facilities (comma-separated)</label>
            <input
                id="fasilitas"
                v-model="newRoom.fasilitas"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
            />
          </div>
          <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
            <input
                id="image"
                type="file"
                @change="handleFileChange"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
            />
          </div>
          <div class="mb-4">
            <label for="about" class="block text-sm font-medium text-gray-700">About</label>
            <textarea
                id="about"
                v-model="newRoom.about"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="duration" class="block text-sm font-medium text-gray-700">Duration</label>
            <input
                id="duration"
                v-model="newRoom.duration"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
            />
          </div>
          <div class="flex justify-end gap-4">
            <button
                type="button"
                @click="showModal = false"
                class="bg-gray-300 text-black px-4 py-2 rounded-md shadow-sm hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
            >
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import RoomCard from "@/components/Home/RoomCard.vue";
import axios from 'axios';

const route = useRoute();
const ownerId = route.params.ownerId;

const rooms = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');
const filterCategory = ref('');
const showModal = ref(false);
const newRoom = ref({
  id: null,
  productname: '',
  ownerId: ownerId,
  location: '',
  category: '',
  linklocation: '',
  price: '',
  fasilitas: '',
  image: null,
  roomid: null,
  about: '',
  duration: '',
});

onMounted(async () => {
  console.log('Fetching rooms for ownerId:', ownerId);
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`https://api.nearus.id/api/rooms/${ownerId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('API Response:', response.data);
    if (response.status === 200 && response.data.data) {
      rooms.value = response.data.data.map(room => ({
        ...room,
        facilities: room.fasilitas.split(','),
        image: room.image || 'default-image-url',
      }));
    }
    isLoading.value = false;
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    isLoading.value = false;
  }
});

const filteredRooms = computed(() => {
  return rooms.value.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = filterCategory.value ? room.category === filterCategory.value : true;
    return matchesSearch && matchesCategory;
  });
});

const handleFileChange = (event) => {
  newRoom.value.image = event.target.files[0];
};

const addRoom = async () => {
  const formData = new FormData();
  formData.append('id', newRoom.value.id);
  formData.append('image', newRoom.value.image);
  formData.append('productname', newRoom.value.productname);
  formData.append('ownerId', newRoom.value.ownerId);
  formData.append('location', newRoom.value.location);
  formData.append('category', newRoom.value.category);
  formData.append('linklocation', newRoom.value.linklocation);
  formData.append('price', newRoom.value.price);
  formData.append('fasilitas', newRoom.value.fasilitas);
  formData.append('roomid', newRoom.value.roomid);
  formData.append('about', newRoom.value.about);
  formData.append('duration', newRoom.value.duration);

  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('https://api.nearus.id/api/rooms/create', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      rooms.value.push(response.data.data);
      newRoom.value = {
        id: null,
        productname: '',
        ownerId: ownerId,
        location: '',
        category: '',
        linklocation: '',
        price: '',
        fasilitas: '',
        image: null,
        roomid: null,
        about: '',
        duration: '',
      };
      showModal.value = false;
    }
  } catch (error) {
    console.error('Failed to add room:', error);
  }
};

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      newRoom.value.location = `Latitude: ${latitude}, Longitude: ${longitude}`;
      newRoom.value.linklocation = `${latitude}, ${longitude}`;
    }, (error) => {
      console.error('Failed to get location:', error);
    });
  } else {
    console.warn('Geolocation is not supported by this browser.');
  }
};
</script>





<style scoped>
input, select {
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus, select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
</style>
