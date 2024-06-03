import { createStore } from 'vuex';
import axios from 'axios';
import { API_URL } from '@/constants';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user.data;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    loadUserFromStorage(state) {
      const user = localStorage.getItem('user');
      if (user) {
        state.user = JSON.parse(user);
      }
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post(`${API_URL}/masuk`, { email, password });
        const user = response.data;
        console.log('User data:', user);
        commit('setUser', user);
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
  },
});
