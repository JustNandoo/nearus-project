<template>
  <div class="flex flex-col sm:flex-row items-center mt-4 sm:pl-8 p-4 bg-white rounded-[50px] shadow-lg w-full sm:w-[1250px]">
    <div class="flex flex-wrap sm:flex-nowrap items-center space-x-4 sm:space-x-8">
      <!-- Search Inputs -->
      <div v-for="(input, index) in inputs" :key="index" class="flex items-center space-x-2 flex-1 max-w-[300px] text-[18px] mb-4 sm:mb-0">
        <span v-if="input.icon" :class="input.icon"></span>
        <span>{{ input.label }}</span>
        <div v-if="input.type === 'text'" class="flex items-center px-3 py-2 rounded-md bg-white flex-1">
          <input
              :id="input.id"
              type="text"
              v-model="input.value"
              class="bg-transparent focus:outline-none w-full"
              :placeholder="input.placeholder"
          />
        </div>
        <div v-else-if="input.type === 'select'" class="relative flex items-center px-3 py-2 rounded-md bg-white flex-1">
          <select
              :id="input.id"
              v-model="input.value"
              class="bg-transparent focus:outline-none appearance-none w-full text-gray-700"
          >
            <option disabled value="" selected hidden>{{ input.placeholder }}</option>
            <option v-for="option in input.options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <i class="fa-solid fa-chevron-down text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2"></i>
        </div>
      </div>
      <div class="flex items-center space-x-2 text-[18px] mb-4 sm:mb-0 relative flex-1 max-w-[300px]">
        <span class="fa-solid fa-cogs"></span>
        <button @click="toggleFacilitiesModal" class="ml-2 flex items-center">
          <span class="truncate">{{ formattedFacilitiesText }}</span>
          <i class="fa-solid fa-chevron-down ml-2"></i>
        </button>
        <div v-if="showFacilitiesModal" class="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-2 p-4 w-64 max-h-[200px] overflow-y-auto">
          <div v-for="facility in allFacilities" :key="facility" class="flex items-center mb-2">
            <input
                type="checkbox"
                :value="facility"
                v-model="selectedFacilities"
                class="mr-2"
            />
            <span>{{ facility }}</span>
          </div>
          <div class="flex justify-between mt-2">
            <button @click="clearFacilities" class="px-4 py-2 bg-red-500 text-white rounded-md">Clear</button>
            <button @click="applyFacilitiesFilter" class="px-4 py-2 bg-blue-500 text-white rounded-md">Apply</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Search Button -->
    <button @click="handleSearch" class="sm:w-auto mt-4 sm:mt-0 sm:ml-auto px-6 py-2 h-[52px] bg-blue-primary text-white rounded-[40px] font-bold">
      <i class="fa-solid fa-magnifying-glass mr-2"></i>
      Cari Kost-Kostan
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const inputs = ref([
  { id: 'input1', type: 'text', icon: 'fa-solid fa-house', placeholder: 'Cari nama kost-kostan', value: '' },
  { id: 'input2', type: 'text', icon: 'fa-solid fa-map-marker-alt', placeholder: 'Cari nama daerah', value: '' },
  {
    id: 'input3',
    type: 'select',
    icon: 'fa-solid fa-venus-mars',
    placeholder: 'Semua Tipe',
    value: '',
    options: ['Pria', 'Wanita', 'Campuran'],
  },
]);

const showFacilitiesModal = ref(false);
const selectedFacilities = ref([]);
const allFacilities = ref(['Kipas', 'AC', 'Kamar mandi dalam', 'Kamar mandi luar', 'Meja', 'Dapur bersama', 'Dipan Kasur', 'Kursi', 'Dispenser', 'Parkiran Motor', 'Parkiran Mobil', 'Laundry', 'Catering']); // Replace with actual facilities

const toggleFacilitiesModal = () => {
  showFacilitiesModal.value = !showFacilitiesModal.value;
};

const applyFacilitiesFilter = () => {
  updateFacilitiesText();
  toggleFacilitiesModal(); // Close the modal
};

const clearFacilities = () => {
  selectedFacilities.value = [];
  updateFacilitiesText();
};

const updateFacilitiesText = () => {
  // Keep the full list of selected facilities but only show the top 2
  selectedFacilitiesText.value = selectedFacilities.value.length
      ? selectedFacilities.value.slice(0, 2).join(', ') + (selectedFacilities.value.length > 2 ? ' + ' + (selectedFacilities.value.length - 2) + ' more' : '')
      : 'Pilih Fasilitas';
};

const selectedFacilitiesText = computed(() => {
  return selectedFacilities.value.length ? selectedFacilities.value.slice(0, 2).join(', ') + (selectedFacilities.value.length > 2 ? ' + ' + (selectedFacilities.value.length - 2) + ' more' : '') : 'Pilih Fasilitas';
});

const formattedFacilitiesText = computed(() => {
  // Truncate the text if it is too long
  return selectedFacilitiesText.value.length > 30 ? selectedFacilitiesText.value.slice(0, 30) + '...' : selectedFacilitiesText.value;
});

const handleSearch = () => {
  const searchParams = {
    name: inputs.value[0].value,
    location: inputs.value[1].value,
    category: inputs.value[2].value,
    facilities: selectedFacilities.value,
  };

  router.push({ name: 'search-page', query: searchParams });
};
</script>
