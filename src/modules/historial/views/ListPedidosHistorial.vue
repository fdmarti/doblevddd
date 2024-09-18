<template>
  <TitleComponent text="Historial de Pedidos" />

  <TableComponent
    :arr-length="pedidosStore.pedidosAll.length"
    :is-loading="pedidosStore.isLoading"
    :table-head-arr="thPedidoHistorial"
  >
    <template #tbody>
      <tbody>
        <tr v-for="pedido in pedidosStore.pedidosAll" :key="pedido.id">
          <th>#{{ pedido.id }}</th>
          <td>{{ pedido.cliente }}</td>
          <td>{{ pedido.contacto }}</td>
          <td>{{ pedido.fechacreacion }}</td>
          <td>{{ pedido.productos }}</td>
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
import { TitleComponent } from '@common/components/Text';
import { onMounted } from 'vue';

import { usePedidosStore } from '@pedidos/store/pedidosStore';
import { formatCurrency } from '@/utils/numbers/format-currency';

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

onMounted(async () => {
  await pedidosStore.getPedidos();
});
</script>
