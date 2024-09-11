<template>
  <TitleComponent text="Observaciones y descuentos" />

  <TableComponent
    :arr-length="pedidosStore.newPedido.productos.length"
    :is-loading="false"
    :table-head-arr="obsDesTh"
  >
    <template #tbody>
      <tbody>
        <tr v-for="(producto, index) in pedidosStore.newPedido.productos" :key="index">
          <th># {{ index + 1 }}</th>
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.cantidad }}</td>
          <td>$ {{ producto.preciounitario }}</td>
          <td>
            <div class="flex items-center justify-center gap-5">
              <input
                type="number"
                class="input input-bordered text-right"
                step="0.1"
                placeholder="0"
                :id="`producto-descuento-${index}`"
                v-model="producto.descuentoAdicional"
              />

              <input
                type="checkbox"
                class="checkbox checkbox-primary tooltip"
                data-tip="Acumular descuento"
                :id="`check-acumular-descuento-${index}`"
                v-model="producto.sumarDescuento"
              />
            </div>
          </td>
          <td>
            <input
              type="text"
              class="input input-bordered"
              placeholder="Observaciones"
              :id="`producto-observaciones-${index}`"
              v-model="producto.observaciones"
            />
          </td>
        </tr>
      </tbody>
    </template>
  </TableComponent>
</template>
<script lang="ts" setup>
import { TitleComponent } from '@common/components';
import { usePedidosStore } from '@pedidos/store/pedidosStore';
import { TableComponent } from '@common/components/Table';

const pedidosStore = usePedidosStore();

const obsDesTh = ['Codigo', 'Descripción', 'Cantidad', 'Precio', 'Descuento', 'Observación'];
</script>
