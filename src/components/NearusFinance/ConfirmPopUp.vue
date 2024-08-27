<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div
        class="bg-white rounded-lg p-6 w-full max-w-md mx-4 md:mx-0 transition-transform transform scale-95 opacity-0 animate-popup-in"
    >
      <h2 class="text-xl font-semibold mb-4 text-gray-800">{{ title }}</h2>
      <p class="text-gray-700 mb-6">{{ message }}</p>
      <div class="flex justify-end space-x-4">
        <button
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
            @click="close"
        >
          Cancel
        </button>
        <button
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            @click="confirm"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const isOpen = ref(false);
const title = ref('');
const message = ref('');
const confirmCallback = ref(() => {
});

const open = (popupTitle, popupMessage, onConfirm) => {
  title.value = popupTitle;
  message.value = popupMessage;
  confirmCallback.value = onConfirm;
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};

const confirm = () => {
  confirmCallback.value();
  close();
};

// Expose the open method
defineExpose({open});
</script>

<style scoped>
/* Animation for popup */
@keyframes popup-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-popup-in {
  animation: popup-in 0.3s ease-out;
}

/* Tailwind classes for background color, text color, etc. */
.bg-black.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}

.bg-white {
  background-color: #ffffff;
}

.transition-transform {
  transition: transform 0.3s ease-out;
}

.transform.scale-95 {
  transform: scale(0.95);
}

.md:scale-100 {
  transform: scale(1);
}

.bg-gray-300 {
  background-color: #e0e0e0;
}

.text-gray-700 {
  color: #4a4a4a;
}

.hover\:bg-gray-400:hover {
  background-color: #b0b0b0;
}

.bg-blue-600 {
  background-color: #1d4ed8;
}

.text-white {
  color: #ffffff;
}

.hover\:bg-blue-700:hover {
  background-color: #1e40af;
}

.transition {
  transition: background-color 0.3s ease;
}
</style>
