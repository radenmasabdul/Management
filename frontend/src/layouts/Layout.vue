<script setup>
import Navbar from "../components/layout/Navbar.vue";
import Sidebar from "../components/layout/Sidebar.vue";
</script>

<template>
  <main class="flex h-screen">
    <Sidebar />
    <div class="flex flex-col flex-grow">
      <Navbar />

      <div class="h-full">
        <slot></slot>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
