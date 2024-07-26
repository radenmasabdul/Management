<script setup>
import Layout from "../../layouts/Layout.vue";
import AddNewUsers from "../../components/users/AddNewUsers.vue";
import Table from "../../components/Table.vue";

import Swal from "sweetalert2";

import { ref, onBeforeMount, computed } from "vue";
import { useUsersStore } from "../../utils/stores/users/users";

const store = useUsersStore();
const dataListUsers = computed(() => store.filtersDataUsers);
const searchKeyword = ref(store.getSearchData);

onBeforeMount(async () => {
  await store.dataListUsers();
});

const tableHead = [
  { id: 1, title: "No" },
  { id: 2, title: "Name" },
  { id: 3, title: "Email" },
  { id: 4, title: "Actions" },
];

const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    store.setSearchKeyword(searchKeyword.value);
  }
};

const clearSearch = () => {
  searchKeyword.value = "";
  store.setSearchKeyword("");
};

const deleteUsers = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await store.deleteUser(id);
      Swal.fire({
        title: "Deleted!",
        text: "User has been deleted.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the user.",
        icon: "error",
      });
      console.error(error);
    }
  }
};

const inputClass =
  "w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600 font-JakartaSans focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1";
</script>

<template>
  <Layout>
    <div class="flex flex-wrap justify-between mx-5 my-2">
      <h1 class="font-JakartaSans text-2xl font-bold text-black my-2">Users</h1>

      <AddNewUsers />
    </div>

    <div class="flex flex-wrap mx-5 my-2">
      <input
        type="search"
        id="search"
        name="search"
        placeholder="Search..."
        :class="inputClass"
        v-model="searchKeyword"
        @keypress="handleKeyPress"
        @click="clearSearch"
      />
    </div>

    <div class="mx-5 my-2" v-if="dataListUsers.length > 0">
      <Table>
        <thead class="text-center bg-blue-600">
          <tr>
            <th v-for="data in tableHead" :key="data.id" class="font-JakartaSans font-bold text-sm text-white">
              {{ data.title }}
            </th>
          </tr>
        </thead>

        <tbody class="text-center">
          <tr v-for="(data, index) in dataListUsers" :key="data.id">
            <th>{{ index + 1 }}</th>
            <td>{{ data.name }}</td>
            <td>{{ data.email }}</td>
            <td class="flex flex-wrap justify-center items-center gap-4">
              <button class="btn btn-info btn-sm">
                <span><font-awesome-icon :icon="['fas', 'pen-to-square']" style="color: #ffffff" /></span>
              </button>
              <button class="btn btn-error btn-sm" @click="deleteUsers(data.id)">
                <span><font-awesome-icon :icon="['fas', 'trash']" style="color: #ffffff" /></span>
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>

    <div v-else>
      <Table>
        <thead class="text-center bg-blue-600">
          <tr>
            <th v-for="data in tableHead" :key="data.id" class="font-JakartaSans font-bold text-sm text-white">
              {{ data.title }}
            </th>
          </tr>
        </thead>

        <tbody class="text-center">
          <tr>
            <td colspan="4" class="text-center font-JakartaSans text-sm text-black">Data not Found</td>
          </tr>
        </tbody>
      </Table>
    </div>

    <div class="mx-5 my-2">
      <nav aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px text-sm">
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Previous</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >1</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >2</a
            >
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >3</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >4</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >5</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </Layout>
</template>

<style scoped></style>
