<template>
  <div class="relative flex">
    <Sidebar />
    <div class="flex flex-col w-full ml-[350px]">
      <!-- Rest of your content -->
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
      <div v-else class="flex flex-col gap-6 p-4">
        <RoomCard v-for="room in filteredRooms" :key="room.roomid" :room="room" />
      </div>
      <!-- Fixed Button -->
      <div class="fixed bottom-4 right-4 z-50">
        <button @click="showAddRoomModal = true" class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Add New Room
        </button>
      </div>
      <!-- Modal -->
      <div v-if="showAddRoomModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 class="text-lg font-bold mb-4">Add New Room</h2>
          <form @submit.prevent="addRoom">
            <!-- Form Fields -->
            <div class="flex gap-4">
              <button type="button" @click="showAddRoomModal = false" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Add Room
              </button>
            </div>
          </form>
        </div>
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
const showAddRoomModal = ref(false);

const newRoom = ref({
  roomid: 0,
  ownerId: Number(ownerId),
  kostid: null,
  name: '',
  category: '',
  fasilitas: '',
  image: '',
  price: 0,
  time: '',
  availability: 0,
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

const addRoom = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.post('https://api.nearus.id/api/rooms/create', newRoom.value, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    // Refresh the room list
    const response = await axios.get(`https://api.nearus.id/api/rooms/${ownerId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    rooms.value = response.data.data.map(room => ({
      ...room,
      facilities: room.fasilitas.split(','),
      image: room.image || 'default-image-url',
    }));
    showAddRoomModal.value = false;
  } catch (error) {
    console.error('Failed to add room:', error);
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