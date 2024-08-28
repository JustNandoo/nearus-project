<template>
  <div v-if="rooms.length" class="space-y-6 p-6">
    <div v-for="room in rooms" :key="room.roomid" class="bg-white rounded-2xl border border-slate-400 border-opacity-60 shadow-lg flex">
      <div class="w-1/3 flex-shrink-0 overflow-hidden">
        <img :src="room.image" alt="Room Image" class="w-full h-[320px] object-cover rounded-tl-2xl rounded-bl-2xl" />
      </div>
      <div class="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-black mb-2">{{ room.name }}</h2>
          <p class="text-sm text-gray-600 mb-4">{{ room.category }}</p>
          <hr class="border-slate-400 border-opacity-60 mb-4" />
          <div class="flex gap-2 flex-wrap mb-4">
            <div v-for="facility in room.fasilitas.split(',')" :key="facility"
                 class="px-3 py-1 bg-white rounded-md border border-slate-400 border-opacity-60 text-sm font-medium text-center">
              {{ facility }}
            </div>
          </div>
          <p class="text-sm text-gray-600 mb-2">Ketersediaan: {{ room.availability > 0 ? room.availability : 0 }}</p>
        </div>
        <div>
          <p class="text-2xl text-black mb-4">Rp. {{ formatPrice(room.price) }} / {{ room.time }}</p>
          <button @click="handleCheckout(room)"
                  :class="[
            'w-full h-[55px] px-4 py-2 text-base text-center rounded-xl shadow-lg',
            room.availability > 0 ? 'text-white bg-sky-600' : 'text-gray-500 bg-gray-300 cursor-not-allowed'
          ]"
                  :disabled="room.availability <= 0">
            {{ room.availability > 0 ? 'Pilih' : 'Tidak Tersedia' }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center text-gray-600 py-8">No rooms available.</div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

const props = defineProps({
  ownerId: {
    type: [String, Number],
    required: true,
  },
});

const rooms = ref([]);
const router = useRouter();
const store = useStore();

const fetchRooms = async () => {
  try {
    const response = await axios.get(`https://api.nearus.id/api/rooms/${props.ownerId}`);
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

const handleCheckout = async (room) => {
  if (room.availability <= 0) {
    console.warn('Kamar tidak tersedia untuk checkout.');
    return;
  }

  try {
    const userData = store.getters.getUser;

    const requestBody = {
      name: userData.name,
      phonenumber: userData.phone,
      detail: `${room.name}`,
      price: room.price,
      duration: new Date().toISOString().split('T')[0],
      ownerId: room.ownerId,
      image: room.image,
    };

    const response = await axios.post('https://api.nearus.id/api/checkout', requestBody, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data.success) {
      console.log('Checkout berhasil:', response.data.message);
      localStorage.setItem('roomData', JSON.stringify({
        roomName: room.name,
        price: room.price,
        ownerId: room.ownerId,
        image: room.image,
        fasilitas: room.fasilitas
      }));
      router.push('/PaymentReview');
    } else {
      console.error('Checkout gagal:', response.data.message);
    }
  } catch (error) {
    console.error('Error saat checkout:', error);
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
