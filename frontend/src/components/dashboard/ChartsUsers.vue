<script setup>
import { ref } from "vue";
import { DoughnutChart } from "vue-chart-3";

const chartData = ref({
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Agustus",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Sales Reports / Years",
      backgroundColor: "#f87979",
      data: [40, 20, 12, 39, 10, 40, 39, 60, 35, 90, 85, 75],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});
</script>

<template>
  <DoughnutChart :chart-data="chartData" :options="chartOptions" />
</template>

<style scoped></style>
