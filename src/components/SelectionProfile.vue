<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen bg-gray-10 -mt-60 -left-20">
    <div class="text-3xl font-bold font-montserrat mb-8">Pengaturan</div>
    <div class="w-80 h-96 flex flex-col items-center border border-black border-opacity-60 rounded-lg p-4 bg-white shadow-lg">
      <router-link to="/profile" class="link-item">Ubah Data Profil</router-link>
      <router-link to="/privatedata" class="link-item">Data Pribadi</router-link>
      <router-link to="/passworddata" class="link-item">Ubah Kata Sandi</router-link>
      <button @click="logout" class="logout-button">Log Out</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const logout = () => {
  store.dispatch('logout');
  router.push('/login');
};
</script>

<style scoped>
.link-item, .logout-button {
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: white;
  background-color: #0986cf; /* Warna biru */
  border-radius: 0.5rem;
  transition: background-color 0.3s ease;
}

.link-item:hover, .logout-button:hover {
  background-color: #1D4ED8; /* Warna biru muda */
}

.logout-button {
  margin-top: auto;
}
</style>
