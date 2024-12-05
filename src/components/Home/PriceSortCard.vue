<template>
  <div class="category-filter p-4">
    <h2 class="font-extrabold text-2xl mb-4">Kos Terbaik Sesuai Kategori</h2>
    <div class="flex space-x-4 mb-6">
      <div
          v-for="(option, index) in options"
          :key="index"
          :class="[
          'flex-1 py-2 text-center cursor-pointer rounded-lg',
          selectedOption === option ? 'bg-blue-primary text-white' : 'bg-white border border-gray-300',
          index !== options.length - 1 ? 'border-r' : ''
        ]"
          @click="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border border-blue-primary"></div>
    </div>
    <div v-else-if="filteredProducts.length === 0" class="text-center text-gray-500 mt-10">
      <p>No data available</p>
    </div>
    <div v-else>
      <div class="grid grid-cols-4 gap-4 mt-10">
        <ProductCard
            v-for="product in displayedProducts"
            :key="product.id"
            :product="product"
            :isLoading="false"
        />
      </div>
      <div v-if="filteredProducts.length > displayedProducts.length" class="flex justify-center mt-10 mb-20">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import ProductCard from '@/components/Home/ProductCard.vue';

const props = defineProps({
  allProducts: Array,
  isLoading: Boolean
});

const options = ['Pria', 'Wanita', 'Campuran'];
const selectedOption = ref(options[0]);
const filteredProducts = ref([]);
const displayedProducts = ref([]);
const isLoadingMore = ref(false);
const productsPerPage = 4;

function selectOption(option) {
  selectedOption.value = option;
  filterProducts(option);
}

watch(() => props.allProducts, (newProducts) => {
  if (!props.isLoading) {
    filterProducts(selectedOption.value);
  }
}, { immediate: true });

watch(selectedOption, (newOption) => {
  if (!props.isLoading) {
    filterProducts(newOption);
  }
});

function filterProducts(option) {
  if (props.isLoading) {
    filteredProducts.value = [];
    displayedProducts.value = [];
    return;
  }

  switch (option) {
    case 'Pria':
      filteredProducts.value = props.allProducts.filter(product => product.category === 'Pria');
      break;
    case 'Wanita':
      filteredProducts.value = props.allProducts.filter(product => product.category === 'Wanita');
      break;
    case 'Campuran':
      filteredProducts.value = props.allProducts.filter(product => product.category === 'Campuran');
      break;
    default:
      filteredProducts.value = props.allProducts;
  }

  displayedProducts.value = filteredProducts.value.slice(0, productsPerPage);
}

function loadMoreProducts() {
  if (isLoadingMore.value) return;
  isLoadingMore.value = true;

  setTimeout(() => {
    const currentLength = displayedProducts.value.length;
    const nextProducts = filteredProducts.value.slice(currentLength, currentLength + productsPerPage);
    displayedProducts.value = [...displayedProducts.value, ...nextProducts];
    isLoadingMore.value = false;
  }, 1000);
}
</script>

<style scoped>
.category-filter {
  padding: 1rem;
}

.bg-blue-primary {
  background-color: #007bff;
}

.spinner-border {
  border: 0.2em solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 0.2em solid #007bff;
  width: 3em;
  height: 3em;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
