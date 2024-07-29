<script setup>
import Layout from "../layouts/Layout.vue";
import ChartsReports from "../components/dashboard/ChartsReports.vue";
import ChartsUsers from "../components/dashboard/ChartsUsers.vue";
</script>

<template>
  <Layout>
    <div class="py-2">
      <div class="flex flex-wrap justify-center items-center gap-4">
        <ChartsReports />
        <ChartsUsers />
      </div>
    </div>
  </Layout>
</template>

<style scoped></style>
