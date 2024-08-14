
<template>
    <div v-if="visible" class="alert-container" :class="type">
      <p>{{ message }}</p>
      <button @click="closeAlert">X</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      type: {
        type: String,
        default: 'success' // success, error, warning, info
      },
      message: {
        type: String,
        required: true
      },
    },
    data() {
      return {
        visible: true,
      };
    },
    methods: {
      closeAlert() {
        this.visible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .alert-container {
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
    position: relative;
    font-weight: 600;
  }
  
  .alert-container.success {
    background-color: #d4edda;
    color: #155724;
  }
  
  .alert-container.error {
    background-color: #f8d7da;
    color: #721c24;
  }
  
  .alert-container.warning {
    background-color: #fff3cd;
    color: #856404;
  }
  
  .alert-container.info {
    background-color: #d1ecf1;
    color: #0c5460;
  }
  
  .alert-container button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
  }
  </style>
  