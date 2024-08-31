<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div class="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
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
import { useRouter } from 'vue-router';

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
const router = useRouter();

const confirm = () => {
  // Redirect to the detail page (example: '/detail')
  router.push('/detail');
  emit('confirm');
};

const cancel = () => {
  emit('cancel');
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
