<template>
  <div class="flex h-full w-[1550px]">
    <div class="w-[15%] bg-white border-r border-gray-200 p-4">
      <div
          v-for="person in people"
          :key="person.id"
          @click="selectPerson(person)"
          :class="['p-4 rounded-lg cursor-pointer mb-2 flex items-center gap-4', selectedPerson && selectedPerson.id === person.id ? 'bg-blue-100' : 'hover:bg-gray-100']"
      >
        <img :src="person.profilePicture" alt="Profile Picture" class="w-10 h-10 rounded-full">
        {{ person.name }}
      </div>
    </div>
    <div class="flex-1 flex flex-col">
      <div class="flex-1 overflow-y-auto p-4 bg-gray-100 flex flex-col">
        <div v-for="message in selectedPerson?.messages" :key="message.id" :class="['mb-2 p-2 rounded-lg max-w-xs', message.sender === 'user' ? 'bg-blue-600 text-white self-end ml-auto' : 'bg-white text-gray-800']">
          {{ message.text }}
        </div>
      </div>
      <div class="p-4 border-t border-gray-200 bg-white flex items-center gap-4">
        <button class="p-2 text-gray-500 hover:text-blue-500">
          <FontAwesomeIcon :icon="faPaperclip" />
        </button>
        <input v-model="newMessage" type="text" placeholder="Type a message..." class="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200" :disabled="!selectedPerson" />
        <button @click="sendMessage" class="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" :disabled="!newMessage.trim()">
          <FontAwesomeIcon :icon="faPaperPlane" />
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const LOCAL_STORAGE_KEY = 'chatAppData';

// Load chat data from local storage or initialize with default values
const loadChatData = () => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return [
    {
      id: 1,
      name: 'Alice',
      profilePicture: 'https://via.placeholder.com/150',
      messages: [
        { id: 1, text: 'Hello from Alice!', sender: 'bot' },
        { id: 2, text: 'Hi Alice!', sender: 'user' },
        { id: 3, text: 'How are you?', sender: 'bot' },
      ],
    },
    {
      id: 2,
      name: 'Bob',
      profilePicture: 'https://via.placeholder.com/150',
      messages: [
        { id: 1, text: 'Hello from Bob!', sender: 'bot' },
        { id: 2, text: 'Hi Bob!', sender: 'user' },
        { id: 3, text: 'What\'s up?', sender: 'bot' },
      ],
    },
    {
      id: 3,
      name: 'Charlie',
      profilePicture: 'https://via.placeholder.com/150',
      messages: [
        { id: 1, text: 'Hello from Charlie!', sender: 'bot' },
        { id: 2, text: 'Hi Charlie!', sender: 'user' },
        { id: 3, text: 'Nice to meet you!', sender: 'bot' },
      ],
    },
  ];
};

// Save chat data to local storage
const saveChatData = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

const people = ref(loadChatData());
const selectedPerson = ref(people.value[0]);
const newMessage = ref('');

// Watch for changes in `people` to automatically save to local storage
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

// Initialize data when component mounts
onMounted(() => {
  const storedData = loadChatData();
  if (storedData) {
    people.value = storedData;
    selectedPerson.value = people.value[0];
  }
});
</script>



<style scoped>
/* Ensure blue chat bubbles align to the right */
.self-end {
  background-color: #2563EB; /* Darker blue color */
  color: white;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  font-weight: 500;
  margin-left: auto; /* Aligns to the right */
}
</style>
