// store.js
import { reactive } from 'vue';

export const store = reactive({
  user: {
    name: 'Data kosong',
    email: 'Data kosong',
    phone: 'Data kosong',
    profilePicture: '../src/assets/images/tesimg1.jpeg', // Default profile picture
  },
  updateUser(newUser) {
    this.user = { ...this.user, ...newUser };
  },
  updateProfilePicture(newPicture) {
    this.user.profilePicture = newPicture;
  },
});
