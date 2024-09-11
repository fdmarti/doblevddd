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
          <td>
            <p>{{ producto.descripcion }}</p>
          </td>
          <td>
            <span class="text-2xl font-bold">{{ producto.cantidad }}</span>
          </td>
          <td>{{ producto.observaciones }}</td>
          <td>
            <StatBlock
              text="Precio"
              :value="producto.precioUnitarioFinal ? `$ ${producto.precioUnitarioFinal}` : 0"
            >
              <template #desc v-if="producto.descuentoTotal">
                ↘︎ $ {{ producto.preciounitario }} (% {{ producto.descuentoTotal }})
              </template>
            </StatBlock>
          </td>
          <td>
            <StatBlock text="" :value="`$ ${producto.precioTotal}`" />
          </td>
        </tr>
      </tbody>
    </template>
    <template #tfoot>
      <tr class="bg-base-100 text-lg">
        <td colspan="5" class="uppercase font-bold">Total</td>
        <td colspan="1" class="font-bold">
          <StatBlock text="" :value="`$ ${pedidoStore.costoTotalPedido}`" />
        </td>
      </tr>
    </template>
  </TableComponent>
</template>
<script lang="ts" setup>
import { TitleComponent, StatBlock } from '@common/components/Text';
import { usePedidosStore } from '@pedidos/store/pedidosStore';
import { TableComponent } from '@common/components/Table';

const pedidoStore = usePedidosStore();

const confirmPedidoTh = [
  'Codigo',
  'Descripción',
  'Cantidad',
  'Observación',
  'Precio unitario final',
  'Precio Total',
];
</script>
