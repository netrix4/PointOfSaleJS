<template>
  <div class="mainContentReports">
    <h3>This is Reports</h3>
    <!-- <h2 style="color: #fff">
      {{ $route.params.id }}
    </h2> -->
    <div v-if="$route.params">
      <h2>
        {{ $route.params.id }}
      </h2>
    </div>
    <div v-else><h2>No params passed</h2></div>
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
.accentButton {
  background-color: var(--accent-color);
  font: var(--font-size-base);
  color: var(--font-color);
  width: 100px;
  height: 35px;
  border-radius: 10px;
}
</style>
