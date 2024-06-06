<template>
  <div class="relative">
    <div class="left-0 top-0 absolute text-black text-[32px] font-bold font-montserrat">Pengaturan</div>
    <div class="w-[344px] h-[253px] left-0 top-[74px] absolute">
      <div class="w-full h-full left-0 top-0 absolute rounded-[10px] border border-black border-opacity-60"></div>
      <router-link to="/profile"
        class="w-full h-[63px] left-0 top-[4px] absolute rounded-tl-[20px] rounded-tr-[20px] border-b border-black border-opacity-60 flex items-center justify-center">
        Ubah Data Profil
      </router-link>
      <router-link to="/privatedata"
        class="w-full h-[63px] left-0 top-[69px] absolute rounded-tl-[20px] rounded-tr-[20px] border-b border-black border-opacity-60 flex items-center justify-center">
        Data Pribadi
      </router-link>
      <router-link to="/passworddata"
        class="w-full h-[63px] left-0 top-[134px] absolute rounded-tl-[20px] rounded-tr-[20px] border-b border-black border-opacity-60 flex items-center justify-center">
        Ubah Kata Sandi
      </router-link>
      <button @click="logout"
        class="w-full h-[55px] left-0 top-[199px] absolute rounded-bl-[15px] rounded-br-[15px] border-b border-black border-opacity-60 flex items-center justify-center  text-black text-xl font-regular  font-montserrat cursor-pointer">
        Log Out
      </button>
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
.text-xl:last-child {
  margin-bottom: 0;
}
</style>
