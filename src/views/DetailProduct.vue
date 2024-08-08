<template>
  <div class="flex">
    <sidebar />
    <div class="flex flex-col w-full p-4">
      <div class="flex items-center gap-2 mb-4">
        <FontAwesomeIcon class="text-black cursor-pointer" :icon="faChevronLeft" @click="goBack" />
        <router-link to="/dashboard-kosku" class="text-black font-bold text-lg">Kembali</router-link>
      </div>
      <hr class="w-full bg-black h-[2px] mb-4" />
      <h1 class="text-center text-black font-bold text-2xl mb-4">Detail Kost</h1>
      <div class="bg-white shadow-lg rounded-lg p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <!-- Product Name -->
          <div class="flex flex-col">
            <label class="text-gray-600 font-semibold mb-1">Product Name</label>
            <input v-model="product.productname" type="text" class="p-2 border border-gray-300 rounded-md" />
          </div>
          <!-- Location -->
          <div class="flex flex-col">
            <label class="text-gray-600 font-semibold mb-1">Location</label>
            <input v-model="product.location" type="text" class="p-2 border border-gray-300 rounded-md" />
          </div>
          <!-- Category -->
          <div class="flex flex-col">
            <label class="text-gray-600 font-semibold mb-1">Category</label>
            <input v-model="product.category" type="text" class="p-2 border border-gray-300 rounded-md" />
          </div>
          <!-- Price -->
          <div class="flex flex-col">
            <label class="text-gray-600 font-semibold mb-1">Price</label>
            <input v-model="product.price" type="number" class="p-2 border border-gray-300 rounded-md" />
          </div>
          <!-- Duration -->
          <div class="flex flex-col">
            <label class="text-gray-600 font-semibold mb-1">Duration</label>
            <input v-model="product.duration" type="text" class="p-2 border border-gray-300 rounded-md" />
          </div>
        </div>
        <!-- Image Gallery -->
        <div class="mb-4">
          <label class="text-gray-600 font-semibold mb-1">Images</label>
          <div v-for="(image, index) in product.image" :key="index" class="mb-2 flex flex-col">
            <img :src="image" alt="Product Image" class="w-24 h-24 object-cover rounded-md mb-2" />
            <input type="file" @change="handleImageChange($event, index)" class="p-2 border border-gray-300 rounded-md" />
          </div>
        </div>
        <!-- Facilities -->
        <div class="mb-4">
          <label class="text-gray-600 font-semibold mb-1">Facilities</label>
          <div v-for="(facility, index) in product.fasilitas" :key="index" class="mb-2">
            <input v-model="product.fasilitas[index]" type="text" class="p-2 border border-gray-300 rounded-md w-full" />
          </div>
        </div>
        <!-- About -->
        <div class="mb-4">
          <label class="text-gray-600 font-semibold mb-1">About</label>
          <textarea v-model="product.about" rows="4" class="p-2 border border-gray-300 rounded-md w-full"></textarea>
        </div>
        <!-- Save Button -->
        <button @click="saveChanges" class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const product = ref({
  productname: "Reftalia Kost & Laundry",
  location: "Jl. Bae-Besito No.82, Besito Kulon, Besito, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333",
  category: "Pria",
  price: 750000,
  duration: "3 bulan",
  image: ["https://api.nearus.id/storage/post-images/677754971.jpg"],
  fasilitas: ["Ac", "Wifi", "Kamar Mandi Luar", "Free Listrik", "Laundry", "Kasur", "Meja"],
  about: "Kost Kostan murah dekat sekolah SMK Raden Umar Said, disebelah balai desa dan sebrang toko mitra, bisa bayar perbulan/tahun",
});

function goBack() {
  router.push('/dashboard-kosku');
}

function handleImageChange(event, index) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      product.value.image[index] = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function saveChanges() {
  // Implement your save logic here
  console.log('Product details saved:', product.value);
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
