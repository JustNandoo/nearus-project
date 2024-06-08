<template>
    <div class="bg-white rounded-2xl border border-solid border-slate-400 border-opacity-60 mb-8">
      <div class="flex gap-5 max-md:flex-col max-md:gap-0">
        <div class="flex flex-col w-[78%] max-md:w-full">
          <div class="grow max-md:mt-6">
            <div class="flex gap-5 max-md:flex-col max-md:gap-0">
              <div class="flex flex-col w-[43%] max-md:w-full">
                <img :src="roomImage" alt="Room Image" class="grow w-full aspect-[1.96] max-md:mt-2.5"/>
              </div>
              <div class="flex flex-col ml-5 w-[57%] max-md:ml-0 max-md:w-full">
                <div class="flex flex-col self-stretch px-5 my-auto max-md:mt-10">
                  <div class="text-2xl font-semibold leading-7 text-black">{{ room.name }}</div>
                  <div class="flex gap-5 justify-between items-start px-px mt-6 w-full text-black max-md:flex-wrap">
                    <div class="flex gap-2.5 text-xs font-light leading-7 text-center">
                      <div v-for="feature in room.features" :key="feature" class="px-5 py-2 bg-white rounded-md border border-solid border-slate-400 border-opacity-60">
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
                      <div v-for="(facility, index) in room.facilities" :key="index" class="flex flex-col w-[30%] max-md:w-full">
                        <div class="flex flex-col text-sm leading-7 text-black whitespace-nowrap">
                          <div v-for="(item, idx) in facility.items" :key="idx" class="flex gap-5 justify-between mt-6 first:mt-0">
                            <img :src="item.icon" alt="Facility Icon" class="shrink-0 w-7 aspect-square"/>
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
          <div class="flex flex-col grow px-5 pt-2.5 pb-5 font-semibold border border-solid border-slate-400 border-opacity-60 max-md:mt-6">
            <div class="shrink-0 mt-1 h-px bg-slate-400 border-slate-400 border-opacity-60"></div>
            <div class="self-center mt-20 text-2xl text-center text-blue-600 max-md:mt-10">{{ room.price }}</div>
            <div class="justify-center items-center px-16 py-5 mx-2.5 mt-14 text-base text-center text-white bg-sky-600 rounded-xl shadow-2xl max-md:px-5 max-md:mt-10">
              Pilih
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  import bedIcon from  '@/assets/images2/ph_bed-duotone.png';
  import acIcon from '@/assets/images2/streamline_hotel-air-conditioner.png';
  import deskIcon from '@/assets/images2/material-symbols-light_table-restaurant-outline.png';
  import socketIcon from '@/assets/images2/guidance_socket.png';
  import bathroomIcon from '@/assets/images2/ph_shower-thin.png';
  import toiletIcon from '@/assets/images2/ph_toilet-thin.png';
  import wardrobeIcon from '@/assets/images2/mdi_wardrobe-outline.png';
  import mirrorIcon from '@/assets/images2/mdi_mirror.png';
  import availableIcon from '@/assets/images2/lets-icons_check-fill.png';
  import roomImage from '@/assets/images/image 3.png';

  const room = ref({
    name: 'Kamar No.1',
    image: 'https://example.com/room-image.jpg',
    features: ['5 X 8 M', 'non-listrik', 'pria'],
    facilities: [
      {
        items: [
          { icon: bedIcon, name: 'Kasur' },
          { icon: acIcon, name: 'AC' },
          { icon: deskIcon, name: 'Meja' },
        ],
      },
      {
        items: [
          { icon: socketIcon, name: 'Colokan' },
          { icon: bathroomIcon, name: 'Kamar Mandi Dalam' },
          { icon: toiletIcon, name: 'Kloset Duduk' },
        ],
      },
      {
        items: [
          { icon: wardrobeIcon, name: 'Lemari Baju' },
          { icon: mirrorIcon, name: 'Cermin' },
        ],
      },
    ],
    price: 'Rp 7.200.000/6bln',
    availabilityIcon: availableIcon,
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  