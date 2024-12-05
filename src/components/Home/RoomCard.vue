<template>
  <div class="bg-white rounded-lg border border-solid border-slate-300 mb-6 p-6 shadow-sm max-w-2xl">
    <div class="flex gap-4">
      <div class="flex-shrink-0 w-[200px]">
        <img :src="room.image" alt="Room Image" class="rounded-md w-[200px] h-[150px]" />
      </div>
      <div class="flex flex-col w-full">
        <div class="text-lg font-semibold text-black">{{ room.name }}</div>
        <div class="text-sm text-gray-500">{{ room.category }}</div>
        <div class="mt-2 flex gap-2 flex-wrap">
          <div v-for="facility in room.facilities" :key="facility"
               class="px-2 py-1 bg-gray-100 rounded border border-gray-300 text-xs text-gray-600">
            {{ facility }}
          </div>
        </div>
        <div class="mt-2 text-sm text-gray-700">
          <div><span class="font-semibold">Price:</span> {{ formatCurrency(room.price) }}</div>
          <div><span class="font-semibold">Time:</span> {{ room.time }}</div>
        </div>
        <div class="mt-1 text-sm text-gray-700">
          <div><span class="font-semibold">Availability:</span> {{ room.availability }}</div>
        </div>
        <div class="mt-2 text-blue-500 font-medium text-sm cursor-pointer">Lihat Detail</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
};
</script>

<style scoped>

</style>
