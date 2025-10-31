<template>
  <div class="mainWrapper">
    <div class="mainContentOther">
      <p>Pantalla de Otros</p>
      <button class="accentButton" @click="handleLogout">Regresar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogout = async () => {
  router.back();
};
</script>

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
.mainContentOther {
  color: var(--font-color);
  font: var(--font-size-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2%;
  border-radius: 10%;
  width: 200px;
  background-color: var(--secondary-color);
}
.accentButton {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--accent-color);
  font: var(--font-size-base);
  color: var(--font-color);
  width: 100px;
  height: 35px;
  border-radius: 10px;
}
</style>
