<template>
  <div class="mainContentAdmin">

  </div>
  <div class="adminWrapper">

    <button class="logoutButton" @click="logout"> Salir </button>

    <div class="adminCard">
      <h2>Agregar Articulo</h2>

      <form class="adminForm" @submit.prevent="addProduct">
        <input v-model="name" type="text" placeholder="Nombre del producto" required/>
        <input v-model.number="price" type="number" step="0.01" placeholder="Precio" required />
        <input v-model="image_url" type="text" placeholder="URL de imagen" />
        <input v-model.number="barcode_value" type="number" placeholder="Código de barras" />
        <button class="accentButton" type="submit" :disabled="loading"> {{ loading ? "Guardando..." : "Guardar" }} </button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </div>

    <div class="adminCard">
      <h2>Productos existentes</h2>

      <div v-if="products.length === 0" class="empty"> No hay productos agregados. </div>

      <div class="productsGrid">
        <div v-for="item in products" :key="item.id" class="productCard">
          <strong>{{ item.name }}</strong>
          <p>$ {{ item.price }}</p>
          <small>Código: {{ item.barcode_value }}</small>

          <button class="deleteButton" @click="deleteProduct(item.id)"> Eliminar </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/supabase";

const router = useRouter();

const name = ref("");
const price = ref<number | null>(null);
const image_url = ref("");
const barcode_value = ref<number | null>(null);

const loading = ref(false);
const error = ref("");
const success = ref("");
const products = ref<any[]>([]);

const loadProducts = async () => {
  const { data, error: fetchError } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (!fetchError) {
    products.value = data || [];
  }
};

const addProduct = async () => {
  loading.value = true;
  error.value = "";
  success.value = "";

  const { error: insertError } = await supabase.from("products").insert([
    {
      name: name.value,
      price: price.value,
      image_url: image_url.value,
      barcode_value: barcode_value.value,
    },
  ]);

  loading.value = false;

  if (insertError) {
    error.value = insertError.message;
    return;
  }

  success.value = "Artículo agregado correctamente";

  name.value = "";
  price.value = null;
  image_url.value = "";
  barcode_value.value = null;

  loadProducts();
};

const deleteProduct = async (id: number) => {
  const { error: deleteError } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (!deleteError) {
    products.value = products.value.filter((p) => p.id !== id);
  }
};

const logout = async () => {
  await supabase.auth.signOut();
  router.push("/"); 
};

onMounted(() => {
  loadProducts();
});
</script>

<style scoped>

.logoutButton {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #ff4d4d;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.adminWrapper {
  position: relative;
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  align-items: flex-start;
}

@media (max-width: 768px) {
  .adminWrapper {
    flex-direction: column;
    height: auto;
  }

  .logoutButton {
    position: static;
    width: 100%;
    margin-bottom: 20px;
  }
}

.adminCard {
  flex: 1;
  background: var(--secondary-color);
  color: var(--font-color);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 10px #0004;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.adminForm {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  background: #ffffff12;
  color: var(--font-color);
}

.accentButton {
  background-color: var(--accent-color);
  color: var(--font-color);
  padding: 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.productsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  margin-top: 12px;
  overflow-y: auto;
}

.productCard {
  background: #ffffff0d;
  padding: 12px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.deleteButton {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
}

.empty {
  opacity: 0.7;
  margin-top: 10px;
  text-align: center;
}

.error {
  margin-top: 10px;
  color: #ff4d4d;
}

.success {
  margin-top: 10px;
  color: #4caf50;
}
</style>