<template>
  <div
    :class="
      componentProp.isSelected
        ? 'mainContentSideMenuSelected'
        : 'mainContentSideMenu'
    "
    @click="handleClick"
  >
    <!-- <img src="../resources/cart.png" class="sideImage" /> -->
    <img :src="`/resources/${componentProp.sideName}.png`" class="sideImage" />
    <p>{{ sideName }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CATEGORIES } from "../Interfaces/Categories";

const imageSource = ref("");

const handleClick = () => {
  componentProp.onSideMenuClick(componentProp.sideName);
};

interface sideItemPropps {
  sideName: String;
  isSelected: Boolean;
  onSideMenuClick: (parameter: String) => {};
}
const componentProp = defineProps<sideItemPropps>();
</script>

<style scoped>
.mainContentSideMenu,
.mainContentSideMenuSelected {
  background-color: var(--primary-color);
  color: var(--font-color);
  cursor: grab;
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mainContentSideMenuSelected {
  background-color: var(--accent-color);
}
.sideImage {
  width: 30px;
  height: 30px;
  filter: brightness(300%);
}
</style>
