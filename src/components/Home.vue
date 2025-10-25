<template>
  <div class="mainContentHome">
    <p>¡Hola!</p>
    <p>Te doy la bienvenida a<br />TuPuntoDeVenta</p>
    <button @click="getFromSupaBase">Select * from</button>
    <RouterLink to="/login"
      ><div class="accentButton">Iniciar sesión</div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { getProducts } from "@/stores/storeProducts";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const dbResults = ref();

const getFromSupaBase = () => {
  console.log("Clickeado xd");
  getProducts().then((data) => {
    dbResults.value = data;
    console.log(dbResults.value);
  });
};
getFromSupaBase()
console.log(dbResults.value);
</script>

<style scoped>
.mainContentHome {
  color: var(--font-color);
  font: var(--font-size-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2%;
  border-radius: 10%;
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
  width: 120px;
  height: 35px;
  border-radius: 10px;
}
</style>
