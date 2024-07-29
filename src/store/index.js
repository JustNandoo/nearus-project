// store.js
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || '',
  },
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => !!state.token,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  actions: {
    async login({ commit }, { email, password, remember }) {
      try {
        const response = await axios.post('https://api.nearus.id/api/login', {
          email,
          password,
        });
        const { token, user } = response.data;

        if (remember) {
          commit('setToken', token);
          commit('setUser', user);
        } else {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('user', JSON.stringify(user));
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Failed to login:', error);
        throw error;
      }
    },
    async initializeStore({ commit }) {
      if (localStorage.getItem('token')) {
        try {
          const response = await fetch('https://api.nearus.id/api/profile', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            commit('setUser', data);
          } else {
            commit('clearUser');
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          commit('clearUser');
        }
      }
    },
    logout({ commit }) {
      commit('clearUser');
    },
  },
});
