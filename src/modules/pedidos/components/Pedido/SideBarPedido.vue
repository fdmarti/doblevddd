<template>
  <div class="drawer drawer-end">
    <input id="cart-new-pedido" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
      <label for="cart-new-pedido" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <TitleComponent text="Nuevo Pedido" />
        <div
          v-for="producto in pedidosStore.newPedido.productos"
          :key="producto.itemId"
          class="flex flex-col justify-start text-left gap-1 p-2 mb-5"
        >
          <section class="flex justify-between items-center">
            <label class="font-semibold" :for="`input-cantidad-pedido-${producto.itemId}`">
              {{ producto.descripcion }}
            </label>
            <button
              class="btn btn-square btn-sm"
              @click="onHandleDeleteProductoInPedido(producto.itemId)"
            >
              <TrashIcon :size="20" />
            </button>
          </section>
          <input
            type="number"
            step="1"
            placeholder="Cantidad"
            v-model="producto.cantidad"
            :id="`input-cantidad-pedido-${producto.itemId}`"
            class="input input-sm w-full text-right"
            @blur="validateCantidadAmount(producto)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePedidosStore } from '@pedidos/store/pedidosStore';
import { TrashIcon } from '@common/components/icons';
import { TitleComponent } from '@common/components';
import type { Producto } from '@pedidos/interfaces/NuevoPedido';

const pedidosStore = usePedidosStore();

const onHandleDeleteProductoInPedido = (itemId: string) => {
  pedidosStore.newPedido.productos = pedidosStore.newPedido.productos.filter(
    (prod) => prod.itemId !== itemId,
  );
};

const validateCantidadAmount = (producto: Producto) => {
  if (producto.cantidad < 1 || isNaN(producto.cantidad)) {
    producto.cantidad = 1;
  }
};
</script>
