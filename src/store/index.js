import { createStore } from 'vuex';
<<<<<<< HEAD
import axios from 'axios';
import { API_URL } from '@/constants';

const store = createStore({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user.data;
            localStorage.setItem('user', JSON.stringify(user.data));
        },
        CLEAR_USER(state) {
            state.user = null;
            localStorage.removeItem('user');
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await axios.post(`${API_URL}/masuk`, credentials);
                commit('SET_USER', response.data);
            } catch (error) {
                console.error('Error logging in:', error);
                throw error;
            }
        },
        logout({ commit }) {
            commit('CLEAR_USER');
        },
    },
});

export default store;
=======

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
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
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('clearUser');
    },
    initializeStore({ commit }) {
      commit('loadUserFromStorage');
    }
  },
  getters: {
    isLoggedIn: state => !!state.user,
    getUser: state => state.user
  }
});
>>>>>>> 430c1643a4168488054d7f1e4137faf344442214
