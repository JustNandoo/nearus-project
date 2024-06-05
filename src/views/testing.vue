<template>
  <div>
    <!-- Menampilkan data pengguna jika tersedia -->
    <h1 class="text-[50px]" v-if="user.name">
      {{ user.name }}
    </h1>
    <h2 v-if="user.email">
      Email: {{ user.email }}
    </h2>
    <p v-if="user.phonenumber">
      Phone: {{ user.phonenumber }}
    </p>
    <p v-if="user.websiterole">
      Role: {{ user.websiterole }}
    </p>

    <!-- Pesan jika data pengguna belum tersedia -->
    <p v-if="loading">Loading...</p>

    <!-- Pesan jika terjadi error -->
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const user = ref({
  name: 'Data kosong',
  email: 'Data kosong',
  phonenumber: 'Data kosong',
  websiterole: 'Data kosong'
});

const loading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    const response = await axios.get('https://nearus.id/api/user');
    const data = response.data;
    const userData = data.find(user => user.ownerId === 7);
    if (userData) {
      user.value = {
        name: userData.name || 'Data kosong',
        email: userData.email || 'Data kosong',
        phonenumber: userData.phonenumber || 'Data kosong',
        websiterole: userData.websiterole || 'Data kosong'
      };
    }
    loading.value = false;
  } catch (err) {
    error.value = 'Error fetching user data';
    console.error('Error fetching user data:', err);
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
/* Tambahkan style khusus jika diperlukan */
</style>
