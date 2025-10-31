<script setup lang="js">
import { onMounted, ref } from "vue";
import { CATEGORIES } from "../Interfaces/Categories";
import { getProducts, insertCheckout } from "@/stores/storeProducts";
import SideMenuItem from "./SideMenuItem.vue";
import SellingItem from "./SellingItem.vue";


let clickedCategory = ref(CATEGORIES.NEW_ORDER);
let dbResults = ref([])
let currentCart = ref([])
const scanInputRef = ref()
const inputCodeValue = ref()

const IVA = 0.16

const getTotalItems = ()=> (currentCart.value.reduce((acumulator, current)=>acumulator+current.quantity,0))
const getSubTotalToPay = ()=> (currentCart.value.reduce((acumulator, current)=>acumulator+(current.quantity*current.price),0).toFixed(2))
const getTotalToPay = ()=> {
  const subtotal = Number(getSubTotalToPay())
  return (subtotal + (subtotal*IVA)).toFixed(2)
}

const onCodeTextChange = (event)=>{
  inputCodeValue.value = event.target.value
  console.log(inputCodeValue.value);

  const productId = dbResults.value.find((result)=>String(result.barcode_value) === inputCodeValue.value)?.id
  console.log(productId,'1111');
  if (productId) {
    onChildItemClick(productId)
  }
  inputCodeValue.value = ''
}
const onDeleteCart = ()=> currentCart.value=[]

const doesExistInCart = (productId)=>{
  const resultArray = currentCart.value.find((product)=> product.id === productId)
  return !!resultArray
}
const updateProductQuantity = (productId) =>{
  const producIndexInCart = currentCart.value.findIndex((product)=>(product.id === productId))
  currentCart.value[producIndexInCart].quantity += 1
}

const onChildItemClick = (productId) =>{
  let result = dbResults.value.filter((product, resultIndex)=> product.id == productId)[0]
  result = {...result, quantity:1}
  if (doesExistInCart(productId)) {
    updateProductQuantity(productId)
  }
  else{
    currentCart.value.push(result)
  }
  scanInputRef.value.focus();
}

const onDeleteItem = (productId) =>{
  currentCart.value = currentCart.value.filter((product)=>product.id !== productId)
}

const onSideMenuClick = (categoryParamter)=> {
  clickedCategory.value = categoryParamter;
};

const getProductsOnLoading = () => {
  getProducts().then((data) => {
    dbResults.value = data;
  });
};
const createCheckout = (newCheckOut) =>{
  // insertFixedCheckout().then((data, error)=>{console.log(data, error);})
  insertCheckout(newCheckOut).then((data)=>{console.log('Compra guardada');})

}

const onCheckOutClick = () =>{
  if (currentCart?.value?.length === 0) {
    alert('Primero selecciona productos')
  }
  else{
    let newCheckOut = {
      total : currentCart.value.reduce((accumulator, currentItem) => accumulator += currentItem.price, 0),
      products_quantity : currentCart.value.length,
      products_ids : currentCart.value.map((cartItem)=> cartItem.id)
    }

    createCheckout(newCheckOut)

  }
}
onMounted(()=>{
  getProductsOnLoading()
  scanInputRef.value.focus();
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
        <table class="summaryItemsTableContainer" v-else>
          <thead>
            <tr>
              <th>Nombre del Producto</th>
              <th>Precio</th>
              <th>Cantidad xd</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            <tr class="cartItem" v-for="cartItem in currentCart">
              <td class="cartItemData">{{ cartItem.name }}</td>
              <td class="cartItemData">${{ cartItem.price }}</td>
              <td class="cartItemData">{{ cartItem.quantity }}</td>
              <td class="cartItemData">
                <button
                  @click="onDeleteItem(cartItem.id)"
                  class="checkoutButton"
                >
                  🗑 Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="itemCodeInputContainer">
        <input
          type="text"
          class="codeInput"
          placeholder="Ingresa o escanea producto"
          :value="inputCodeValue"
          ref="scanInputRef"
          :onchange="onCodeTextChange"
        />
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
            {{ getTotalItems() }}<br />{{ getSubTotalToPay() }}<br />{{
              getTotalToPay()
            }}<br />
          </p>
        </div>
      </div>
      <div class="summaryButtonsContainer">
        <button class="button" @click="onDeleteCart">🚫 Cancelar</button>
        <!-- <button class="button">💾 Guardar</button> -->
        <button class="checkoutButton" @click="onCheckOutClick">
          🛒 Pagar
        </button>
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
  justify-content: space-between;
  overflow: auto;
}
.summaryItemsTableContainer {
  border: none;
  text-align: center;
  border-spacing: 0px;
}
.summaryItemsTableContainer td {
}
.cartItem {
  width: 100%;

  background-color: var(--secondary-accent-color);
}
.cartItemData {
  justify-content: center;
  align-items: center;
  align-content: center;
}
.itemCodeInputContainer {
  background-color: var(--primary-color);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
}
.codeInput {
  padding: 15px 25px;
  background-color: var(--secondary-color);
  border: none;
  /* border-color: var(--accent-color); */
  width: 70%;
  text-align: center;
  color: var(--font-color);
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
  width: 100%;
  height: 100%;
  border: none;
}
.checkoutButton {
  background-color: var(--accent-color);
}
</style>
