<template>
  <transition
      name="fade"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
  >
    <div v-if="visible" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50" aria-live="assertive">
      <div class="relative bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <div class="text-center">
          <svg class="mx-auto mb-4 text-blue-500 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <h3 class="mb-3 text-lg font-semibold text-blue-600">{{ title }}</h3>
          <p class="mb-6 text-sm text-gray-700">{{ message }}</p>
          <button
              type="button"
              @click="$emit('confirm')"
              class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  visible: Boolean,
  title: String,
  message: String,
});

// Transition classes
const beforeEnter = (el) => {
  el.style.opacity = 0;
};

const enter = (el, done) => {
  el.offsetHeight; // Trigger reflow
  el.style.transition = 'opacity 0.3s ease';
  el.style.opacity = 1;
  done();
};

const leave = (el, done) => {
  el.style.transition = 'opacity 0.3s ease';
  el.style.opacity = 0;
  done();
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
