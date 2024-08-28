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
      if (user && typeof user === 'object') {
        state.user = {
          ...state.user,
          name: user.name || state.user.name,
          email: user.email || state.user.email,
          phone: user.phone || state.user?.phone,
          gender: user.gender || state.user?.gender,
          photoprofile: user.photoprofile || state.user?.photoprofile,
        };
        localStorage.setItem('local', JSON.stringify(state.user));
        if (user.websiterole) {
          state.role = user.websiterole;
          localStorage.setItem('role', user.websiterole);
        }
      } else {
        console.error('Invalid user data:', user);
      }
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
    async login({ commit, dispatch }, { email, password }) {
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }
      try {
        const response = await axios.post(`${API_URL}/masuk`, { email, password });
        const user = response.data;
        commit('setUser', user.data);
        commit('setToken', user.token);
        await dispatch('fetchUserProfileByID', user.data.id);
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async updateUserProfile({ commit, state }, updatedProfileData) {
      try {
        const response = await axios.post(
            `${API_URL}/profile/add-personal-data`,
            updatedProfileData,
            {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            }
        );
        commit('setUser', response.data.data);
      } catch (error) {
        console.error('Failed to update profile:', error);
        throw error;
      }
    },
    async updateUserProfilePic({ commit, state }, formData) {
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
        const userData = response.data.data;
        if (userData) {
          commit('setUser', userData);
        } else {
          console.error('User data is undefined or null:', userData);
        }
        commit('setUser', response.data.data);
      } catch (error) {
        console.error('Failed to update profile picture:', error);
        throw error;
      }
    },
    async updateUserContactInfo({ commit, state }, contactInfo) {
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
        commit('setUser', response.data.user); // Use the correct response structure
      } catch (error) {
        console.error('Failed to update contact info:', error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('clearUser');
    },
    initializeStore({ commit }) {
      commit('loadUserFromStorage');
    },
    async fetchUserProfileByID({ commit }, id) {
      try {
        const response = await axios.get(`${API_URL}/profile/${id}`);
        commit('setUser', response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    },
  },
  getters: {
    isLoggedIn: state => !!state.user,
    getUser: state => state.user,
    getRole: state => state.role,
    getPhone: state => state.user?.phone || '',
    getGender: state => state.user?.gender || '',
  },
});
