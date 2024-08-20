<template>
  <div v-if="rooms.length" class="bg-white rounded-2xl border border-solid border-slate-400 border-opacity-60 mb-8">
    <div v-for="room in rooms" :key="room.roomid" class="flex gap-5 max-md:flex-col max-md:gap-0 mb-6">
      <div class="flex flex-col w-[78%] max-md:w-full">
        <div class="grow max-md:mt-6">
          <div class="flex gap-5 max-md:flex-col max-md:gap-0">
            <div class="flex flex-col w-[43%] max-md:w-full h-full">
              <img :src="room.image" alt="Room Image" class="grow w-full h-full object-cover aspect-[1.96] max-md:mt-2.5" />
            </div>
            <div class="flex flex-col ml-5 w-[57%] max-md:ml-0 max-md:w-full">
              <div class="flex flex-col self-stretch px-5 my-auto max-md:mt-10">
                <div class="text-2xl font-semibold leading-7 text-black mb-4">{{ room.name }}</div>
                <div class="text-sm text-gray-600 mb-4">{{ room.category }}</div>
                <div class="shrink-0 h-px bg-slate-400 border-slate-400 border-opacity-60 mb-4"></div>
                <div class="flex gap-2.5 flex-wrap">
                  <div v-for="facility in room.fasilitas.split(',')" :key="facility"
                       class="px-4 py-2 bg-white rounded-md border border-solid border-slate-400 border-opacity-60 text-sm font-medium text-center">
                    {{ facility }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col ml-5 w-[22%] max-md:ml-0 max-md:w-full">
        <div class="flex flex-col grow px-5 pt-2.5 pb-5 font-semibold border border-solid border-slate-400 border-opacity-20 max-md:mt-6">
          <div class="mt-4 text-sm text-gray-600">Ketersediaan: {{ room.availability }}</div>
          <div class="shrink-0 mt-2 h-px bg-slate-400 border-slate-400 border-opacity-60"></div>
          <div class="self-center mt-20 text-2xl text-center text-black max-md:mt-10"> Rp. {{ formatPrice(room.price) }} / {{ room.time }}</div>
          <button @click="handleCheckout(room)" class="justify-center items-center px-24 py-5  mt-14 text-base text-center text-white bg-sky-600 rounded-xl shadow-2xl">
            Pilih
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center text-gray-600">No rooms available.</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const props = defineProps({
  ownerId: {
    type: [String, Number],
    required: true,
  },
});

const rooms = ref([]);
const router = useRouter();

const fetchRooms = async (ownerId) => {
  try {
    const response = await axios.get(`https://api.nearus.id/api/rooms/${ownerId}`);
    if (response.status === 200 && response.data.data.length > 0) {
      rooms.value = response.data.data;
    } else {
      console.error('No room data available');
    }
  } catch (error) {
    console.error('Error fetching room data:', error);
  }
};

const handleCheckout = async (room) => {
  try {
    const userData = {
      name: 'abcd',
      phonenumber: 12345,
    };

    // Siapkan data permintaan untuk checkout
    const requestBody = {
      name: userData.name,
      phonenumber: userData.phonenumber,
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
      console.log('Checkout successful:', response.data.message);

      localStorage.setItem('roomData', JSON.stringify({
        roomName: room.name,
        price: room.price,
        ownerId: room.ownerId,
        image: room.image,
        fasilitas: room.fasilitas
      }));
      // Mengarahkan ke halaman PaymentReview
      router.push('/PaymentReview');
    } else {
      console.error('Checkout failed:', response.data.message);
    }
  } catch (error) {
    console.error('Error during checkout:', error);
  }
};

onMounted(() => {
  if (props.ownerId) {
    fetchRooms(props.ownerId);
  }
});

watch(() => props.ownerId, (newOwnerId) => {
  if (newOwnerId) {
    fetchRooms(newOwnerId);
  }
});

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
</script>

<style scoped>
/* Add your styles here */
</style>
