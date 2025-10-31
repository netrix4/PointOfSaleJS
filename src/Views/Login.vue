<template>
  <div class="mainContentLogin">
    <h2>Iniciar Sesión</h2>

    <form class="loginForm" @submit.prevent="handleLogin">
      <!-- <div> -->
      <input v-model="email" type="email" placeholder="Email" required />
      <!-- </div> -->

      <!-- <div> -->
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        required
      />
      <!-- </div> -->

      <button class="accentButton" type="submit" :disabled="isLoading">
        {{ isLoading ? "Cargando..." : "Iniciar Sesión" }}
      </button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { signIn } = useAuth();

const email = ref("");
const password = ref("");
const error = ref(null);
const isLoading = ref(false);

const handleLogin = async () => {
  error.value = null;
  isLoading.value = true;

  const { data, error: loginError } = await signIn(email.value, password.value);

  isLoading.value = false;

  if (loginError) {
    error.value = loginError.message as any;
  } else {
    router.push("/neworder");
  }
};
</script>

<style scoped>
.mainContentLogin {
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
.loginForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
input {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  height: 30%;
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
  height: 70px;
  border-radius: 10px;
}
</style>
