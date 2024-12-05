<template>
  <!-- Existing content... -->
  <div v-if="rooms.length" class="space-y-6 p-4 md:p-6 lg:p-8">
    <div v-for="room in rooms" :key="room.roomid" class="bg-white rounded-2xl border border-slate-400 border-opacity-60 shadow-lg flex flex-col lg:flex-row">
      <div class="w-full lg:w-1/3 flex-shrink-0 overflow-hidden">
        <img :src="room.image" alt="Room Image" class="w-full h-[260px] md:h-[300px] lg:h-[360px] object-cover rounded-2xl" />
      </div>
      <div class="w-full lg:w-2/3 p-4 md:p-6 flex flex-col justify-between">
        <div>
          <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold text-black mb-2">{{ room.name }}</h2>
          <p class="text-sm md:text-base text-gray-600 mb-4">{{ room.category }}</p>
          <hr class="border-slate-400 border-opacity-60 mb-4" />
          <div class="flex gap-2 flex-wrap mb-4">
            <div v-for="facility in room.fasilitas.split(',')" :key="facility" class="px-2 py-1 text-xs md:text-sm bg-white rounded-md border border-slate-400 border-opacity-60 text-center">
              {{ facility }}
            </div>
          </div>
          <p class="text-sm md:text-base text-gray-600 mb-2">Ketersediaan: {{ room.availability > 0 ? room.availability : 0 }} Kamar Tersisa</p>
        </div>
        <div>
          <p class="text-xl md:text-2xl lg:text-3xl text-black mb-4">Rp. {{ formatPrice(room.price) }} / {{ room.time }}</p>
          <button @click="openConfirmationModal(room)"
                  :class="[
            'w-full h-12 px-4 py-2 text-base text-center rounded-xl shadow-lg',
            room.availability > 0 ? 'text-white bg-sky-600' : 'text-gray-500 bg-gray-300 cursor-not-allowed'
          ]"
                  :disabled="room.availability <= 0 || loading">
            {{ room.availability > 0 ? 'Pilih' : 'Tidak Tersedia' }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center text-gray-600 py-8">No rooms available.</div>
  <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div class="text-white text-xl">Loading...</div>
  </div>

  <!-- Modal -->
  <div v-if="showConfirmation" class="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50 transition-opacity duration-300">
    <div class="bg-white rounded-lg p-10 w-full max-w-lg shadow-md transform transition-all duration-300 ease-in-out">
      <h2 class="text-2xl font-semibold text-gray-800 mb-8 text-center">Pilih Masa Sewa</h2>

      <div class="mb-6">
        <label for="quantity" class="block text-base text-gray-500 mb-2">Masa Sewa (/bulan):</label>
        <input
            id="quantity"
            v-model.number="quantity"
            type="number"
            min="1"
            class="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
      </div>

      <p class="text-lg font-medium text-gray-800 mb-8 text-center">Total Harga: <span class="text-blue-600">Rp. {{ formatPrice(roomToExtend.price * quantity) }}</span></p>

      <div class="flex justify-center space-x-4">
        <button
            @click="showConfirmation = false"
            class="bg-gray-200 text-gray-600 font-medium px-6 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
        >
          Batal
        </button>
        <button
            @click="extendRental"
            :class="[
              'bg-blue-500 text-white font-medium px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200',
              loading ? 'cursor-not-allowed opacity-50' : ''
            ]"
            :disabled="loading"
        >
          <span v-if="loading">Loading...</span>
          <span v-else>Lanjutkan</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const props = defineProps({
  ownerId: {
    type: [String, Number],
    required: true,
  },
});

const rooms = ref([]);
const loading = ref(false);
const router = useRouter();
const store = useStore();
const showConfirmation = ref(false);
const quantity = ref(1);
const roomToExtend = ref(null);

const fetchRooms = async () => {
  try {
    const response = await axios.get(`https://api.nearus.id/api/rooms/get/kost/${props.ownerId}`);
    if (response.status === 200 && response.data.data.length > 0) {
      rooms.value = response.data.data;
    } else {
      rooms.value = [];
    }
  } catch (error) {
    console.error('Error fetching room data:', error);
    rooms.value = [];
  }
};

const openConfirmationModal = (room) => {
  roomToExtend.value = room;
  showConfirmation.value = true;
};

const extendRental = async () => {
  if (quantity.value < 1) {
    console.warn('Kuantitas harus lebih dari 0.');
    return;
  }

  loading.value = true;  // Show loading state
  try {
    const userData = store.getters.getUser;

    const requestBody = {
      name: userData.name,
      phonenumber: userData.phonenumber,
      detail: roomToExtend.value.name,
      price: roomToExtend.value.price * quantity.value,
      duration: new Date().toISOString().split('T')[0],
      ownerId: roomToExtend.value.ownerId,
      image: roomToExtend.value.image,
      quantity: quantity.value,
    };

    localStorage.setItem('quantity', quantity.value); // Save the quantity to localStorage

    const response = await axios.post('https://api.nearus.id/api/checkout', requestBody, {
      headers: {
        Authorization: `Bearer ${store.state.token}`,
      },
    });

    if (response.data.success) {
      localStorage.setItem('newduration', JSON.stringify({
        duration: response.data.duration,
      }));
      localStorage.setItem('roomData', JSON.stringify({
        roomName: roomToExtend.value.name,
        price: roomToExtend.value.price,
        ownerId: roomToExtend.value.ownerId,
        image: roomToExtend.value.image,
        fasilitas: roomToExtend.value.fasilitas,
      }));
      router.push('/PaymentReview');
    } else {
      console.error('Checkout gagal:', response.data.message);
    }
  } catch (error) {
    console.error('Error saat checkout:', error);
  } finally {
    loading.value = false;  // Hide loading state
    showConfirmation.value = false;
  }
};

watch(() => props.ownerId, (newOwnerId) => {
  if (newOwnerId) {
    fetchRooms();
  }
});

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

onMounted(() => {
  if (props.ownerId) {
    fetchRooms();
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>
