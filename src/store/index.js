// store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'https://api.nearus.id/api';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('local')) || null,
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('local', JSON.stringify(user));
      state.role = user.websiterole;
      localStorage.setItem('role', user.websiterole);
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem('local');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
    loadUserFromStorage(state) {
      const user = localStorage.getItem('local');
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (user) {
        state.user = JSON.parse(user);
      }
      if (token) {
        state.token = token;
      }
      if (role) {
        state.role = role;
      }
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }
      try {
        const response = await axios.post(`${API_URL}/masuk`, { email, password });
        const user = response.data;
        commit('setUser', user.data);
        commit('setToken', user.token);
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('clearUser');
    },
    initializeStore({ commit }) {
      commit('loadUserFromStorage');
    },
  },
  getters: {
    isLoggedIn: state => !!state.user,
    getUser: state => state.user,
    getRole: state => state.role,
  },
});
