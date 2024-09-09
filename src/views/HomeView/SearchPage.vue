<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-grow mb-60">
      <NavSearch :defaultValues="searchParams" @search="handleSearch" />
    </div>

    <div class="flex flex-wrap justify-between items-center px-4 sm:px-12 mt-5 w-full">
      <h2 class="text-lg sm:text-3xl font-semibold flex-grow mb-4 sm:mb-0">
        Menunjukkan Hasil Pencarian
        <span v-if="searchParams.name">dari "{{ searchParams.name }}"</span>
        <span v-if="displayCategory"> Kategori "{{ displayCategory }}"</span>
        <span v-if="searchParams.location"> Lokasi "{{ searchParams.location }}"</span>
        <span v-if="selectedFacilities.length"> Fasilitas "{{ selectedFacilitiesText }}"</span>
      </h2>

      <div class="flex flex-wrap items-center gap-4">
        <button
            @click="resetSearch"
            class="bg-blue-600 text-white font-medium px-3 py-2 rounded hover:bg-blue-700"
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

    <div v-if="filteredProducts.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <ProductCard
          v-for="product in sortedPaginatedProducts"
          :key="product.id"
          :product="product"
          :isLoading="isLoading"
          class="mx-auto"
      />
    </div>

    <div v-else class="text-center mt-10 flex-grow">
      <p class="font-bold text-[30px]">Tidak ada kost dengan hasil pencarian tersebut</p>
    </div>

    <div class="mt-16 flex justify-center">
      <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700"
      >
        Sebelumnya
      </button>
      <span class="mx-4 font-medium text-lg sm:text-[20px] mt-1">
        Halaman {{ currentPage }} Dari {{ totalPages }}
      </span>
      <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700"
      >
        Selanjutnya
      </button>
    </div>

    <FooterComponent />
    <ProfileCard v-if="showProfileCard" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from "@/components/Home/ProductCard.vue";
import axios from 'axios';
import NavSearch from "@/components/Home/NavSearch.vue";
import FooterComponent from "@/components/Pages/Footer.vue";
import ProfileCard from "@/components/Profile/ProfileCard.vue";

const route = useRoute();
const router = useRouter();

const searchParams = ref({
  name: '',
  location: '',
  category: ''
});

const selectedFacilities = ref([]);
const allFacilities = ref(['Kipas', 'AC', 'Kamar mandi dalam', 'Kamar mandi luar', 'Meja', 'Dapur bersama', 'Dipan Kasur', 'Kursi', 'Dispenser', 'Parkiran Motor', 'Parkiran Mobil', 'Laundry', 'Catering']); // Replace with actual facilities
const products = ref([]);
const isLoading = ref(true);
const isSorting = ref(false);
const sortOption = ref('name-asc');
const currentPage = ref(1);
const showProfileCard = ref(false);
const itemsPerPage = 8;

const displayCategory = computed(() => {
  return searchParams.value.category ? searchParams.value.category : 'Semua Tipe';
});

const toggleProfileCard = () => {
  showProfileCard.value = !showProfileCard.value;
};

onBeforeUnmount(() => {
  window.removeEventListener('toggle-profile-card', toggleProfileCard);
});

onMounted(() => {
  const { name, location, category } = route.query;
  searchParams.value.name = name || '';
  searchParams.value.location = location || '';
  searchParams.value.category = category || '';
  fetchProducts();
});

watch(() => route.query, () => {
  const { name, location, category } = route.query;
  searchParams.value.name = name || '';
  searchParams.value.location = location || '';
  searchParams.value.category = category || '';
  fetchProducts();
});

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get('https://api.nearus.id/api/product');
    products.value = response.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const filteredProducts = computed(() => {
  if (!Array.isArray(products.value)) return [];

  return products.value.filter(product => {
    const matchesName = product.productname?.toLowerCase().includes(searchParams.value.name.toLowerCase());
    const matchesLocation = product.location?.toLowerCase().includes(searchParams.value.location.toLowerCase());
    const matchesCategory = searchParams.value.category === '' || product.category?.toLowerCase() === searchParams.value.category.toLowerCase();
    const matchesFacilities = selectedFacilities.value.length === 0 || selectedFacilities.value.every(facility => product.fasilitas?.includes(facility));
    return matchesName && matchesLocation && matchesCategory && matchesFacilities;
  });
});

const selectedFacilitiesText = computed(() => {
  return selectedFacilities.value.length ? selectedFacilities.value.slice(0, 2).join(', ') + (selectedFacilities.value.length > 2 ? ' + ' + (selectedFacilities.value.length - 2) + ' more' : '') : 'Pilih Fasilitas';
});

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

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

const resetSearch = () => {
  searchParams.value.name = '';
  searchParams.value.category = '';
  selectedFacilities.value = [];
  sortOption.value = 'name-asc';
  currentPage.value = 1;
  router.push({ query: {} });
  fetchProducts();
};

const handleSearch = (newSearchParams) => {
  searchParams.value = { ...newSearchParams };
  fetchProducts();
};

const sortProducts = async () => {
  isSorting.value = true;
  await new Promise(resolve => setTimeout(resolve, 500));
  sortedPaginatedProducts.value;
  isSorting.value = false;
};

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

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>