<script setup>
import { ref } from "vue";

let password = ref("");

let isHidePassword = ref(true);

const togglePasswordVisibility = () => {
  isHidePassword.value = !isHidePassword.value;
};
</script>

<template>
  <div>
    <div class="min-h-screen flex fle-col items-center justify-center py-6 px-4">
      <div class="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
        <div
          class="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto"
        >
          <form class="space-y-4">
            <div class="mb-8">
              <h3 class="text-gray-800 text-3xl font-extrabold font-JakartaSans">AL Company</h3>
              <p class="text-gray-500 text-sm mt-4 leading-relaxed font-JakartaSans">
                Log in to your account and easily manage all your company's needs.
              </p>
            </div>

            <div>
              <label for="email" class="text-gray-800 text-sm mb-2 block font-JakartaSans">Email</label>
              <div class="relative flex items-center">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="off"
                  required
                  class="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Enter Your Email"
                />
                <font-awesome-icon :icon="['fas', 'envelope']" class="w-[18px] h-[18px] absolute right-4" />
              </div>
            </div>
            <div>
              <label for="password" class="text-gray-800 text-sm mb-2 block font-JakartaSans">Password</label>
              <div class="relative flex items-center">
                <input
                  id="password"
                  name="password"
                  :type="isHidePassword ? 'password' : 'text'"
                  autocomplete="off"
                  required
                  class="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Enter password"
                  v-model="password"
                />
                <div @click="togglePasswordVisibility" class="w-[18px] h-[18px] absolute right-1">
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

            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-3 block text-sm text-gray-800 font-JakartaSans"> Remember me </label>
              </div>

              <div class="text-sm">
                <a href="#" class="text-blue-600 hover:underline font-semibold font-JakartaSans">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div class="!mt-8">
              <button
                type="button"
                class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
        <div class="lg:h-[400px] md:h-[300px] max-md:mt-8">
          <img
            src="https://readymadeui.com/login-image.webp"
            class="w-full h-full max-md:w-4/5 mx-auto block object-cover"
            alt="Dining Experience"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
