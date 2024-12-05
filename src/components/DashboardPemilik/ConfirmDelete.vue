<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-black opacity-50 absolute inset-0"></div>
    <div class="bg-white rounded-lg p-8 z-10 max-w-sm w-full">
      <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
      <p class="mb-6">{{ message }}</p>
      <div class="flex justify-end">
        <button @click="$emit('cancel')" class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">Cancel</button>
        <button @click="$emit('confirm')" class="bg-red-500 text-white px-4 py-2 rounded">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  title: String,
  message: String
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
/* Add any necessary styles here */
</style>
