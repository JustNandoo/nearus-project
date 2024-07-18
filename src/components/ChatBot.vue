<!-- src/components/Chatbot.vue -->
<template>
  <div class="chatbot-container">
    <div class="chatbot-header">
      <h2>Chatbot</h2>
      <button @click="toggleChatbot">x</button>
    </div>
    <div class="chatbot-body" v-if="showChat">
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.isUser ? 'user' : 'bot']">
          {{ message.text }}
        </div>
      </div>
      <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'Chatbot',
  setup() {
    const showChat = ref(true);
    const userMessage = ref('');
    const messages = ref([]);

    const toggleChatbot = () => {
      showChat.value = !showChat.value;
    };

    const sendMessage = async () => {
      if (userMessage.value.trim() === '') return;
      messages.value.push({ text: userMessage.value, isUser: true });
      
      try {
        const response = await axios.post('https://api.nearus.id/api/bot', { message: userMessage.value });
        messages.value.push({ text: response.data.message, isUser: false });
      } catch (error) {
        console.error('Error sending message:', error);
      }
      
      userMessage.value = '';
    };

    return {
      showChat,
      userMessage,
      messages,
      toggleChatbot,
      sendMessage
    };
  }
};
</script>

<style>
.chatbot-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 300px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.chatbot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.chatbot-body {
  padding: 1rem;
}

.messages {
  max-height: 300px;
  overflow-y: auto;
}

.message {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
}

.user {
  background-color: #007bff;
  color: #fff;
  text-align: right;
}

.bot {
  background-color: #f1f1f1;
  color: #000;
}
</style>
