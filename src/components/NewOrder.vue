<script setup lang="js">
import { onMounted, ref } from "vue";
import { CATEGORIES } from "../Interfaces/Categories";
import { getProducts } from "@/stores/storeProducts";
import SideMenuItem from "./SideMenuItem.vue";
import SellingItem from "./SellingItem.vue";

const items=5
const subtotal=500
const total=600

let clickedCategory = ref(CATEGORIES.NEW_ORDER);
let dbResults = ref()
let currentCart = ref([])

const onChildItemClick = (productId) =>{
  const result = dbResults.value.filter((product, resultIndex)=> product.id == productId)[0]
  currentCart.value.push(result)
  console.log(currentCart.value.length);
}

// const onSideMenuClick = (categoryParamter: String):void => {
// clickedCategory.value = categoryParamter as CATEGORIES;
const onSideMenuClick = (categoryParamter)=> {
  clickedCategory.value = categoryParamter;
  console.log('Clickado', clickedCategory.value);
};
const getFromSupaBase = () => {
  getProducts().then((data) => {
    dbResults.value = data;
  });
};

onMounted(()=>{
  getFromSupaBase()
})
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
      <div class="summaryItems">
        <div
          v-if="currentCart.length < 1"
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            height: 100%;
          "
        >
          <p>Sin productos todavia</p>
        </div>
        <div v-else>
          <div class="summaryItemsHeader">
            <p>Nombre del Producto</p>
            <p>Precio</p>
            <p>Accion</p>
          </div>
          <div class="cartItem" v-for="cartItem in currentCart">
            <p>{{ cartItem.name }}</p>
            <p>${{ cartItem.price }}</p>
            <button>🗑 Eliminar</button>
          </div>
        </div>
      </div>
      <div class="sumaryDetails">
        <div class="titles">
          <p>
            Items<br />subtotal<br />
            <strong>Total</strong><br />
          </p>
        </div>
        <div class="paymentNumbers">
          <p>
            {{ currentCart.length }}<br />{{ subtotal }}<br />{{ total }}<br />
          </p>
        </div>
      </div>
      <div class="summaryButtonsContainer">
        <div class="button">🚫 Cancelar</div>
        <div class="button">💾 Guardar</div>
        <div class="checkoutButton">🛒 Pagar</div>
      </div>
    </div>
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
.summaryItemsHeader {
  justify-content: space-between;
  display: flex;
  flex-direction: row;
}
.summaryItems {
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: flex-start;
}
.cartItem {
  width: 100%;
  background-color: rgb(9, 139, 139);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
