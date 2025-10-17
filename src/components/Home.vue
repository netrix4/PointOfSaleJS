<template>
  <div class="mainContentHome">
    <p>You did it!</p>
    <p>This is home</p>
    <RouterLink to="/reports">Go To reports</RouterLink>
    <RouterLink to="/neworder">Go To NewOrder</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
.mainContentHome {
  color: var(--font-color);
  font: var(--font-size-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2%;
  border-radius: 10%;
  background-color: var(--secondary-color);
}
</style>
