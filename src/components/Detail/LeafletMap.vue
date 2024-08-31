<template>
  <div class="flex justify-between items-center">
    <div class="flex flex-col my-10">
      <LMap :zoom="zoom" :center="center" class="w-[980px] h-[50px] rounded-lg shadow-lg" :style="{ height: '240px', width: '980px' }">
        <LTileLayer :url="tileLayerUrl" :attribution="attribution" />

        <!-- Penanda untuk tempat utama -->
        <LMarker :lat-lng="center">
          <LPopup>{{ address }}</LPopup>
        </LMarker>

        <!-- Penanda untuk tempat penting lainnya -->
        <LMarker v-for="(place, index) in placesWithIcons" :key="index" :lat-lng="[place.lat, place.lng]" :icon="place.icon">
          <LPopup>{{ place.name }}</LPopup>
        </LMarker>
      </LMap>
      <div class="bg-[#A7E0FF] rounded-lg shadow-lg z-50 px-2 py-4 w-full">
        <h1 class="ml-2">{{ address }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import education from "@/assets/icons/education.png";
import mosque from "@/assets/icons/mosque.png";
import restaurant from "@/assets/icons/restaurant.png";
import shop from "@/assets/icons/shop.png";

const props = defineProps({
  lat: {
    required: true,
  },
  lng: {
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  places: {
    type: Array,
    required: true,
  },
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

// Computed property to add icons to places
const placesWithIcons = computed(() => {
  return props.places.map(place => ({
    ...place,
    icon: getIconForPlace(place.name)
  }));
});

const zoom = ref(20);
const center = ref([props.lat, props.lng]);
const tileLayerUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";

// Update map center when lat/lng props change
watch([() => props.lat, () => props.lng], ([newLat, newLng]) => {
  center.value = [newLat, newLng];
});
</script>
