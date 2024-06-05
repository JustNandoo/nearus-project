// src/store/index.js
import { createStore } from 'vuex';
import axios from 'axios';
import { API_URL } from '@/constants';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('local')) || null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setUser(state, user) {
      console.log('Setting user:', user);
      state.user = user;
      localStorage.setItem('local', JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearUser(state) {
      console.log('Clearing user data');
      state.user = null;
      state.token = null;
      localStorage.removeItem('local');
      localStorage.removeItem('token');
    },
    loadUserFromStorage(state) {
      const user = localStorage.getItem('local');
      const token = localStorage.getItem('token');
      if (user) {
        state.user = JSON.parse(user);
        console.log('Loaded user from storage:', state.user);
      }
      if (token) {
        state.token = token;
      }
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post(`${API_URL}/masuk`, { email, password });
        const user = response.data;
        console.log('User data:', user);
        commit('setUser', user.data);
        commit('setToken', user.token);
      } catch (error) {
        if (error.response) {
          console.error('Login failed:', error.response.data);
        } else {
          console.error('Login failed:', error.message);
        }
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
    getUser: state => {
      console.log('Getter getUser:', state.user);
      return state.user;
    },
    // Getter baru untuk mengambil nomor telepon
    getPhoneNumber: state => {
      // Jika pengguna ada dan nomor telepon ada dalam struktur data pengguna, kembalikan nomor telepon
      if (state.user && state.user.phoneNumber) {
        return state.user.phoneNumber.toString(); // Mengonversi nomor telepon ke string
      }
      return null; // Jika tidak ada nomor telepon tersedia, kembalikan null
    },
  },
});
