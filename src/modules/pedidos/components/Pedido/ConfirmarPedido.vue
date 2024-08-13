<template>
  <TitleComponent text="Confirmar pedido" />

  <section class="text-left flex justify-between">
    <span class="text-xl font-semibold">Cliente : {{ pedidosStore.newPedido.cliente }}</span>
    <span class="text-lg font-semibold">Contacto : {{ pedidosStore.newPedido.contacto }}</span>
  </section>

  <div class="divider"></div>

  <section class="text-left">
    <div class="overflow-x-auto">
      <table class="table table-xs">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Descripción</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(producto, index) in pedidosStore.newPedido.productos" :key="index">
            <tr v-for="(produ, indexbi) in producto.cantidad" :key="indexbi">
              <th># {{ producto.id }}</th>
              <td>{{ producto.descripcion }}</td>
              <td>{{ producto.categoria }}</td>
              <td>$ {{ producto.preciounitario }}</td>
              <td>
                <input
                  type="number"
                  class="input input-bordered text-right"
                  step="0.1"
                  placeholder="0"
                />
              </td>
              <td>
                <input type="text" class="input input-bordered" placeholder="Observaciones" />
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr class="bg-base-100">
            <td colspan="5" class="text-right font-bold text-xl">Total</td>
            <td class="font-bold text-xl">$ 10000</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { TitleComponent } from '@common/components';
import { usePedidosStore } from '@pedidos/store/pedidosStore';

const pedidosStore = usePedidosStore();
</script>
