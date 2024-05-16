<template>
  <div class="flex items-center mt-4 pl-8 p-4 bg-white rounded-[50px] shadow-lg w-[1350px]">
    <div class="flex items-center space-x-8">
      <div v-for="(input, index) in inputs" :key="index" class="flex items-center space-x-2 text-[18px]">
          <span v-if="input.icon" :class="input.icon"></span>
          <span>{{ input.label }}</span>
        <div class="flex items-center px-3 py-2  rounded-md bg-white mr-20">
          <input
              :id="input.id"
              type="text"
              v-model="input.value"
              class="bg-transparent focus:outline-none"
              :placeholder="input.placeholder"
          />
        </div>
      </div>
    </div>
    <button @click="handleSearch" class="ml-auto px-6 py-1 h-[52px] bg-blue-primary text-white rounded-[40px] font-bold">
      <i class="fa-solid fa-magnifying-glass mr-2"></i>
      Cari Kost-Kostan
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputs: [
        { id: 'input1', icon: 'fa-solid fa-location-dot', placeholder: 'Cari nama kost-kostan / daerah', value: '' },
        { id: 'input2', icon: 'fa-regular fa-clock', placeholder: 'Masa Sewa', value: '' },
        { id: 'input3', icon: 'fa-solid fa-venus-mars', placeholder: 'Semua Tipe', value: '' },
      ],
    };
  },
  methods: {
    handleSearch() {
      console.log(this.inputs.map(input => input.value));
    },
  },
};
</script>

<style>
/* Add any additional styling if needed */
</style>
