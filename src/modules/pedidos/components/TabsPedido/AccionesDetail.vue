<template>
  <section class="flex flex-col">
    <div class="flex justify-between items-center">
      <p>Generar Factura</p>
      <FacturaView :pedido="pedidoStore.pedido" />
    </div>
    <DividerComponent />
    <div class="flex justify-between items-center">
      <p>Entregar pedido</p>
      <DButton
        @click="handleEntregarPaquete"
        color="primary"
        :disabled="pedidoStore.pedidoEstadoActual != 'TERMINADO'"
      >
        Entregar
      </DButton>
    </div>
    <DividerComponent />
    <div class="flex justify-between items-center" v-if="pedidoStore.isAvailable">
      <p>Cancelar Pedido</p>
      <DButton @click="toggleCancelPedido" color="error">Cancelar</DButton>
    </div>
  </section>

  <CancelPedidoModal :open="cancelPedido" @close="toggleCancelPedido" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from '@/utils';

import CancelPedidoModal from '@pedidos/components/Popups/CancelPedidoModal.vue';
import FacturaView from '@factura/view/FacturaView.vue';
import { usePedidosStore } from '@pedidos/store/pedidosStore';

const cancelPedido = ref(false);
const router = useRouter();

const pedidoStore = usePedidosStore();

const handleEntregarPaquete = async () => {
  const result = await pedidoStore.entregarPedido();

  if (!result) {
    Toast.error('Ocurrio un error');
    return;
  }

  Toast.success('Pedido entregado');
  router.replace({ name: 'list-pedidos' });
};

const toggleCancelPedido = () => {
  cancelPedido.value = !cancelPedido.value;
};
</script>
