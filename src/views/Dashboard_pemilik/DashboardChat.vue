<template>
  <div class="flex w-screen justify-between">
    <Sidebar />
    <div class="ml-[350px] chat-section w-full">
      <ChatAuth v-if="!user" @onAuth="handleAuth" />
      <ChatComponent
          v-else
          v-bind:username="user.username"
          v-bind:secret="user.secret"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
import ChatAuth from "@/components/Chat/AuthPage/ChatAuth.vue";
import ChatComponent from "@/components/Chat/ChatsPage/ChatComponent.vue";

// Reactive reference for user data
const user = ref(undefined);

// Method to handle authentication and update the user data
const handleAuth = (authUser) => {
  user.value = authUser;
  // Save the user data in localStorage
  localStorage.setItem('user', JSON.stringify(authUser));
};

// Check if the user is already logged in when the component is mounted
onMounted(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    user.value = JSON.parse(savedUser);
  }
});
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
</style>
