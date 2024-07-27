<script setup>
const textClass = "font-JakartaSans text-black font-bold text-sm";
const iconClass = "text-blue-500 flex-shrink-0 w-5 h-5";
</script>

<template>
  <div class="lg:drawer-open bg-base-200 z-50">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <label for="my-drawer-2" class="lg:hidden">
        <font-awesome-icon :icon="['fas', 'bars']" class="w-8 h-8 cursor-pointer pt-4" />
      </label>
    </div>
    <div class="drawer-side scrolls">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <li>
          <router-link to="/home">
            <font-awesome-icon :icon="['fas', 'chart-pie']" :class="iconClass" />
            <span :class="textClass">Dashboard</span>
          </router-link>
        </li>

        <li>
          <router-link to="#">
            <font-awesome-icon :icon="['fas', 'book']" :class="iconClass" />
            <span :class="textClass">Reports</span>
          </router-link>
        </li>

        <li>
          <router-link to="#">
            <font-awesome-icon :icon="['fas', 'tag']" :class="iconClass" />
            <span :class="textClass">Submission of Collateral</span>
          </router-link>
        </li>

        <li>
          <router-link to="#">
            <font-awesome-icon :icon="['fas', 'folder']" :class="iconClass" />
            <span :class="textClass">Approval</span>
          </router-link>
        </li>

        <li>
          <router-link to="#">
            <font-awesome-icon :icon="['fas', 'file-lines']" :class="iconClass" />
            <span :class="textClass">Warranty Data</span>
          </router-link>
        </li>

        <li>
          <router-link to="#">
            <font-awesome-icon :icon="['fas', 'folder-open']" :class="iconClass" />
            <span :class="textClass">Surety Bond Data</span>
          </router-link>
        </li>

        <li>
          <router-link to="/users">
            <font-awesome-icon :icon="['fas', 'user']" :class="iconClass" />
            <span :class="textClass">Users</span>
          </router-link>
        </li>

        <li>
          <router-link to="/#">
            <font-awesome-icon :icon="['fas', 'gear']" :class="iconClass" />
            <span :class="textClass">Settings</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.drawer {
  position: relative;
  display: grid;
  grid-auto-columns: max-content auto;
}
</style>
