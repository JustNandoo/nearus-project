<template>
  <div>
    <NavFixed />
    <ProfileCard v-if="showProfileCard" class="profile-card" />
    <Gallery />
    <div class="ml-36 mr-36 mt-5 flex justify-between">
      <div class="flex flex-col">
        <div class="flex items-center gap-3">
          <font-awesome-icon class="text-light-black w-5 h-5" :icon="faMedal" />
          <p class="font-light text-[17px]">Rekomendasi</p>
        </div>
        <div class="flex flex-col gap-1">
          <h1 class="uppercase font-bold text-[35px]">{{ product.productname }}</h1>
          <p class="text-black font-light text-[17px]">{{ product.location }}</p>
          <div class="flex items-center gap-2">
            <font-awesome-icon class="text-light-black w-5 h-5" :icon="faPerson" />
            <p class="text-black font-light text-[15px]">Kost {{ product.category }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-3 w-96 text-end">
        <div class="flex flex-col gap-2">
          <h1 class="font-bold text-[24px]">Mulai Dari</h1>
          <h1 class="font-bold text-[24px]">Rp.{{product.price}} / 6 bulan</h1>
        </div>
        <div class="flex gap-2 items-center w-full justify-between">
          <button class="rounded-lg border-black border-2 w-20 h-12">
            <font-awesome-icon class="text-light-black w-6 h-6" :icon="faMessage" />
          </button>
          <button class="bg-blue-primary w-full h-12 rounded-lg shadow-lg">
            <a class="no-underline text-white font-medium" href="">Lihat Kamar</a>
          </button>
        </div>
      </div>
    </div>
    <hr class="my-10 ml-32 mr-32 border-t-4 border-neutral-300 mb-10">
    <div class="mt-10 mr-32 ml-32 mb-20">
      <h1 class="font-bold text-[28px]">Fasilitas Bersama</h1>
      <hr class="my-10 border-t-4 border-neutral-300 mb-10 w-full">
      <div>
        <h1 class="font-bold text-[28px]">Lokasi</h1>
        <div class="flex gap-8">
          <LeafletMap />
          <div class="container mx-auto py-8">
            <div v-for="item in items" :key="item.id" class="flex items-center justify-between py-5">
             <div class="flex items-center gap-5">
               <div class="flex-shrink-0">
                 <img :src="icon1" alt="icon" class="w-10 h-10 object-cover">
               </div>
               <div class="flex-1 text-center">
                 <h2 class="text-[15px] text-black">{{ item.title }}</h2>
               </div>
             </div>
              <div class="flex-shrink-0 text-right">
                <p class="text-[15px] text-black">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-10 border-t-4 border-neutral-300 mb-10 w-full">
        <div>
          <h1 class="font-bold text-[28px] mb-10">Kamar</h1>
          <ProductDetail/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script setup>
import { faMedal, faPerson, faMessage } from "@fortawesome/free-solid-svg-icons";
import NavFixed from "@/components/NavFixed.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import ProfileCard from "@/components/ProfileCard.vue";
import Gallery from "@/components/Gallery.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from 'axios';
import LeafletMap from "@/components/LeafletMap.vue";
import Footer from "@/components/Footer.vue";

const showProfileCard = ref(false);
const product = ref({});
const toggleProfileCard = () => {
  showProfileCard.value = !showProfileCard.value;
};

import icon1 from '@/assets/images/school.png';
import icon2 from '@/assets/images/tempatmakan.png';
import icon3 from '@/assets/images/tokokelontong.png';
import icon4 from '@/assets/images/laundry.png';
import ProductDetail from "@/components/ProductDetail.vue";

const items = ref([
  {
    id: 1,
    icon: 'icon1',
    title: 'Title 1',
    text: 'Text 1',
  },
  {
    id: 2,
    icon: 'icon2',
    title: 'Title 2',
    text: 'Text 2',
  },
  {
    id: 3,
    icon: 'icon3',
    title: 'Title 3',
    text: 'Text 3',
  },
  {
    id: 4,
    icon: 'icon4',
    title: 'Title 4',
    text: 'Text 4',
  },
]);

onMounted(async () => {
  try {
    const response = await axios.get('https://nearus.id/api/product');
    console.log('API Response:', response);
    const data = response.data.data;

    if (data && data.length > 0) {
      product.value = {
        productname: data[11].productname,
        location: data[11].location,
        category: data[11].category,
        price: data[11].price
      };
    } else {
      console.error('Error fetching product data: no data response');
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
});

onMounted(() => {
  window.addEventListener('toggle-profile-card', toggleProfileCard);
});

onBeforeUnmount(() => {
  window.removeEventListener('toggle-profile-card', toggleProfileCard);
});
</script>

<style lang="scss" scoped>
</style>