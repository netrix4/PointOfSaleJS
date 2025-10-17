<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Home from "./components/Home.vue";
</script>

<template>
  <main>
    <RouterView> </RouterView>
  </main>
  <!-- <Home /> -->
  <RouterLink to="/neworder" >Go NewOrder</RouterLink>
  <RouterLink to="/reports/123">Go Reports</RouterLink>
</template>

<style scoped></style>
