<template>
  <div class="flex">
    <!-- Sidebar -->
    <sidebar class="fixed top-0 left-0 h-full w-[350px] border-r-[1px] text-white shadow-lg flex flex-col justify-between bg-white z-50"/>

    <!-- Main Content Area -->
    <div class="ml-[350px] w-[calc(100%-350px)] p-4">
      <!-- Pesanan Kamar Section -->
      <div class="pesanan-kamar-section">
        <div class="flex justify-between items-center mb-4 mt-4">
          <h2 class="text-2xl font-semibold">Pesanan Kamar</h2>
          <div class="flex space-x-2">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="border px-2 py-1 rounded-md"
            />
            <select v-model="sortOption" class="border px-2 py-1 rounded-md">
              <option value="">Sort by</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="duration">Duration</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
        <div class="space-y-4">
          <div
              v-for="order in filteredAndSortedOrders"
              :key="order.id"
              class="border p-4 rounded-md"
          >
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold">{{ order.name }}</h3>
                <h3 class="text-lg font-semibold">{{ order.phonenumber }}</h3>
                <p>Kamar: {{ order.detail }}</p>
                <p>{{ order.location }}</p>
              </div>
              <div class="text-right">
                <p :class="statusClass(order.status)">
                  {{ order.status.toUpperCase() }}
                </p>
                <p>{{ formatPrice(order.price) }}</p>
                <p>Berlaku Hingga: {{ order.duration }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Add other sections or components below if necessary -->
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const orders = ref([]);
const searchQuery = ref("");
const sortOption = ref("");

const fetchData = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("https://api.nearus.id/api/orders/paid", {
      headers: { Authorization: `Bearer ${token}` },
    });
    orders.value = response.data.orders;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

const statusClass = (status) => {
  switch (status) {
    case "Paid":
      return "text-green-500";
    case "pending":
      return "text-yellow-500";
    default:
      return "text-red-500";
  }
};

const formatPrice = (price) => {
  if (price !== null) {
    return `Rp. ${Number(price).toLocaleString()}`;
  }
  return "N/A";
};

const filteredAndSortedOrders = computed(() => {
  let filtered = orders.value.filter(
      (order) =>
          order.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          order.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          order.detail.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          order.status.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  switch (sortOption.value) {
    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "price":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "duration":
      filtered.sort((a, b) => new Date(a.duration) - new Date(b.duration));
      break;
    case "status":
      filtered.sort((a, b) => a.status.localeCompare(b.status));
      break;
  }

  return filtered;
});

onMounted(fetchData);
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
