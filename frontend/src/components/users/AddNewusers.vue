<script setup>
import { ref, reactive } from "vue";

const users = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const isModalOpen = ref(false);
const isHidePassword = ref(true);
const isHideConfirmPassword = ref(true);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const togglePasswordVisibility = (field) => {
  if (field === "password") {
    isHidePassword.value = !isHidePassword.value;
  } else if (field === "confirmPassword") {
    isHideConfirmPassword.value = !isHideConfirmPassword.value;
  }
};

const classButton =
  "btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green";

const inputClass =
  "w-full text-sm text-black border border-gray-300 px-4 py-3 rounded-lg outline-blue-600 font-JakartaSans focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1";
</script>

<template>
  <label @click="openModal" type="button" for="my_modal_6" :class="classButton">Add New</label>

  <input type="checkbox" id="my_modal_6" class="modal-toggle" />
  <main class="modal" role="dialog">
    <div class="modal-box">
      <div class="py-2">
        <label @click="closeModal" for="my_modal_6" class="cursor-pointer absolute right-3 top-3">
          <font-awesome-icon :icon="['fas', 'circle-xmark']" style="color: #ff0000" class="w-6 h-6" />
        </label>
        <p class="font-JakartaSans font-bold text-2xl text-black">New Users</p>
      </div>

      <form class="space-y-4" @submit.prevent="saveRegister">
        <div>
          <label for="name" class="text-black text-sm mb-2 block font-JakartaSans">Full Name</label>
          <div class="relative flex items-center">
            <input
              id="name"
              name="name"
              type="name"
              autocomplete="off"
              required
              placeholder="Enter Your Name"
              :class="inputClass"
              v-model="users.name"
            />
          </div>
        </div>

        <div>
          <label for="email" class="text-black text-sm mb-2 block font-JakartaSans">Email</label>
          <div class="relative flex items-center">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="off"
              required
              placeholder="Enter Your Email"
              :class="inputClass"
              v-model="users.email"
            />
          </div>
        </div>

        <div>
          <label for="password" class="text-black text-sm mb-2 block font-JakartaSans">Password</label>
          <div class="relative flex items-center">
            <input
              id="password"
              name="password"
              :type="isHidePassword ? 'password' : 'text'"
              autocomplete="off"
              required
              placeholder="Enter Your Password"
              :class="inputClass"
              v-model="users.password"
            />

            <div @click="() => togglePasswordVisibility('password')" class="w-[18px] h-[18px] absolute right-1">
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
          <label for="confirm_password" class="text-black text-sm mb-2 block font-JakartaSans">Confirm Password</label>
          <div class="relative flex items-center">
            <input
              id="confirm_password"
              name="confirm_password"
              :type="isHideConfirmPassword ? 'password' : 'text'"
              autocomplete="off"
              required
              placeholder="Enter Your Password"
              :class="inputClass"
              v-model="users.confirmPassword"
            />

            <div @click="() => togglePasswordVisibility('confirmPassword')" class="w-[18px] h-[18px] absolute right-1">
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

        <div class="flex justify-start items-center gap-2">
          <button :class="classButton" class="w-36">Save</button>

          <label
            @click="closeModal"
            for="my_modal_6"
            :class="classButton"
            class="w-36 bg-red-500 border-red-500 hover:bg-white hover:border-red-500 hover:text-red-500"
            >Cancel</label
          >
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped></style>
