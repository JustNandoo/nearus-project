import { createStore } from "/node_modules/.vite/deps/vuex.js?v=61cc79d3";
import axios from "/node_modules/.vite/deps/axios.js?v=61cc79d3";

const API_URL = 'https://api.nearus.id/api';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('local')) || {},
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
  },
  mutations: {
    setUser(state, user) {
      if (user && typeof user === 'object') {
        state.user = {
          ...state.user,
          name: user.name || state.user?.name || '',
          email: user.email || state.user?.email || '',
          phonenumber: user.phonenumber || state.user?.phonenumber || '',
          jenis_kelamin: user.jenis_kelamin || state.user?.jenis_kelamin || '',
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
    setRole(state, role) {
      state.role = role;
      localStorage.setItem('role', role);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
    clearUser(state) {
      const preservedUserData = {
        photoprofile: state.user?.photoprofile || '',
        jenis_kelamin: state.user?.jenis_kelamin || '',
      };
      state.user = preservedUserData;
      localStorage.setItem('local', JSON.stringify(state.user));
    },
    loadUserFromStorage(state) {
      const user = localStorage.getItem('local');
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      state.user = user ? JSON.parse(user) : {};
      state.token = token || null;
      state.role = role || null;
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

        // Set user data, token, and role
        commit('setUser', user.data);
        commit('setToken', user.token);
        commit('setRole', user.data.websiterole);

        // Fetch user profile after setting the token
        await dispatch('fetchUserProfileByID');
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async fetchUserProfileByID({ commit, state }) {
      if (!state.token) {
        console.error('No token available for authorization');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

        // Handle the response structure
        if (response.data && response.data.success && response.data.data) {
          commit('setUser', response.data.data);
        } else if (response.data && response.data.user) {
          // Handle case where response contains a `user` object directly
          commit('setUser', response.data.user);
        } else {
          console.error('Failed to fetch user profile: Unexpected response format', response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Authorization failed: Invalid token');
        } else {
          console.error('Failed to fetch user profile:', error);
        }
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
        // Handle different response structures
        if (response.data && response.data.data) {
          commit('setUser', response.data.data);
        } else if (response.data && response.data.user) {
          commit('setUser', response.data.user);
        } else {
          console.error('Failed to fetch user data: Unexpected response format', response.data);
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
            `${API_URL}/profile/add-personal-data`,
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
        if (response.data && response.data.data) {
          commit('setUser', response.data.data);
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
      commit('clearUser');
    },
    initializeStore({ commit }) {
      commit('loadUserFromStorage');
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    getUser: state => state.user || {},
    getRole: state => state.role || null,
  },
});
