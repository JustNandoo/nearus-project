<template>
  <div class="flex w-screen">
    <div>
    <sidebar/>
    </div>
    <div class="chat-section">
      <ChatComponent/>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/sidebar.vue";
import ChatComponent from "@/components/ChatComponent.vue";
</script>

<style scoped>
/* Add any additional styling if needed */
.chat-section {
  padding: 10px;
  background: #f8f8f8;
}
</style>
