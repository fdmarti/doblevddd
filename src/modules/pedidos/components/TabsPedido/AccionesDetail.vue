<template>
  <section class="flex flex-col">
    <div class="flex justify-between items-center">
      <p>Generar Factura</p>
      <FacturaView :pedido="pedidoStore.pedido" />
    </div>
    <div class="divider"></div>
    <div class="flex justify-between items-center">
      <p>Entregar pedido</p>
      <DButton @click="pedidoStore.entregarPedido()" color="primary">Entregar</DButton>
    </div>
    <div class="divider"></div>
    <div class="flex justify-between items-center">
      <p>Cancelar Pedido</p>
      <DButton @click="toggleCancelPedido" color="error">Cancelar</DButton>
    </div>
  </section>

  <CancelPedidoModal :open="cancelPedido" @close="cancelPedido = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CancelPedidoModal from '@pedidos/components/Popups/CancelPedidoModal.vue';
import FacturaView from '@factura/view/FacturaView.vue';
import { DButton } from '@common/components/Buttons';
import { usePedidosStore } from '@pedidos/store/pedidosStore';

const cancelPedido = ref(false);

const pedidoStore = usePedidosStore();

const toggleCancelPedido = () => {
  cancelPedido.value = true;
};
</script>
