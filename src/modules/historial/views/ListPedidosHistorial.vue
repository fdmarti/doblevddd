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
          <td>{{ pedido.estado }}</td>
          <td>
            <RouterLink :to="{ name: 'pedido', params: { id: pedido.id } }" class="btn btn-outline"
              >Detalle
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

const thPedidoHistorial = [
  'Codigo',
  'Cliente',
  'Contacto',
  'Fecha creación',
  'Cantidad productos',
  'Estado',
  'Acciones',
];

const pedidosStore = usePedidosStore();

onMounted(async () => {
  await pedidosStore.getPedidos();
});
</script>
