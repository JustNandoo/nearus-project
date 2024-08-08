<template>
  <div>
    <NavFixed />
    <ProfileCard v-if="showProfileCard" class="profile-card" />
    <Gallery :images="roomImages" />

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
          <h1 class="font-bold text-[24px]">Rp.{{ product.price }} </h1>
        </div>
        <div class="flex gap-2 items-center w-full justify-between">
          <button class="rounded-lg border-black border-2 w-20 h-12 flex items-center justify-center">
            <font-awesome-icon class="text-light-black w-6 h-6" :icon="faMessage" />
          </button>
          <button class="bg-blue-primary w-full h-12 rounded-lg shadow-lg flex items-center justify-center">
            <a class="no-underline text-white font-medium" href="#">Lihat Kamar</a>
          </button>
        </div>
      </div>
    </div>
    <hr class="my-10 ml-32 mr-32 border-t-4 border-neutral-300 mb-10">
    <div class="mt-10 mr-32 ml-32 mb-20">
      <h1 class="font-bold text-[28px] mb-4">Fasilitas Bersama</h1>
      <div v-if="facilities.length" class="flex flex-wrap gap-4">
        <p  class="text-black text-lg font-montserrat mr-4 mb-2">
          {{ facilities }}
        </p>
      </div>
      <p v-else class="text-gray-500">Belum ada data fasilitas</p>
      <hr class="my-10 border-t-4 border-neutral-300 mb-10 w-full">
      <div>
        <h1 class="font-bold text-[28px] mb-4">Lokasi</h1>
        <div class="flex gap-8 justify-between">
          <div class="">
            <LeafletMap />
          </div>
          <div class="w-1/2 container mx-auto py-8">
            <div v-for="item in items" :key="item.id" class="flex items-center justify-between py-5">
              <div class="flex items-center gap-5">
                <div class="flex-shrink-0">
                  <img :src="item.icon" alt="icon" class="w-8 h-8 object-cover">
                </div>
                <div class="flex-1">
                  <h2 class="text-[18px] text-black">{{ item.title }}</h2>
                </div>
              </div>
              <div class="flex-shrink-0">
                <p class="text-[18px] text-black">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-10 border-t-4 border-neutral-300 mb-10 w-full">
        <div>
          <h1 class="font-bold text-[28px] mb-10">Kamar</h1>
          <RoomList :ownerId="ownerId" />
          <hr class="my-10 border-t-4 border-neutral-300 mb-10 w-full">
        </div>
      </div>
    </div>
    <div id="disqus_thread"></div>
    <Footer />
  </div>
</template>

<script setup>
import RoomList from "@/components/Detail/RoomList.vue";
import { faMedal, faPerson, faMessage } from "@fortawesome/free-solid-svg-icons";
import NavFixed from "@/components/Pages/NavFixed.vue";
import { onBeforeUnmount, onMounted, ref, computed } from "vue";
import { useRoute } from 'vue-router';
import ProfileCard from "@/components/Profile/ProfileCard.vue";
import Gallery from "@/components/Detail/Gallery.vue";
import axios from 'axios';
import LeafletMap from "@/components/Detail/LeafletMap.vue";
import Footer from "@/components/Pages/Footer.vue";

const route = useRoute();
const productId = route.params.id;
const showProfileCard = ref(false);
const product = ref({});
const facilities = ref(""); // Initialize as an empty array
const rooms = ref([]);
const ownerId = ref(null);
const roomImages = ref([]); // Ensure this is an array

import icon1 from '@/assets/images/school.png';
import icon2 from '@/assets/images/tempatmakan.png';
import icon3 from '@/assets/images/tokokelontong.png';
import icon4 from '@/assets/images/laundry.png';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const items = ref([
  { id: 1, icon: icon1, title: 'SMK RADEN UMAR SAID KUDUS', text: '0.85 KM' },
  { id: 2, icon: icon2, title: 'Tempat Makan MakRU', text: '0.70 KM' },
  { id: 3, icon: icon3, title: 'Toko Lima', text: '1.25 KM' },
  { id: 4, icon: icon4, title: 'Laundry Reftalia', text: '0.25 KM' },
]);

const toggleProfileCard = () => {
  showProfileCard.value = !showProfileCard.value;
};

const fetchProductData = async () => {
  try {
    const response = await axios.get(`https://api.nearus.id/api/product/get/${productId}`);
    const selectedProduct = response.data;

    if (selectedProduct) {
      localStorage.setItem('produk', JSON.stringify({
        name: response.data.productname
      }));
      product.value = selectedProduct;
      facilities.value = selectedProduct.fasilitas;
      ownerId.value = selectedProduct.ownerId;
      roomImages.value = Array.isArray(selectedProduct.image) ? selectedProduct.image : [selectedProduct.image];
      await fetchRooms(selectedProduct.ownerId);
    } else {
      console.error('Error fetching product data: no data response');
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
};

const fetchRooms = async () => {
  try {
    const response = await axios.get(`https://api.nearus.id/api/rooms/${ownerId.value}`);
    if (response.status === 200 && response.data.data.length > 0) {
      rooms.value = response.data.data;
    } else {
      console.error('No rooms data available for this owner');
    }
  } catch (error) {
    console.error('Error fetching rooms data:', error);
  }
};

// Computed property to format facilities
const formattedFacilities = computed(() => {
  return facilities.value.map(facility => facility.trim());
});

onMounted(async () => {
  await fetchProductData();
  window.addEventListener('toggle-profile-card', toggleProfileCard);

  const disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = productId;
  };

  const script = document.createElement('script');
  script.src = 'https://nearus.disqus.com/embed.js';
  script.setAttribute('data-timestamp', +new Date());
  (document.head || document.body).appendChild(script);
});

onBeforeUnmount(() => {
  window.removeEventListener('toggle-profile-card', toggleProfileCard);
});

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
</script>

<style>
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}

.empty-message {
  color: #666;
  font-style: italic;
}
</style>


