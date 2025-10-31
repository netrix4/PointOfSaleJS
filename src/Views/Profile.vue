<template>
  <div class="mainWrapper">
    <div class="mainContentProfile">
      <!-- <p v-if="session">Hola, {{ user?.email }}!</p> -->
      <p>Hola, usuario!</p>
      <p>Esta es tu pantalla de usuario</p>
      <button class="accentButton" @click="handleLogout">
        ❌ Cerrar Sesión
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const { signOut, getSession, getUser } = useAuth();
const router = useRouter();
// const session = await getSession();
// const user = await getUser();
// console.log(user);

const handleLogout = async () => {
  await signOut();
  router.push("/");
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
.mainContentProfile {
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
  text-align: center;
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
  height: auto;
  padding: 10px 0px;
  border-radius: 10px;
}
</style>
