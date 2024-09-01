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
          <h1 class="font-bold text-[24px]">Rp.{{ product.price }} / {{ product.duration }}</h1>
        </div>
        <div class="flex gap-2 items-center w-full justify-between">
          <button class="rounded-lg border-black border-2 w-20 h-12 flex items-center justify-center">
            <font-awesome-icon class="text-light-black w-6 h-6" :icon="faMessage" />
          </button>
          <button @click="scrollToRoomList" class="bg-blue-primary w-full h-12 rounded-lg shadow-lg flex items-center justify-center">
            <a class="no-underline text-white font-medium" href="#">Lihat Kamar</a>
          </button>
        </div>
      </div>
    </div>

    <hr class="my-10 ml-32 mr-32 border-t-4 border-neutral-300 mb-10">

    <div class="mt-10 mr-32 ml-32 mb-20">
      <div>
        <h1 class="font-bold text-[28px] mb-4">Fasilitas Bersama</h1>
        <div v-if="facilities.length" class="grid grid-cols-4 gap-4">
          <div v-for="(facility, index) in formattedFacilities" :key="index">
            <p class="text-black text-lg font-montserrat">• {{ facility }}</p>
          </div>
        </div>
        <p v-else class="text-gray-500 bg-gray-100 p-4 rounded-lg shadow-md">Belum ada data fasilitas</p>
      </div>

      <hr class="my-10 border-t-4 border-neutral-300 mb-10 w-full">

      <div>
        <h1 class="font-bold text-[28px] mb-4">Lokasi dan Jarak</h1>
        <div class="flex gap-8 justify-between">
          <div v-if="product.lat && product.lng">
            <!-- Pass places array with custom icons to LeafletMap component -->
            <LeafletMap :lat="product.lat" :lng="product.lng" :address="product.location" :places="placesWithIcons" />
          </div>
          <div class="w-1/2 container mx-auto py-8">
            <div v-for="place in placesWithIcons" :key="place.name" class="flex items-center justify-between py-5">
              <div class="flex items-center gap-5">
                <div class="flex-1">
                  <h2 class="text-[18px] text-black">{{ place.name }}</h2>
                </div>
              </div>
              <div class="flex-shrink-0 py-2">
                <p class="text-[18px] text-black">{{ calculateDistance(product.lat, product.lng, place.lat, place.lng) }} KM </p>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-10 border-t-4 border-neutral-300 mb-10 w-full">

        <div>
          <h1 class="font-bold text-[28px] mb-10">Kamar</h1>
          <div ref="roomListSection">
            <RoomList :ownerId="productId" />
          </div>

          <hr class="my-10 border-t-4 border-neutral-300 mb-10 w-full">
        </div>
      </div>
    </div>

    <div class="mx-32 my-10">
      <div id="disqus_thread"></div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import RoomList from "@/components/Detail/RoomList.vue";
import { faMedal, faPerson, faMessage } from "@fortawesome/free-solid-svg-icons";
import NavFixed from "@/components/Pages/NavFixed.vue";
import { onBeforeUnmount, onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import ProfileCard from "@/components/Profile/ProfileCard.vue";
import Gallery from "@/components/Detail/Gallery.vue";
import axios from "axios";
import LeafletMap from "@/components/Detail/LeafletMap.vue";
import Footer from "@/components/Pages/Footer.vue";
import L from "leaflet";


// Import icon images
import education from "@/assets/icons/education.png";
import mosque from "@/assets/icons/mosque.png";
import restaurant from "@/assets/icons/restaurant.png";
import shop from "@/assets/icons/shop.png";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

// Define custom icons for Leaflet
const schoolIcon = L.icon({
  iconUrl: education,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const shopIcon = L.icon({
  iconUrl: shop,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const mosqueIcon = L.icon({
  iconUrl: mosque,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const foodIcon = L.icon({
  iconUrl: restaurant,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Function to assign icons based on place names
const getIconForPlace = (placeName) => {
  switch (placeName) {
    case "SMK Raden Umar Said":
      return schoolIcon;
    case "Indomaret Besito 2":
      return shopIcon;
    case "Masjid Hidayatul Abidin":
      return mosqueIcon;
    case "Warmindo Anggrek Muria":
      return foodIcon;
    default:
      return schoolIcon; // Default icon
  }
};

// Route and product data references
const route = useRoute();
const productId = route.params.id;
const showProfileCard = ref(false);
const product = ref({});
const facilities = ref("");
const rooms = ref([]);
const ownerId = ref(null);
const roomImages = ref([]);

const places = ref([
  { name: "SMK Raden Umar Said", lat: -6.753778505127288, lng: 110.84282136045294 },
  { name: "Indomaret Besito 2", lat: -6.752888056320824, lng: 110.84273815739694 },
  { name: "Masjid Hidayatul Abidin", lat: -6.7528294570832665, lng: 110.84177524435272 },
  { name: "Warmindo Anggrek Muria", lat: -6.7525253658953845 , lng: 110.84283996650778 },
]);

const placesWithIcons = computed(() => {
  return places.value.map(place => ({
    ...place,
    icon: getIconForPlace(place.name)
  }));
});

const roomListSection = ref(null);

const toggleProfileCard = () => {
  showProfileCard.value = !showProfileCard.value;
};

const fetchProductData = async () => {
  try {
    const response = await axios.get(`https://api.nearus.id/api/product/get/${productId}`);
    const selectedProduct = response.data;

    if (selectedProduct) {
      localStorage.setItem(
          "produk",
          JSON.stringify({
            name: response.data.productname,
            location: response.data.location,
          })
      );
      product.value = selectedProduct;
      const [lat, lng] = selectedProduct.linklocation.split(",").map(coord => parseFloat(coord.trim()));
      product.value.lat = lat;
      product.value.lng = lng;

      roomImages.value = selectedProduct.image
          ? selectedProduct.image.split(",").filter(img => img)
          : [];

      facilities.value = selectedProduct.fasilitas;
      ownerId.value = selectedProduct.ownerId;
      await fetchRooms();
    } else {
      console.error("Error fetching product data: no data response");
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

const fetchRooms = async () => {
  try {
    const response = await axios.get(`https://api.nearus.id/api/rooms/get/kost/${productId}`);
    if (response.status === 200 && response.data.data.length > 0) {
      rooms.value = response.data.data;
    } else {
      console.error("No rooms data available for this owner");
    }
  } catch (error) {
    console.error("Error fetching rooms data:", error);
  }
};

// Computed property to format facilities
const formattedFacilities = computed(() => {
  return facilities.value.split(",").map(facility => facility.trim());
});

// Calculate distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance.toFixed(2); // Return distance with two decimals
}

const scrollToRoomList = () => {
  if (roomListSection.value) {
    roomListSection.value.scrollIntoView({ behavior: "smooth" });
  }
};

onMounted(async () => {
  await fetchProductData();
  window.addEventListener("toggle-profile-card", toggleProfileCard);

  const disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = productId;
  };

  const script = document.createElement("script");
  script.src = "https://nearus.disqus.com/embed.js";
  script.setAttribute("data-timestamp", +new Date());
  (document.head || document.body).appendChild(script);
});

onBeforeUnmount(() => {
  window.removeEventListener("toggle-profile-card", toggleProfileCard);
});
</script>


<style>
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

.empty-message {
  color: #666;
  font-style: italic;
}

/* Add styles for distance list */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}
</style>
