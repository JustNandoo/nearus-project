<template>
  <div>
    <button v-if="!showChat" @click="toggleChatbot" class="chatbot-toggle-button">
      <i class="fas fa-comments"></i>
    </button>
    <div class="chatbot-container" v-if="showChat">
      <div class="chatbot-header">
        <div class="chatbot-info">
          <div class="chatbot-avatar">
            <div class="chatbot-avatar-bg"></div>
            <div class="chatbot-status"></div>
            <div class="chatbot-icon"></div>
          </div>
          <div class="chatbot-text">
            <div class="chatbot-title">ChatBot-AI</div>
            <div class="chatbot-subtitle">AI Customer Service</div>
          </div>
        </div>
        <button @click="toggleChatbot" class="close-button">x</button>
      </div>
      <div class="chatbot-body">
        <div class="messages">
          <div v-for="(message, index) in messages" :key="index" :class="['message', message.isUser ? 'user' : 'bot']">
            {{ message.text }}
          </div>
        </div>
        <div class="predefined-questions">
          <button v-for="(question, index) in questions" :key="index" @click="sendMessage(question)">
            {{ question }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'Chatbot',
  setup() {
    const showChat = ref(false);
    const messages = ref([]);
    const questions = ref([
      'apa itu website nearus',
      'bagaimana cara melakukan pemesanan kos di nearus',
      'bagaimana sistem refund di nearus',
      'tentang nearus finance',
      'hubungi admin'
    ]);

    const toggleChatbot = () => {
      showChat.value = !showChat.value;
    };

    const sendMessage = async (message) => {
      messages.value.push({ text: message, isUser: true });
      
      try {
        const response = await axios.post('https://api.nearus.id/api/bot', { message });
        messages.value.push({ text: response.data.message, isUser: false });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };

    return {
      showChat,
      messages,
      questions,
      toggleChatbot,
      sendMessage
    };
  }
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.chatbot-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 511px;
  height: 678px;
  background-color: #fff;
  border-radius: 17px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border: 1px solid #e3e3e3;
}

.chatbot-header {
  width: 100%;
  height: 110px;
  background-color: #4629f2;
  border-bottom: 1px solid #e3e3e3;
  border-top-left-radius: 17px;
  border-top-right-radius: 17px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.chatbot-info {
  display: flex;
  align-items: center;
}

.chatbot-avatar {
  position: relative;
  width: 49.09px;
  height: 47.04px;
  margin-right: 1rem;
}

.chatbot-avatar-bg {
  width: 49.09px;
  height: 47.04px;
  background-color: #4629f2;
  border: 1px solid #e3e3e3;
  border-radius: 50%;
}

.chatbot-status {
  position: absolute;
  width: 10.67px;
  height: 10.23px;
  background-color: #00ca57;
  border-radius: 50%;
  right: 0;
  bottom: 0;
}

.chatbot-icon {
  position: absolute;
  left: 13px;
  top: 11.76px;
  width: 24px;
  height: 24px;
  background: url('/path-to-your-icon.png') no-repeat center center;
  background-size: contain;
}

.chatbot-text {
  display: flex;
  flex-direction: column;
}

.chatbot-title {
  color: white;
  font-size: 1.25rem;
  font-family: 'Montserrat', sans-serif;
  line-height: 30px;
}

.chatbot-subtitle {
  color: white;
  opacity: 0.8;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  line-height: 30px;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
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

.predefined-questions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.predefined-questions button {
  width: 210px;
  height: 45px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.predefined-questions button:hover {
  background-color: #f1f1f1;
}

.chatbot-toggle-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
}

.chatbot-toggle-button:hover {
  background-color: #0056b3;
}
</style>
