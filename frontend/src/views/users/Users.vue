<script setup>
import Layout from "../../layouts/Layout.vue";
import AddNewUser from "../../components/users/AddNewUser.vue";
import EditUser from "../../components/users/EditUser.vue";
import Table from "../../components/Table.vue";

import Swal from "sweetalert2";

import { ref, onBeforeMount, computed } from "vue";
import { useUsersStore } from "../../utils/stores/users/users";

const store = useUsersStore();
const dataListUsers = computed(() => store.filtersDataUsers);
const searchKeyword = ref(store.getSearchData);

let showingValue = ref(1);
let pageMultiplier = ref(10);

onBeforeMount(async () => {
  await store.dataListUsers();
});

const tableHead = [
  { id: 1, title: "No" },
  { id: 2, title: "Name" },
  { id: 3, title: "Email" },
  { id: 4, title: "Role" },
  { id: 5, title: "Actions" },
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

const onChangePage = (pageOfItem) => {
  showingValue.value = pageOfItem;
};

const paginatedUsers = computed(() => {
  const start = (showingValue.value - 1) * pageMultiplier.value;
  const end = start + pageMultiplier.value;
  return dataListUsers.value.slice(start, end);
});

const inputClass =
  "w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600 font-JakartaSans focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1";
</script>

<template>
  <Layout>
    <div class="flex flex-wrap justify-between mx-5 my-2">
      <h1 class="font-JakartaSans text-2xl font-bold text-black my-2">Users</h1>

      <AddNewUser />
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

    <div class="mx-5 my-2" v-if="paginatedUsers.length > 0">
      <Table>
        <thead class="text-center bg-blue-600">
          <tr>
            <th v-for="data in tableHead" :key="data.id" class="font-JakartaSans font-bold text-sm text-white">
              {{ data.title }}
            </th>
          </tr>
        </thead>

        <tbody class="text-center">
          <tr v-for="(data, index) in paginatedUsers" :key="data.id">
            <th>{{ index + 1 + (showingValue - 1) * pageMultiplier }}</th>
            <td>{{ data.name }}</td>
            <td>{{ data.email }}</td>
            <td>{{ data.role }}</td>
            <td class="flex flex-wrap justify-center items-center gap-4">
              <EditUser :dataUser="data" />
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

    <div class="mx-5 mt-2 mb-4">
      <p class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
        Showing {{ (showingValue - 1) * pageMultiplier + 1 }} to
        {{ Math.min(showingValue * pageMultiplier, dataListUsers.length) }}
        of {{ dataListUsers.length }} entries
      </p>
      <vue-awesome-paginate
        :total-items="dataListUsers.length"
        :items-per-page="parseInt(pageMultiplier)"
        :on-click="onChangePage"
        v-model="showingValue"
        :max-pages-shown="4"
        :show-breakpoint-buttons="false"
        :show-ending-buttons="true"
      />
    </div>
  </Layout>
</template>

<style scoped></style>
