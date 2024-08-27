<template>
  <div class="flex flex-col h-screen">
   <NavFixed/>
    <div class="flex flex-1 mt-20">
      <div class="w-[20%] bg-gray-100 border-r border-gray-300 p-4">
        <h2 class="text-lg font-semibold mb-4">Chats</h2>
        <div v-for="person in people" :key="person.id"
             @click="selectPerson(person)"
             :class="['p-4 rounded-lg cursor-pointer mb-2 flex items-center gap-4', selectedPerson && selectedPerson.id === person.id ? 'bg-blue-200' : 'hover:bg-gray-200']">
          <img :src="person.profilePicture" alt="Profile Picture" class="w-12 h-12 rounded-full">
          <div class="flex-1">
            <h3 class="font-medium">{{ person.name }}</h3>
            <p class="text-sm text-gray-600">{{ person.messages[person.messages.length - 1].text }}</p>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col bg-white">
        <!-- Chat messages -->
        <div class="flex-1 overflow-y-auto p-6">
          <div v-for="message in selectedPerson?.messages" :key="message.id"
               :class="['mb-4 p-4 rounded-lg max-w-xl', message.sender === 'user' ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-gray-800']">
            {{ message.text }}
          </div>
        </div>

        <!-- Input area -->
        <div class="p-4 border-t border-gray-300 bg-gray-100 flex items-center">
          <button class="p-2 text-gray-500 hover:text-blue-500">
            <FontAwesomeIcon :icon="faPaperclip" />
          </button>
          <input v-model="newMessage" type="text" placeholder="Type a message..."
                 class="flex-1 p-3 mx-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                 :disabled="!selectedPerson">
          <button @click="sendMessage" class="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  :disabled="!newMessage.trim()">
            <FontAwesomeIcon :icon="faPaperPlane" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Nav from "@/components/Pages/Nav.vue";
import NavFixed from "@/components/Pages/NavFixed.vue";
import ProfileCard from "@/components/Profile/ProfileCard.vue";

const LOCAL_STORAGE_KEY = 'chatAppData';

const loadChatData = () => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [
    {
      id: 1,
      name: 'Pak Anwari',
      profilePicture: 'https://via.placeholder.com/150',
      messages: [
        { id: 1, text: 'Hello from Alice!', sender: 'bot' },
        { id: 2, text: 'Hi Alice!', sender: 'user' },
        { id: 3, text: 'How are you?', sender: 'bot' },
      ],
    },
    {
      id: 2,
      name: 'Bu Olga',
      profilePicture: 'https://via.placeholder.com/150',
      messages: [
        { id: 1, text: 'Selamat Siang ini bu olga', sender: 'bot' },
        { id: 2, text: 'Hi Bob!', sender: 'user' },
        { id: 3, text: 'What\'s up?', sender: 'bot' },
      ],
    },
    {
      id: 3,
      name: 'Pak Tito',
      profilePicture: 'https://via.placeholder.com/150',
      messages: [
        { id: 1, text: 'Hello from Charlie!', sender: 'bot' },
        { id: 2, text: 'Hi Charlie!', sender: 'user' },
        { id: 3, text: 'Nice to meet you!', sender: 'bot' },
      ],
    },
  ];
};

const saveChatData = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

const people = ref(loadChatData());
const selectedPerson = ref(people.value[0]);
const newMessage = ref('');

watch(people, (newPeople) => {
  saveChatData(newPeople);
}, { deep: true });

const selectPerson = (person) => {
  selectedPerson.value = person;
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;

  const newMessageObject = {
    id: selectedPerson.value.messages.length + 1,
    text: newMessage.value,
    sender: 'user',
  };

  selectedPerson.value.messages.push(newMessageObject);
  newMessage.value = '';
};

onMounted(() => {
  const storedData = loadChatData();
  if (storedData) {
    people.value = storedData;
    selectedPerson.value = people.value[0];
  }
});
</script>

<style scoped>
/* Adjustments for full screen layout */
.header {
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, margin-top 0.3s ease;
}

.bg-blue-primary {
  background-color: #008DDA;
}

.text-change {
  color: white;
}

.rounded-button {
  border-radius: 20px;
  transition: all 0.3s ease;
}

.login-button {
  background-color: #3490dc;
  color: white;
  padding: 0.5rem 1rem;
}

.login-button:hover {
  background-color: #2779bd;
}

.register-button {
  background-color: #3490dc;
  color: white;
  padding: 0.5rem 1rem;
}

.register-button:hover {
  border-color: #ffffff;
  color: #3490dc;
}
</style>
