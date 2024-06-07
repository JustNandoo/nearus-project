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
      state.user = user;
      localStorage.setItem('local', JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearUser(state) {
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
        commit('setUser', user.data);
        commit('setToken', user.token);
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async updateUserProfile({ commit, state }, updatedProfileData) {
      try {
        const response = await axios.put(`${API_URL}/profile/update`, updatedProfileData, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
          },
        });
        const updatedUser = response.data;
        commit('setUser', updatedUser);
      } catch (error) {
        console.error('Error updating user profile:', error);
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
    getPhoneNumber: state => {
      if (state.user && state.user.phoneNumber) {
        return state.user.phoneNumber.toString();
      }
      return null;
    },
  },
});
