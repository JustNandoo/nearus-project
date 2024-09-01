<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-grow mb-60">
      <NavSearch :defaultValues="searchParams" @search="handleSearch" />
    </div>

    <div class="search-info ml-4 sm:ml-8 flex flex-wrap justify-between items-center px-4 sm:px-0">
      <h2 class="text-lg sm:text-3xl font-semibold flex-grow mb-4 sm:mb-0">
        Menunjukkan Hasil Pencarian
        <span v-if="searchParams.name">dari "{{ searchParams.name }}"</span>
        <span v-if="searchParams.name && displayCategory"></span>
        <span v-if="displayCategory"> Kategori "{{ displayCategory }}"</span>
      </h2>

      <div class="flex flex-wrap items-center gap-4">
        <button
            @click="resetSearch"
            class="bg-blue-primary text-white font-medium px-3 py-2 rounded hover:bg-blue-600"
        >
          Reset Search
        </button>
        <select
            v-model="sortOption"
            @change="sortProducts"
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300"
        >
          <option value="name-asc">Nama (A-Z)</option>
          <option value="name-desc">Nama (Z-A)</option>
          <option value="price-asc">Harga (Murah ke Mahal)</option>
          <option value="price-desc">Harga (Mahal ke Murah)</option>
        </select>
      </div>
    </div>

    <div v-if="filteredProducts.length" class="product-grid mt-4 flex-grow">
      <ProductCard
          class="mx-auto"
          v-for="product in sortedPaginatedProducts"
          :key="product.id"
          :product="product"
          :isLoading="isLoading"
      />
    </div>
    <div v-else class="text-center mt-10 flex-grow">
      <p>No results found</p>
    </div>

    <div class="mt-16">
      <div class="pagination mt-4 flex justify-center">
        <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="bg-blue-primary text-white font-medium px-4 py-2 rounded hover:bg-blue-600"
        >
          Sebelumnya
        </button>
        <span class="mx-4 font-medium text-lg sm:text-[20px] mt-1">
          Halaman {{ currentPage }} Dari {{ totalPages }}
        </span>
        <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="bg-blue-primary text-white font-medium px-4 py-2 rounded hover:bg-blue-600"
        >
          Selanjutnya
        </button>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from "@/components/Home/ProductCard.vue";
import axios from 'axios';
import NavSearch from "@/components/Home/NavSearch.vue";
import FooterComponent from "@/components/Pages/Footer.vue";

const route = useRoute();
const router = useRouter();

const searchParams = ref({
  name: '',
  category: ''
});

const products = ref([]);
const isLoading = ref(true);
const isSorting = ref(false); // New state for sorting
const sortOption = ref('name-asc');
const currentPage = ref(1);
const itemsPerPage = 8;

// Computed property for displaying the category
const displayCategory = computed(() => {
  return searchParams.value.category ? searchParams.value.category : 'Semua Tipe';
});

onMounted(() => {
  const { name, category } = route.query;
  searchParams.value.name = name || '';
  searchParams.value.category = category || '';
  fetchProducts();
});

// Watch for changes in the route query and fetch products accordingly
watch(() => route.query, () => {
  const { name, category } = route.query;
  searchParams.value.name = name || '';
  searchParams.value.category = category || '';
  fetchProducts();
});

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`https://api.nearus.id/api/product`);
    products.value = response.data.data;
    // Reset pagination after fetching new products
    currentPage.value = 1;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// Filter the products based on the search query
const filteredProducts = computed(() => {
  if (!Array.isArray(products.value)) {
    return [];
  }

  let result = products.value.filter(product => {
    const matchesName = product.productname?.toLowerCase().includes(searchParams.value.name.toLowerCase());
    const matchesCategory = searchParams.value.category === '' || product.category?.toLowerCase() === searchParams.value.category.toLowerCase();

    return matchesName && matchesCategory;
  });

  return result;
});

// Paginate the filtered products
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

// Sort only the products currently visible on the page
const sortedPaginatedProducts = computed(() => {
  const productsOnPage = paginatedProducts.value;

  switch (sortOption.value) {
    case 'name-asc':
      return productsOnPage.sort((a, b) => a.productname.localeCompare(b.productname));
    case 'name-desc':
      return productsOnPage.sort((a, b) => b.productname.localeCompare(a.productname));
    case 'price-asc':
      return productsOnPage.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return productsOnPage.sort((a, b) => b.price - a.price);
    default:
      return productsOnPage;
  }
});

// Reset search parameters and fetch all products
const resetSearch = () => {
  searchParams.value.name = '';
  searchParams.value.category = '';
  sortOption.value = 'name-asc'; // Reset sort option to default
  currentPage.value = 1; // Reset pagination to the first page
  router.push({ query: {} });
  fetchProducts();
};

// Handle search input
const handleSearch = (newSearchParams) => {
  searchParams.value = { ...newSearchParams };
  fetchProducts();
};

// Handle sort option change with loading animation
const sortProducts = async () => {
  isSorting.value = true;

  // Simulate loading time
  await new Promise(resolve => setTimeout(resolve, 500)); // Adjust delay as needed

  // Trigger reactivity in sortedPaginatedProducts to reapply sorting
  sortedPaginatedProducts.value;

  isSorting.value = false;
};

// Pagination controls
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    scrollToTop();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    scrollToTop();
  }
};

// Scroll to the top of the page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scrolling
  });
};
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Adjusted for responsiveness */
  gap: 20px;
  padding: 20px;
}

.search-info {
  margin-top: 20px;
  width: calc(100% - 2rem); /* Adjusting for the ml-8 */
}

.pagination {
  margin-top: 20px;
}

.min-h-screen {
  min-height: 100vh;
}

.flex-grow {
  flex-grow: 1;
}

button {
  transition: background-color 0.3s;
}

select {
  transition: border-color 0.3s;
}
</style>
