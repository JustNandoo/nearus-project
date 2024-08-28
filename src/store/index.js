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
      if (user) {
        state.user = {
          ...state.user,
          name: user.name || state.user?.name || '',
          email: user.email || state.user?.email || '',
          phone: user.phone || state.user?.phone || '',
          gender: user.gender || state.user?.gender || '',
          photoprofile: user.photoprofile || state.user?.photoprofile || '',
        };
        localStorage.setItem('local', JSON.stringify(state.user));
      } else {
        console.error('User object is undefined or null');
      }
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('local');
    },
    loadUserFromStorage(state) {
      const user = localStorage.getItem('local');
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      state.user = user ? JSON.parse(user) : null;
      state.token = token || null;
      state.role = role || null;
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
    async fetchUserData({ commit, state }) {
      if (!state.token) {
        throw new Error('No token found');
      }
      try {
        const response = await axios.get(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        if (response.data && response.data.data) {
          commit('setUser', response.data.data);
        } else {
          console.error('Failed to fetch user data:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
      }
    },
    async updateUserProfile({ commit, state }, updatedProfileData) {
      if (!state.token) {
        throw new Error('No token found');
      }
      try {
        const response = await axios.post(
            `${API_URL}/profile/update`,
            updatedProfileData,
            {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            }
        );
        if (response.data && response.data.data) {
          commit('setUser', response.data.data);
        } else {
          console.error('Failed to update profile:', response.data);
        }
      } catch (error) {
        console.error('Failed to update profile:', error);
        throw error;
      }
    },
    async updateUserProfilePic({ commit, state }, formData) {
      if (!state.token) {
        throw new Error('No token found');
      }
      try {
        const response = await axios.post(
            `${API_URL}/profile/upload-photo`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${state.token}`,
                'Content-Type': 'multipart/form-data',
              },
            }
        );
        if (response.data && response.data.data) {
          commit('setUser', response.data.data);
        } else {
          console.error('Failed to update profile picture:', response.data);
        }
      } catch (error) {
        console.error('Failed to update profile picture:', error);
        throw error;
      }
    },
    async updateUserContactInfo({ commit, state }, contactInfo) {
      if (!state.token) {
        throw new Error('No token found');
      }
      try {
        const response = await axios.post(
            `${API_URL}/profile/update`,
            contactInfo,
            {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            }
        );
        if (response.data && response.data.user) {
          commit('setUser', response.data.user);
        } else {
          console.error('Failed to update contact info:', response.data);
        }
      } catch (error) {
        console.error('Failed to update contact info:', error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('clearToken');
      // Optionally clear user data if you don't want to persist it
      // commit('clearUser');
    },
    initializeStore({ commit }) {
      commit('loadUserFromStorage');
    },
  },
  getters: {
    isLoggedIn: state => !!state.user,
    getUser: state => state.user || {},
    getRole: state => state.role || null,
  },
});
