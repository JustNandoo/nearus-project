<template>
  <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-80">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Transaksi Dibatalkan</h2>
      <p class="text-gray-600 mb-6">
        Pembayaran tidak diselesaikan karena pembayaran telah dibatalkan.
      </p>
      <div class="flex justify-end">
        <button
            @click="close"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);

const open = () => {
  show.value = true;
};

const close = () => {
  show.value = false;
};

defineExpose({
  open,
});
</script>

<style scoped>
/* Custom styles for the alert */
</style>
