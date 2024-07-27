<script setup>
import { ref, reactive, watch } from "vue";

import Cookies from "js-cookie";
import Swal from "sweetalert2";

import Api from "../../utils";
import { useUsersStore } from "../../utils/stores/users/users";

const store = useUsersStore();
const token = Cookies.get("token");

const isModalOpen = ref(false);
const isHidePassword = ref(true);
const isHideConfirmPassword = ref(true);

const props = defineProps({
  dataUser: Object,
});

const initialForm = reactive({
  name: props.dataUser?.name,
  email: props.dataUser?.email,
  password: "",
  confirmPassword: "",
  role: props.dataUser?.role,
});

const form = reactive({ ...initialForm });

const saveEditUser = async () => {
  if (form.password !== form.confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password and Confirm Password doesn't match!",
    });
    return;
  }
  try {
    Api.defaults.headers.common["Authorization"] = token;
    let payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    const res = await Api.post(`/api/admin/users/updateusers/${props.dataUser.id}`, payload);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    closeModal();
    await store.dataListUsers(true);
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.errors[0].msg,
    });
  }
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  resetForm();
};

const resetForm = () => {
  form.name = initialForm.name;
  form.email = initialForm.email;
  form.password = "";
  form.confirmPassword = "";
  form.role = initialForm.role;
};

watch(
  () => props.dataUser,
  (newData) => {
    if (newData) {
      initialForm.name = newData.name || "";
      initialForm.email = newData.email || "";
      resetForm();
    }
  },
  { immediate: true }
);

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
  <label @click="openModal" type="button" for="my_modal_6" class="btn btn-info btn-sm"
    ><span><font-awesome-icon :icon="['fas', 'pen-to-square']" style="color: #ffffff" /></span
  ></label>

  <div v-if="isModalOpen">
    <input type="checkbox" id="my_modal_6" class="modal-toggle" />
    <main class="modal" role="dialog">
      <div class="modal-box">
        <div class="py-2">
          <label @click="closeModal" for="my_modal_6" class="cursor-pointer absolute right-3 top-3">
            <font-awesome-icon :icon="['fas', 'circle-xmark']" style="color: #ff0000" class="w-6 h-6" />
          </label>
          <p class="font-JakartaSans font-bold text-2xl text-black border-b-2 border-black border-solid text-start">
            Edit Users
          </p>
        </div>

        <form class="space-y-4 text-start" @submit.prevent="saveEditUser">
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
                v-model="form.name"
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
                v-model="form.email"
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
                v-model="form.password"
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
            <label for="confirm_password" class="text-black text-sm mb-2 block font-JakartaSans"
              >Confirm Password</label
            >
            <div class="relative flex items-center">
              <input
                id="confirm_password"
                name="confirm_password"
                :type="isHideConfirmPassword ? 'password' : 'text'"
                autocomplete="off"
                required
                placeholder="Enter Your Password"
                :class="inputClass"
                v-model="form.confirmPassword"
              />

              <div
                @click="() => togglePasswordVisibility('confirmPassword')"
                class="w-[18px] h-[18px] absolute right-1"
              >
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

          <div>
            <label for="role" class="text-black text-sm mb-2 block font-JakartaSans">Role</label>
            <div class="relative flex items-center">
              <!-- <input
                id="email"
                name="email"
                type="email"
                autocomplete="off"
                required
                placeholder="Enter Your Email"
                :class="inputClass"
                v-model="form.email"
              /> -->
              <select :class="inputClass" v-model="form.role">
                <option value="Administator">Administator</option>
                <option value="User HQ">User HQ</option>
                <option value="User Branch">User Branch</option>
              </select>
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
  </div>
</template>

<style scoped></style>
