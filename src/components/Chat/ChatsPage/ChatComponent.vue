<template>
  <div style="height: 100vh">
    <PrettyChatWindow
        :projectId="projectId"
        :username="username"
        :secret="secret"
    />
  </div>
</template>

<style>
/* Set the background color to white */
.ce-chat-engine {
  background-color: white;
}

/* Style the chat bubbles */
.ce-message-bubble {
  background-color: #007bff; /* Blue color for the bubbles */
  color: white; /* White text inside the bubbles */
}

.ce-message-bubble--left {
  background-color: #007bff; /* Blue color for incoming messages */
}

.ce-message-bubble--right {
  background-color: #0056b3; /* Darker blue for outgoing messages */
}

.ce-new-chat-button {
  width: 32px;
  position: relative;
  bottom: 22px;
}
</style>

<script>
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { applyReactInVue } from "veaury";

export default {
  data() {
    return {
      projectId: import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
    };
  },
  components: {
    PrettyChatWindow: applyReactInVue(PrettyChatWindow),
  },
  props: {
    username: {
      type: String,
      required: true,
    },
    secret: {
      type: String,
      required: true,
    },
  },
};
</script>
