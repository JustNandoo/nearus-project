<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <button
          type="button"
          class="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2"
          @click="cancel"
      >
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
      <div class="text-center">
        <div class="text-lg font-semibold mb-4 text-blue-600">{{ title }}</div>
        <div class="mb-4 text-gray-700">{{ message }}</div>
        <div class="flex justify-center gap-4">
          <button
              @click="confirm"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Confirm
          </button>
          <button
              @click="cancel"
              class="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Confirm'

  },
  message: {
    type: String,
    default: 'Are you sure you want to close the payment popup? All unsaved changes will be lost.'
  },
  visible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => {
  emit('confirm');
  router.push('/detail');
};

const cancel = () => {
  emit('cancel');
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
