<template>
   <div class="flex flex-col">
     <Nav/>
     <div class="mt-20 h-[10px]">
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
import ChatAuth from "@/components/Chat/AuthPage/ChatAuth.vue";
import ChatComponent from "@/components/Chat/ChatsPage/ChatComponent.vue";
import Nav from "@/components/Pages/Nav.vue";
const user = ref(undefined);

const handleAuth = (authUser) => {
  user.value = authUser;
  localStorage.setItem('user', JSON.stringify(authUser));
};

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
