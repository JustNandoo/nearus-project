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
        <h1 class="ml-2">Jl. Bae-Besito No.82, Besito Kulon, Besito, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const zoom = ref(20);
const center = ref([0, 0]);  // Default center, will be updated by API
const markerPosition = ref([0, 0]);  // Default position, will be updated by API
const tileLayerUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";

const product = ref({});

onMounted(async () => {
  try {
    const response = await axios.get('https://nearus.id/api/product');
    console.log('API Response:', response);
    const data = response.data.data;

    if (data && data.length > 0) {
      product.value = {
        linklocation: data[11].linklocation,
      };

      // Update center and marker position
      const [lat, lng] = product.value.linklocation.split(',').map(Number);
      center.value = [lat, lng];
      markerPosition.value = [lat, lng];
    } else {
      console.error('Error fetching product data: no data response');
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
});
</script>

<style scoped>
</style>
