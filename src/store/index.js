import { createStore } from 'vuex';
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
