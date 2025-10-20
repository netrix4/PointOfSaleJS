<template>
  <!-- <div class="mainContentLogin">
  <p>This is home</p>
  <RouterLink to="/reports">Go To reports</RouterLink>
  <RouterLink to="/neworder">Go To NewOrder</RouterLink> 
  <RouterLink to="/login">Go Login</RouterLink>
</div> -->
  <!-- <div class="login-container"> -->
  <div class="mainContentLogin">
    <h2>Iniciar Sesión</h2>

    <form @submit.prevent="handleLogin">
      <div>
        <input v-model="email" type="email" placeholder="Email" required />
      </div>

      <div>
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          required
        />
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Cargando..." : "Iniciar Sesión" }}
      </button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
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
    error.value = loginError.message;
  } else {
    router.push("/login");
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
</style>
