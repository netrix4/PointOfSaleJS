<template>
  <div class="mainContentNewOrder">
    <div class="sideOptions">
      <SideMenuItem />
      <SideMenuItem />
      <SideMenuItem />
      <SideMenuItem />
    </div>
    <div class="products"><p>this is products</p></div>
    <div class="summary">
      <div class="summaryHeader">
        <button class="buttonExit" @click="() => $router.back()">
          Go Back
        </button>
      </div>
      <div class="summaryItems"><p>this is summarycheckout</p></div>
      <div class="summaryButtonsContainer">
        <button class="button">this is a chekoutbutton</button>
        <button class="button">this is a chekoutbutton</button>
        <button class="checkoutButton">this is a chekoutbutton</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideMenuItem from "./SideMenuItem.vue";
console.log("Esto es neworders");
</script>

<style>
.mainContentNewOrder {
  color: var(--font-color);
  font: var(--font-size-base);
  background-color: var(--secondary-color);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* padding: 1%; */

  height: 100%;
  width: 100%;
}
.sideOptions {
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.products {
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.summary {
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.summaryHeader {
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
}
.summaryItems {
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.summaryButtonsContainer {
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.buttonExit {
  background-color: var(--secondary-color);
  font: var(--font-size-base);
  color: var(--font-color);
  width: auto;
  height: 35px;
  border-radius: 10%;
}
.button {
  background-color: var(--secondary-color);
  font: var(--font-size-base);
  color: var(--font-color);
  width: auto;
  height: 35px;
  border-radius: 10%;
}
.checkoutButton {
  background-color: var(--accent-color);
  font: var(--font-size-base);
  color: var(--font-color);
  width: auto;
  height: 35px;
  border-radius: 10%;
}
</style>
