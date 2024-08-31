<template>
  <div class="flex justify-between items-center">
    <div class="flex flex-col my-10">
      <LMap :zoom="zoom" :center="center" class="w-[980px] h-[50px] rounded-lg shadow-lg" :style="{ height: '240px', width: '980px' }">
        <LTileLayer :url="tileLayerUrl" :attribution="attribution" />
        <LMarker :lat-lng="markerPosition">
          <LPopup>A pretty CSS popup.<br> Easily customizable.</LPopup>
        </LMarker>
      </LMap>
      <div class="bg-[#A7E0FF] rounded-lg shadow-lg z-50 px-2 py-4 w-full">
        <h1 class="ml-2">{{ address }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
});

const zoom = ref(20);
const center = ref([props.lat, props.lng]);
const markerPosition = ref([props.lat, props.lng]);
const tileLayerUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";

watch([() => props.lat, () => props.lng], ([newLat, newLng]) => {
  center.value = [newLat, newLng];
  markerPosition.value = [newLat, newLng];
});
</script>
