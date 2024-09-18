<template>
  <TitleComponent text="Historial de Pedidos">
    <template #action>
      <label class="input input-bordered flex items-center gap-2">
        Fecha
        <input
          type="month"
          class="grow"
          placeholder="04/02/2024"
          v-model="historialPeidoStore.filterFormDate"
        />
      </label>
    </template>
  </TitleComponent>

  <section class="flex justify-center my-6 gap-x-7">
    <CheckboxArrayComponent
      v-for="check in checkValues"
      :key="check"
      :checked="true"
      :text="check"
      :values="historialPeidoStore.filterOptions"
      :id="check"
    />
  </section>

  <TableComponent
    :arr-length="historialPeidoStore.pedidosHistorial.length"
    :is-loading="pedidosStore.isLoading"
    :table-head-arr="thPedidoHistorial"
  >
    <template #tbody>
      <tbody>
        <tr v-for="pedido in historialPeidoStore.pedidosHistorial" :key="pedido.id">
          <th>#{{ pedido.id }}</th>
          <td>{{ pedido.cliente }}</td>
          <td>{{ pedido.contacto }}</td>
          <td>{{ pedido.fechacreacion }}</td>
          <td>
            <span class="stat-value text-base"> {{ pedido.productos }}</span>
          </td>
          <td>
            <div class="stat">
              <div class="text-lg stat-value">{{ formatCurrency(pedido.preciototal) }}</div>
              <div class="stat-desc">Seña: {{ formatCurrency(pedido.senia) }}</div>
            </div>
          </td>
          <td>
            <span class="stat-value text-sm"> {{ pedido.estado }}</span>
          </td>
          <td>
            <RouterLink :to="{ name: 'pedido', params: { id: pedido.id } }" class="btn btn-outline">
              Detalle
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </template>
  </TableComponent>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { TitleComponent } from '@common/components/Text';
import { CheckboxArrayComponent } from '@common/components/Inputs';

import { usePedidosStore } from '@pedidos/store/pedidosStore';
import { formatCurrency } from '@/utils/numbers/format-currency';
import { useHistorialPedidoStore } from '@historial/store';
import { checkValues } from '@historial/utils/pedido-filtro-utils';

const thPedidoHistorial = [
  'Codigo',
  'Cliente',
  'Contacto',
  'Fecha creación',
  'Cantidad productos',
  'Precio Total',
  'Estado',
  'Acciones',
];

const pedidosStore = usePedidosStore();
const historialPeidoStore = useHistorialPedidoStore();

onMounted(async () => {
  await pedidosStore.getPedidos();
});
</script>
