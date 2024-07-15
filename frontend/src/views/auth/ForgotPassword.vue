<script setup>
import Logo from "../../assets/logo.jpg";

import { ref } from "vue";

let currentEmail = ref("");
let currentPassword = ref("");
let newPassword = ref("");

let isHidePassword = ref(true);
let isHideConfirmPassword = ref(true);

const togglePasswordVisibility = (type) => {
  if (type === "password") {
    isHidePassword.value = !isHidePassword.value;
  } else if (type === "confirm-password") {
    isHideConfirmPassword.value = !isHideConfirmPassword.value;
  }
};

const inputClass =
  "w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600 font-JakartaSans";
</script>

<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <RouterLink to="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-800">
        <img class="w-8 h-8 mr-2" :src="Logo" alt="logo" />
        <span class="font-JakartaSans text-xl">AL Company</span>
      </RouterLink>

      <div class="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
        <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl font-JakartaSans">
          Change Password
        </h2>

        <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-800 font-JakartaSans">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              autocomplete="off"
              placeholder="name@company.com"
              required=""
              :class="inputClass"
              v-model="currentEmail"
            />
          </div>

          <div>
            <label for="password" class="text-gray-800 text-sm mb-2 block font-JakartaSans">Password</label>
            <div class="relative flex items-center">
              <input
                id="password"
                name="password"
                autocomplete="off"
                required
                placeholder="Enter password"
                :class="inputClass"
                v-model="currentPassword"
                :type="isHidePassword ? 'password' : 'text'"
              />

              <div @click="togglePasswordVisibility('password')" class="w-[18px] h-[18px] absolute right-1">
                <span>
                  <font-awesome-icon
                    v-if="isHidePassword"
                    :icon="['fas', 'eye-slash']"
                    class="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                  />
                  <font-awesome-icon
                    v-else
                    :icon="['fas', 'eye']"
                    class="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                  />
                </span>
              </div>
            </div>
          </div>

          <div>
            <label for="confirm-password" class="text-gray-800 text-sm mb-2 block font-JakartaSans"
              >Confirm password</label
            >
            <div class="relative flex items-center">
              <input
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                autocomplete="off"
                required=""
                :class="inputClass"
                v-model="newPassword"
                :type="isHideConfirmPassword ? 'password' : 'text'"
              />

              <div @click="togglePasswordVisibility('confirm-password')" class="w-[18px] h-[18px] absolute right-1">
                <span>
                  <font-awesome-icon
                    v-if="isHideConfirmPassword"
                    :icon="['fas', 'eye-slash']"
                    class="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                  />
                  <font-awesome-icon
                    v-else
                    :icon="['fas', 'eye']"
                    class="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                  />
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="bg-blue-600 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center font-JakartaSans"
          >
            Reset passwod
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
