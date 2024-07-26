<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

import Cookies from "js-cookie";
import Swal from "sweetalert2";

import Api from "../../utils/index.js";

const router = useRouter();

const user = reactive({
  email: "",
  password: "",
});

let isHidePassword = ref(true);
let isLoading = ref(false);

const login = async () => {
  isLoading.value = true;

  try {
    const res = await Api.post("/api/login", {
      email: user.email,
      password: user.password,
    });

    Cookies.set("token", res.data.data.token, { expires: 0.5 }); // Set token to expire in 12 hours
    Cookies.set("user", JSON.stringify(res.data.data.user), { expires: 0.5 }); // Set user data to expire in 12 hours

    if (Cookies.get("token")) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successfully!",
        html: "Redirecting in <b></b> seconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          let countDown = 2;
          timer.textContent = countDown.toString();
          const timerInterval = setInterval(() => {
            countDown--;
            timer.textContent = countDown.toString();
            if (countDown <= 0) {
              clearInterval(timerInterval);
            }
          }, 1000);
        },
        willClose: () => {
          router.push({ name: "home" });
        },
      });
    }
  } catch (error) {
    console.error(error);
    let errorMessage = "Something went wrong!";

    if (error.response) {
      const responseData = error.response.data;
      const statusCode = error.response.status;

      switch (statusCode) {
        case 422:
          if (responseData.errors && responseData.errors.length > 0) {
            errorMessage = responseData.errors.map((err) => err.msg).join(", ");
          }
          break;
        case 401:
          errorMessage = "Password is incorrect.";
          break;
        case 404:
          errorMessage = "Email is not found.";
          break;
        default:
          errorMessage = responseData.messages || errorMessage;
      }
    }

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorMessage,
    });
  } finally {
    isLoading.value = false;
  }
};

const togglePasswordVisibility = () => {
  isHidePassword.value = !isHidePassword.value;
};

const inputClass =
  "w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600 font-JakartaSans";
</script>

<template>
  <div>
    <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div class="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
        <div
          class="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto"
        >
          <form class="space-y-4" @submit.prevent="login">
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
                  placeholder="Enter Your Email"
                  v-model="user.email"
                  :class="inputClass"
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
                  placeholder="Enter password"
                  v-model="user.password"
                  :class="inputClass"
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
                <RouterLink to="/forgot" class="text-blue-600 hover:underline font-semibold font-JakartaSans">
                  Forgot your password?
                </RouterLink>
              </div>
            </div>

            <div class="!mt-8">
              <button
                type="submit"
                class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-JakartaSans"
                :disabled="isLoading"
              >
                <span v-if="!isLoading">Log in</span>
                <span v-else class="lds-dual-ring"></span>
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

<style scoped>
.lds-dual-ring,
.lds-dual-ring:after {
  box-sizing: border-box;
}

.lds-dual-ring {
  display: inline-block;
  width: 10px;
  height: 10px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 10px;
  height: 10px;
  margin: 8px;
  border-radius: 50%;
  border: 6.4px solid currentColor;
  border-color: currentColor transparent currentColor transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
