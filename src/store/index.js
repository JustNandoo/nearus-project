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
    updateUser(state, updatedUser) {
      state.user = updatedUser;
      localStorage.setItem('local', JSON.stringify(updatedUser));
    },
    updateUserProfilePic(state, profilePicUrl) {
      if (state.user) {
        state.user.photoprofile = profilePicUrl;
        localStorage.setItem('local', JSON.stringify(state.user));
      }
    },
    updateUserGender(state, gender) {
      if (state.user) {
        state.user.gender = gender;
        localStorage.setItem('local', JSON.stringify(state.user));
      }
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
    async updateUserProfile({ commit, state }, updatedProfileData) {
      try {
        const dataToUpdate = {};
    
        if (updatedProfileData.name) dataToUpdate.name = updatedProfileData.name;
        if (updatedProfileData.email) dataToUpdate.email = updatedProfileData.email;
        if (updatedProfileData.phonenumber) dataToUpdate.phonenumber = updatedProfileData.phonenumber;
        if (updatedProfileData.jenis_kelamin) dataToUpdate.jenis_kelamin = updatedProfileData.jenis_kelamin;
    
        const response = await axios.post(`${API_URL}/profile/update`, dataToUpdate, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
          },
        });
        const updatedUser = response.data.user;
        commit('updateUser', updatedUser);
      } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }
    },
    async updateUserProfilePic({ commit, state }, formData) {
      try {
        if (!formData || !formData.has('photoprofile')) {
          throw new Error('Profile picture is required.');
        }
    
        const response = await axios.post(`${API_URL}/profile/update`, formData, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'multipart/form-data'
          },
        });
    
        const updatedUser = response.data.user;
        commit('updateUserProfilePic', updatedUser.photoprofile);
      } catch (error) {
        console.error('Error updating profile picture:', error);
        throw error;
      }
    },
    async updateUserGender({ commit, state }, gender) {
      try {
        if (!gender) throw new Error('Gender is required');
        
        const response = await axios.post(`${API_URL}/profile/add-personal-data`, {
          jenis_kelamin: gender
        }, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
          },
        });
  
        // Perbarui data pengguna di store
        const updatedUser = response.data.user;
        commit('updateUser', updatedUser);
      } catch (error) {
        console.error('Error updating user gender:', error);
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
