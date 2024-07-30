<!-- components/Modal.vue -->
<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
    <div class="bg-white text-black p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-bold mb-4">Confirm Logout</h2>
      <p class="mb-4">Are you sure you want to log out?</p>
      <div class="flex justify-end gap-4">
        <button @click="cancel" class="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
        <button @click="confirm" class="px-4 py-2 bg-red-500 text-white rounded-lg">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => {
  emit('confirm');
};

const cancel = () => {
  emit('cancel');
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
