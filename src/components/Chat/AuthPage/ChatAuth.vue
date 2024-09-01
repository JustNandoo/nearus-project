<template>
  <div class="login-page min-h-screen flex items-center justify-center bg-blue-600">
    <div class="card w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <form @submit.prevent="login" class="mb-6">
        <div class="title text-2xl font-semibold text-center text-blue-600 mb-4">Login</div>
        <input
            placeholder="Username"
            type="text"
            v-model="username"
            class="input w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
            placeholder="Password"
            type="password"
            v-model="password"
            class="input w-full px-4 py-2 border rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
            type="submit"
            class="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>

      <form @submit.prevent="signup">
        <div class="title text-2xl font-semibold text-center text-blue-600 mb-4">Sign Up</div>
        <input
            class="input w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Username"
            type="text"
            v-model="username"
        />
        <input
            placeholder="Password"
            type="password"
            v-model="password"
            class="input w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
            placeholder="Email"
            type="text"
            v-model="email"
            class="input w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
            placeholder="First name"
            type="text"
            v-model="firstName"
            class="input w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
            placeholder="Last name"
            type="text"
            v-model="lastName"
            class="input w-full px-4 py-2 border rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
            type="submit"
            class="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { loginRest, signupRest } from "./api";

export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: "",
    };
  },
  methods: {
    login() {
      loginRest(this.username, this.password)
        .then((response) =>
          this.$emit("onAuth", { ...response.data, secret: this.password })
        )
        .catch((error) => console.log("Login error", error));
    },
    signup() {
      signupRest(
        this.username,
        this.password,
        this.email,
        this.first_name,
        this.last_name
      )
        .then((response) =>
          this.$emit("onAuth", { ...response.data, secret: this.password })
        )
        .catch((error) => console.log("Sign up error", error));
    },
  },
};
</script>