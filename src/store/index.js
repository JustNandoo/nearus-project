import { createStore } from 'vuex';

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

