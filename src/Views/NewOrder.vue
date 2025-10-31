<script setup lang="js">
import { ref } from "vue";
import { CATEGORIES } from "../Interfaces/Categories";
import SideMenuItem from "../components/SideMenuItem.vue";
import NewOrderComponent from "../components/NewOrderComponent.vue";
import Profile from "./Profile.vue";
import Reports from "./Reports.vue";
import Other from "./Other.vue";

let clickedCategory = ref(CATEGORIES.NEW_ORDER);

const onSideMenuClick = (categoryParamter)=> {
  clickedCategory.value = categoryParamter;
};
</script>
<template>
  <div class="mainContentNewOrder">
    <div class="sideOptions">
      <SideMenuItem
        v-for="Category in CATEGORIES"
        :side-name="Category"
        :is-selected="clickedCategory === Category"
        :onSideMenuClick="onSideMenuClick"
      />
    </div>
    <NewOrderComponent v-if="clickedCategory === CATEGORIES.NEW_ORDER" />
    <Reports v-if="clickedCategory === CATEGORIES.REPORTS" />
    <Profile v-if="clickedCategory === CATEGORIES.PROFILE" />
    <Other v-if="clickedCategory === CATEGORIES.OTHER" />
  </div>
</template>

<style scoped>
.mainContentNewOrder {
  color: var(--font-color);
  font: var(--font-size-base);
  background-color: var(--secondary-color);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
}
.sideOptions {
  width: 10%;
  height: 100%;
  background-color: var(--primary-color);
  border: 5px solid;
  border-top: 0px;
  border-bottom: 0px;
  border-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
