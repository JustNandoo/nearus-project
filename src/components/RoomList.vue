<template>
  <div class="bg-white rounded-2xl border border-solid border-slate-400 border-opacity-60 mb-8">
    <div class="flex gap-5 max-md:flex-col max-md:gap-0">
      <div class="flex flex-col w-[78%] max-md:w-full">
        <div class="grow max-md:mt-6">
          <div class="flex gap-5 max-md:flex-col max-md:gap-0">
            <div class="flex flex-col w-[43%] max-md:w-full">
              <img :src="room.image" alt="Room Image" class="grow w-full aspect-[1.96] max-md:mt-2.5" />
            </div>
            <div class="flex flex-col ml-5 w-[57%] max-md:ml-0 max-md:w-full">
              <div class="flex flex-col self-stretch px-5 my-auto max-md:mt-10">
                <div class="text-2xl font-semibold leading-7 text-black">{{ room.name }}</div>
                <div class="flex gap-5 justify-between items-start px-px mt-6 w-full text-black max-md:flex-wrap">
                  <div class="flex gap-2.5 text-xs font-light leading-7 text-center">
                    <div v-for="feature in room.features" :key="feature"
                         class="px-5 py-2 bg-white rounded-md border border-solid border-slate-400 border-opacity-60">
                      {{ feature }}
                    </div>
                  </div>
                  <div class="flex flex-col mt-3.5 text-sm font-medium leading-7">
                    <div>Lihat Detail</div>
                    <div class="shrink-0 mt-1 h-px bg-black border border-black"></div>
                  </div>
                </div>
                <div class="shrink-0 mt-2 h-px bg-slate-400 border-slate-400 border-opacity-60"></div>
                <div class="mt-4">
                  <div class="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div v-for="(facility, index) in room.facilities" :key="index"
                         class="flex flex-col w-[30%] max-md:w-full justify-start">
                      <div class="flex flex-col text-sm leading-7 text-black whitespace-nowrap">
                        <div v-for="(item, idx) in facility.items" :key="idx"
                             class="flex gap-5 mt-6 first:mt-0 items-center">
                          <img :src="item.icon" alt="Facility Icon" class="shrink-0 w-7 aspect-square" />
                          <div class="my-auto">{{ item.name }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col ml-5 w-[22%] max-md:ml-0 max-md:w-full">
        <div class="flex flex-col grow px-5 pt-2.5 pb-5 font-semibold border border-solid border-slate-400 border-opacity-20 max-md:mt-6">
          <div class="shrink-0 mt-1 h-px bg-slate-400 border-slate-400 border-opacity-60"></div>
          <div class="self-center mt-20 text-2xl text-center text-black max-md:mt-10">{{ room.price }} / {{room.time}}</div>
          <button @click="handleCheckout" class="justify-center items-center px-24 py-5 ml-12 mt-14 text-base text-center text-white bg-sky-600 rounded-xl shadow-2xl">
            Pilih
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from "@/router/index.js";

import bedIcon from '../assets/images/ph_bed-duotone.png';
import acIcon from '../assets/images/streamline_hotel-air-conditioner.png';
import deskIcon from '../assets/images/material-symbols-light_table-restaurant-outline.png';
import socketIcon from '../assets/images/guidance_socket.png';
import bathroomIcon from '../assets/images/ph_shower-thin.png';
import toiletIcon from '../assets/images/ph_toilet-thin.png';
import wardrobeIcon from '../assets/images/mdi_wardrobe-outline.png';
import mirrorIcon from '../assets/images/mdi_mirror.png';
import availableIcon from '../assets/images/lets-icons_check-fill.png';
import roomImage from '../assets/images/image 3.png';

// const room = ref({
//   name: 'Kamar Test',
//   image: roomImage,
//   features: ['5 X 8 M', 'non-listrik', 'pria'],
//   facilities: [
//     {
//       items: [
//         { icon: bedIcon, name: 'Kasur' },
//         { icon: acIcon, name: 'AC' },
//         { icon: deskIcon, name: 'Meja' },
//       ],
//     },
//     {
//       items: [
//         { icon: socketIcon, name: 'Colokan' },
//         { icon: bathroomIcon, name: 'Kamar Mandi Dalam' },
//         { icon: toiletIcon, name: 'Kloset Duduk' },
//       ],
//     },
//     {
//       items: [
//         { icon: wardrobeIcon, name: 'Lemari Baju' },
//         { icon: mirrorIcon, name: 'Cermin' },
//       ],
//     },
//   ],
//   price: 'Rp 7.200.000/6bln',
//   availabilityIcon: availableIcon,
//   ownerId: ''
// });

// Dummy user data
const user = ref({
  name: 'John Doe',
  phonenumber: '1234567890',
  email: 'johndoe@example.com'
});

const room = ref({});

const fetchProductData = async () => {
  try {
    const response = await axios.get('https://api.nearus.id/api/rooms/19');
    if (response.status === 200 && response.data.data.length > 0) {
      const selectedProduct = response.data.data[0];
      console.log(selectedProduct);
      if (selectedProduct){
        room.value = {
          name: selectedProduct.name,
          image: selectedProduct.image,
          price: selectedProduct.price,
          time: selectedProduct.time,
        }
      }
    } else {
      console.error('No product data available');
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
};

const handleCheckout = async () => {
  try {
    // Prepare the request body
    const requestBody = {
      name: user.value.name,
      phonenumber: user.value.phonenumber,
      detail: `${room.value.name} - ${product.value.productname}`,
      price: 7200000,
      duration: new Date().toISOString().split('T')[0],
      ownerId: room.value.ownerId
    };

    console.log('Request body:', requestBody);

    // Make the checkout request
    const response = await axios.post('https://api.nearus.id/api/checkout', requestBody, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });

    console.log('Response:', response.data);

    if (response.data.success) {
      console.log('Checkout successful:', response.data.message);

      localStorage.setItem('roomData', JSON.stringify({
        roomName: room.value.name,
        productName: product.value.productname,
        price: room.value.price,
        ownerId: room.value.ownerId
      }));

      router.push('/PaymentReview');
    } else {
      console.error('Checkout failed:', response.data.message);
    }
  } catch (error) {
    console.error('Error during checkout:', error.response?.data || error.message);
    console.log('Error details:', error); // Log the entire error object for further inspection
  }
};

onMounted(async () => {
  await fetchProductData();
});
</script>


<style scoped>
/* Add your styles here */
</style>
