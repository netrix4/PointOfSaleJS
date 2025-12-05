<template>
  <div class="mainWrapper">
    <div class="mainContentReports">
      <h1 class="title">Reporte de Ventas</h1>

      <div class="filters">
        <div class="input-group">
          <label>Desde</label>
          <input type="date" v-model="from" />
        </div>

        <div class="input-group">
          <label>Hasta</label>
          <input type="date" v-model="to" />
        </div>
        <button class="accentButton" @click="loadReport">Cargar Reporte</button>
        <button
          class="accentButton secondary"
          @click="generatePDF"
          :disabled="loading"
        >
          {{ loading ? "Generando..." : "Exportar PDF" }}
        </button>
      </div>

      <div class="table-wrapper" v-if="sales.length > 0">
        <table>
          <thead>
            <tr>
              <th>ID Venta</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Productos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sale in sales" :key="sale.id">
              <td>{{ sale.id }}</td>
              <td>{{ formatDate(sale.created_at) }}</td>
              <td>$ {{ sale.total }}</td>
              <td>{{ sale.products_ids.length }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="no-data">No hay datos en el rango seleccionado</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReportStore } from "@/stores/storeReport";

const { from, to, loading, sales, loadReport, generatePDF, formatDate } =
  useReportStore();
</script>

<style scoped>
.mainWrapper {
  width: 90%;
  height: 98%;
  border: 10px solid var(--secondary-color);

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
}

.mainContentReports {
  width: 95%;
  height: 95%;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.filters {
  display: flex;
  gap: 20px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

input[type="date"] {
  padding: 10px;
  border-radius: 8px;
  background: var(--terciary-color);
  color: white;
  border: none;
}

.accentButton {
  background-color: var(--accent-color);
  color: white;
  padding: 10px 15px;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  transition: 0.2s ease;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--primary-color);
  border-radius: 10px;
  overflow: hidden;
}

th,
td {
  border: 1px solid #333;
  padding: 12px;
  text-align: center;
}

th {
  background: var(--terciary-color);
}

.no-data {
  text-align: center;
  color: var(--terciary-color);
  font-size: 18px;
}
</style>
