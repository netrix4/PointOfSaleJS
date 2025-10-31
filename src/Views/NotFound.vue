<template>
  <div class="mainContentReports">
    <h3>Route Not Found</h3>
    <img class="imageNotFound" src="/resources/404.png" />
    <button class="accentButton" @click="() => $router.back()">Go Back</button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.mainContentReports {
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
.imageNotFound {
  height: 180px;
  width: 360px;
  padding: 5%;
}
.accentButton {
  background-color: var(--accent-color);
  font: var(--font-size-base);
  color: var(--font-color);
  width: 100px;
  height: 35px;
  border-radius: 10px;
}
</style>
