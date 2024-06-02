<template>
  <div class="flex mt-10 mb-10">
    <div class="flex w-[500px] border border-gray-300 rounded-lg">
      <div
          v-for="(option, index) in options"
          :key="index"
          :class="[
          'flex-1 py-2 text-center cursor-pointer',
          selectedOption === option ? 'bg-blue-primary text-white' : 'bg-white border-gray-300',
          index !== options.length - 1 ? 'border-r' : ''
        ]"
          @click="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const options = ['< 1 juta', '1 juta - < 2 juta', '2 juta'];
const selectedOption = ref(options[0]);

function selectOption(option) {
  selectedOption.value = option;
}
</script>

<style scoped>
</style>
