<template>
  <div class="mainContentNewOrder">
    <div class="sideOptions">
      <SideMenuItem
        :side-name="CATEGORIES.NEW_ORDER"
        :is-selected="clickedCategory === CATEGORIES.NEW_ORDER"
        :onSideMenuClick="onSideMenuClick"
      />
      <SideMenuItem
        :side-name="CATEGORIES.RESPORTS"
        :is-selected="clickedCategory === CATEGORIES.RESPORTS"
        :onSideMenuClick="onSideMenuClick"
      />
      <SideMenuItem
        :side-name="CATEGORIES.PROFILE"
        :is-selected="clickedCategory === CATEGORIES.PROFILE"
        :onSideMenuClick="onSideMenuClick"
      />
      <SideMenuItem
        :side-name="CATEGORIES.OTHER"
        :is-selected="clickedCategory === CATEGORIES.OTHER"
        :onSideMenuClick="onSideMenuClick"
      />
    </div>
    <div class="products">
      <SellingItem
        v-for="product in dbResults"
        :key="product.id"
        :product="product"
        :onItemClick="onChildItemClick"
      />
    </div>
    <div class="summary">
      <div class="summaryHeader">
        <button class="buttonProfile" @click="() => $router.push('Profile')">
          Go Profile
        </button>
      </div>
      <div class="summaryItems"><p>this is summarycheckout</p></div>
      <div class="sumaryDetails">
        <div class="titles">
          <p>
            Items<br />subtotal<br />
            <strong>Total</strong><br />
          </p>
        </div>
        <div class="paymentNumbers">
          <p>{{ items }}<br />{{ subtotal }}<br />{{ total }}<br /></p>
        </div>
      </div>
      <div class="summaryButtonsContainer">
        <div class="button">🚫 Cancel</div>
        <div class="button">💾 Save</div>
        <div class="checkoutButton">🛒 Checkout</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from "vue";
import { CATEGORIES } from "../Interfaces/Categories";
import SideMenuItem from "./SideMenuItem.vue";
import SellingItem from "./SellingItem.vue";
import { getProducts } from "@/stores/storeProducts";

const items=5
const subtotal=500
const total=600

let clickedCategory = ref(CATEGORIES.NEW_ORDER);
let dbResults = ref()

const onChildItemClick = () =>{
  console.log("Child componente clicked");
}

// const onSideMenuClick = (categoryParamter: String):void => {
// clickedCategory.value = categoryParamter as CATEGORIES;
const onSideMenuClick = (categoryParamter)=> {
  clickedCategory.value = categoryParamter;
  console.log('Clickado', clickedCategory.value);
};
const getFromSupaBase = () => {
  console.log("Getting products info");
  getProducts().then((data) => {
    dbResults.value = data;
    console.log(dbResults.value);
  });
};

onMounted(()=>{
  getFromSupaBase()
})
</script>

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
.products {
  border: 5px solid;
  border-top: 0;
  border-bottom: 0;
  border-color: var(--primary-color);
  width: 45%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  overflow: auto;
  align-items: start;
  align-content: start;
  justify-content: start;
}
.summary {
  border: 5px solid;
  border-top: 0px;
  border-bottom: 0px;
  border-color: var(--primary-color);
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
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.sumaryDetails {
  display: flex;
  flex-direction: row;
  background-color: var(--primary-color);
  height: 10%;
  width: 90%;
  font-size: calc(var(--font-size-base) * 1.2);
  /* max-width: 100%; */
  padding: 0% 5%;
  justify-content: space-between;
}

.titles {
  display: flex;
  flex-direction: column;
}
.paymentNumbers {
  display: flex;
  flex-direction: column;
}
.summaryButtonsContainer {
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-color: var(--primary-color);
  border: 20px;
}
.buttonProfile {
  background-color: var(--secondary-color);
  font: var(--font-size-base);
  color: var(--font-color);
  width: auto;
  height: 35px;
  border-radius: 10px;
}
.button,
.checkoutButton {
  background-color: var(--secondary-color);
  font: var(--font-size-base);
  color: var(--font-color);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;
  height: 100%;
}
.checkoutButton {
  background-color: var(--accent-color);
  width: 34%;
}
</style>
