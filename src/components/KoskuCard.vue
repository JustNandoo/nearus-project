<template>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEllipsisV, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const products = ref([]);
const isLoading = ref(true);
const showMenu = ref(null);

const fetchProducts = async () => {
  try {
    const response = await axios.get('https://api.nearus.id/api/product');
    products.value = response.data.data;
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching product data:', error);
    isLoading.value = false;
  }
};

const toggleMenu = (productId) => {
  showMenu.value = showMenu.value === productId ? null : productId;
};

const openEditModal = (product) => {
  // Your logic to open the edit modal
  console.log("Open edit modal for product:", product);
};

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`https://api.nearus.id/api/product/delete/${productId}`);
    products.value = products.value.filter(product => product.id !== productId);
    console.log("Product deleted:", response.data);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://api.nearus.id/api/product', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    products.value = response.data.data;
    isLoading.value = false;
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
});

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

button a {
  text-decoration: none;
}

button:hover {
  background-color: #006bb3;
}

.vertical-hr {
  width: 1px;
  background-color: #8692A6;
}

img {
  object-fit: cover;
  height: 100%;
  border-radius: 0.5rem;
}
</style>
