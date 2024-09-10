<template>
  <TitleComponent text="Confirmar pedido" />
  <section class="flex justify-between">
    <p class="text-2xl font-semibold">Cliente : {{ pedidoStore.newPedido.cliente }}</p>
    <p class="text-2xl font-semibold">Contacto : {{ pedidoStore.newPedido.contacto }}</p>
  </section>

  <div class="divider"></div>

  <TableComponent
    :arr-length="pedidoStore.newPedido.productos.length"
    :is-loading="pedidoStore.isLoading"
    :table-head-arr="confirmPedidoTh"
  >
    <template #tbody>
      <tbody>
        <tr v-for="(producto, index) in pedidoStore.newPedido.productos" :key="index">
          <th># {{ index + 1 }}</th>
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.cantidad }}</td>
          <td>{{ producto.observaciones }}</td>
          <td>$ {{ producto.preciounitario }}</td>
          <td>$ {{ producto.precioTotal }}</td>
        </tr>
      </tbody>
    </template>
    <template #tfoot>
      <tr class="bg-base-100 text-lg">
        <td colspan="5" class="uppercase font-bold">Total</td>
        <td colspan="1" class="font-bold">$ {{ pedidoStore.costoTotalPedido }}</td>
      </tr>
    </template>
  </TableComponent>
</template>
<script lang="ts" setup>
import { TitleComponent } from '@common/components/Text';
import { usePedidosStore } from '@pedidos/store/pedidosStore';
import { TableComponent } from '@common/components/Table';

const pedidoStore = usePedidosStore();

const confirmPedidoTh = [
  'Codigo',
  'Descripción',
  'Cantidad',
  'Observación',
  'Precio unitario',
  'Precio Total',
];
</script>
