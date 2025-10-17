<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <main>
    <RouterView> </RouterView>
  </main>
</template>

<style>
:root {
  --primary-color: #000;
  --secondary-color: #1d1d1e;
  --terciary-color: #7d7d82;
  --accent-color: #b4458d;
  --second-accent-color: #c81c1c;
  --font-size-base: 16px;
  --font-color: #fff;
}
main {
  width: 100%;
  height: 100vh;
  /* height: 94.5vh; */
  /* padding: 1%; */

  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
