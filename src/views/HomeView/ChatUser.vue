<template>
  <div class=" flex flex-col">
    <Nav/>
    <div class="mt-[75px]">
      <ChatAuth v-if="!user" @onAuth="handleAuth" />
      <ChatComponent
          v-else
          v-bind:username="user.username"
          v-bind:secret="user.secret"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
import ChatAuth from "@/components/Chat/AuthPage/ChatAuth.vue";
import ChatComponent from "@/components/Chat/ChatsPage/ChatComponent.vue";
import Nav from "@/components/Pages/Nav.vue";

// Reactive reference for user data
const user = ref(undefined);

// Method to handle authentication and update the user data
const handleAuth = (authUser) => {
  user.value = authUser;
};

</script>

<style scoped>
::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
</style>
