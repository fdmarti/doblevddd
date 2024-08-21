<template>
  <section class="flex flex-col">
    <div>
      <FacturaView :pedido="pedidoStore.pedido" />
    </div>
    <div class="divider"></div>
    <div>
      <button class="btn btn-error" @click="toggleCancelPedido">Cancelar pedido</button>
    </div>
  </section>

  <CancelPedidoModal :open="cancelPedido" @close="cancelPedido = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CancelPedidoModal from '@pedidos/components/Popups/CancelPedidoModal.vue';
import FacturaView from '@factura/view/FacturaView.vue';
import { usePedidosStore } from '@pedidos/store/pedidosStore';

const cancelPedido = ref(false);

const pedidoStore = usePedidosStore();

const toggleCancelPedido = () => {
  cancelPedido.value = true;
};
</script>
