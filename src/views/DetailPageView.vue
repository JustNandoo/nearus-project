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
      <p class="empty-message">Belum ada data fasilitas</p>
      <hr class="my-10 border-t-4 border-neutral-300 mb-10 w-full">
      <div>
        <h1 class="font-bold text-[28px]">Lokasi</h1>
        <div class="flex gap-8 justify-between">
          <div class="w-1/2 mt-12">
            <LeafletMap />
          </div>
          <div class="w-1/2 container mx-auto py-8 -mt-12">
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
          <p class="empty-message">Belum ada data kamar</p>
          <hr class="my-10 border-t-4 border-neutral-300 mb-10 w-full">
        </div>
      </div>
    </div>
    <div id="disqus_thread"></div>
    <Footer />
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
    icon: icon1,
    title: 'SMK RADEN UMAR SAID KUDUS',
    text: '0.85 KM',
  },
  {
    id: 2,
    icon: icon2,
    title: 'Tempat Makan MakRU',
    text: '0.70 KM',
  },
  {
    id: 3,
    icon: icon3,
    title: 'Toko Lima',
    text: '1.25 KM',
  },
  {
    id: 4,
    icon: icon4,
    title: 'Laundry Reftalia',
    text: '0.25 KM',
  },
]);

console.log('Icon 1:', icon1);
console.log('Icon 2:', icon2);
console.log('Icon 3:', icon3);
console.log('Icon 4:', icon4);
console.log('Items:', items.value);

(function() { 
    var d = document, s = d.createElement('script');
    s.src = 'https://nearus.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();

onMounted(async () => {
  try {
    const response = await axios.get('https://nearus.id/api/product');
    console.log('API Response:', response);
    const data = response.data.data;

    if (data && data.length > 0) {
      product.value = {
        productname: data[10].productname,
        location: data[10].location,
        category: data[10].category,
        price: data[10].price
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap');

.container {
  margin-left: 9rem; /* Adjust as needed */
  padding-top: 8rem; /* Adjust as needed */
}
.error {
  color: red;
}
.gallery {
  width: 100%;
}
img {
  object-fit: cover;
  border-radius: 0.75rem; /* Adjust as needed */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adjust as needed */
}
.empty-message {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  text-align: center;
  margin: 20px 0;
}

/* Custom styles for Disqus comments */
#disqus_thread {
  max-width: 800px; /* Adjust maximum width as needed */
  margin: 0 auto; /* Center the comments */
}
</style>
