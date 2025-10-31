<template>
  <div class="mainWrapper">
    <div class="mainContentReports">
      <p>Pantalla de Reportes</p>
      <!-- <h2 style="color: #fff">
        {{ $route.params.id }}
      </h2> -->
      <div v-if="$route.params">
        <h2>
          {{ $route.params.id }}
        </h2>
      </div>
      <div v-else><h2>No params passed</h2></div>
      <button class="accentButton" @click="() => $router.back()">
        Regresar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.mainWrapper {
  width: 90%;
  height: 98%;

  border: 10px solid;
  border-color: var(--secondary-color);

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
}
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
