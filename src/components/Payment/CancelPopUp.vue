<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <div class="text-lg font-semibold mb-4">{{ title }}</div>
      <div class="mb-4">{{ message }}</div>
      <div class="flex justify-end gap-4">
        <button @click="confirm" class="px-4 py-2 bg-blue-500 text-white rounded-md">Yes</button>
        <button @click="cancel" class="px-4 py-2 bg-gray-300 text-black rounded-md">No</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Confirm'
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?'
  },
  visible: {
    type: Boolean,
    default: false
  }
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
/* Add custom styles here if needed */
</style>
