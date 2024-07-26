// store.js
import { createStore } from 'vuex';

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
