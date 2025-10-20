<template>
  <div class="mainContentHome">
    <p v-if="authStore.isAuthenticated">Hola, {{ authStore.user.name }}!</p>
    <p>This is your profile page</p>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const authStore: any = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  console.log("is auth?", authStore.isAuthenticated);
  authStore.logout();
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
</style>
