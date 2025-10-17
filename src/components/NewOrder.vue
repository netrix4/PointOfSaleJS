<template>
  <div>
    <h3>This is NewOrder</h3>
    <RouterLink to="/">Home</RouterLink>
    <button @click="() => $router.back()">Go back</button>
  </div>
</template>

<script setup>
console.log("Esto es neworders");
</script>

<style></style>
