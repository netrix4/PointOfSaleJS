<template>
  <div class="itemContainer" @click="handleItemClick">
    <img :src="props.product.image_url" class="productImage" />
    <p>{{ props.product.name }}</p>
    <p>${{ props.product.price }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["product", "onItemClick"]);
const handleItemClick = () => props.onItemClick(props.product.id);
</script>

<style scoped>
p {
  padding: 0px;
  margin: 0px;
  font-size: 14px;
}
.itemContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 140px;
  width: 100px;

  cursor: grab;

  background-color: var(--primary-color);
  border: 2px solid;
  border-color: var(--accent-color);
  margin: 20px;
}
.productImage {
  height: 100px;
  width: 100px;
}
</style>
