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
      <div v-else class="flex flex-col gap-6 p-4">
        <RoomCard v-for="room in filteredRooms" :key="room.roomid" :room="room" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from "@/components/sidebar.vue";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import RoomCard from "@/components/RoomCard.vue";
import axios from 'axios';

const route = useRoute();
const ownerId = route.params.ownerId;

const rooms = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');
const filterCategory = ref('');

onMounted(async () => {
  console.log('Fetching rooms for ownerId:', ownerId); // Debugging log
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`https://api.nearus.id/api/rooms/${ownerId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('API Response:', response.data); // Debugging log
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
