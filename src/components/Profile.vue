<template>
  <div class="mainContentHome">
    <!-- <p v-if="session">Hola, {{ user?.email }}!</p> -->
    <p>Hola, usuario!</p>
    <p>This is your profile page</p>
    <button class="accentButton" @click="handleLogout">❌ Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const { signOut, getSession, getUser } = useAuth();
const router = useRouter();
// const session = await getSession();
// const user = await getUser();

const handleLogout = async () => {
  await signOut();
  router.push("/");
};
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
