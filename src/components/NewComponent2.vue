<template>
  <div class="mainContent2">
    <h3>This is NewOrder</h3>
    <!-- <RouterLink to="/">Home</RouterLink> -->
    <button class="accentButton" @click="() => $router.back()">Go back</button>
  </div>
</template>

<script setup>
console.log("Esto es neworders");
</script>

<style scoped>
.mainContent2 {
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
  border-radius: 10%;
}
</style>
