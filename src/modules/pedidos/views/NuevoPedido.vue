<template>
  <ul class="steps w-full steps-pedido">
    <li :class="['step', currentStep >= 0 && 'step-primary']">Elegir productos</li>
    <li :class="['step', currentStep >= 1 && 'step-primary']">Datos del cliente</li>
    <li :class="['step', currentStep >= 2 && 'step-primary']">Confirmar pedido</li>
  </ul>

  <div v-if="currentStep === 0" class="w-full text-center p-10">
    <ProductosList />
    <SideBarPedido />
  </div>
  <div v-if="currentStep === 1" class="w-full text-center p-10">
    <FormClientePedido />
  </div>
  <div v-if="currentStep === 2" class="w-full text-center p-10">
    <ConfirmarPedido />
  </div>

  <label
    for="cart-new-pedido"
    v-if="currentStep === 0 && pedidosStore.newPedido.productos.length > 0"
    class="btn btn-circle fixed right-10 bottom-10 btn-primary"
  >
    <CartIcon />
  </label>

  <section class="flex justify-between">
    <button class="btn btn-outline" :disabled="currentStep === 0" @click="prevStep">Volver</button>
    <button class="btn btn-outline" @click="nextStep" v-if="currentStep !== maxSteps">
      Siguiente
    </button>
    <button
      class="btn btn-primary"
      @click="confirmarPedido"
      v-else
      :disabled="pedidosStore.isSaving"
    >
      <LoadingSpinner v-if="pedidosStore.isSaving" />
      <span v-else>Confirmar Pedido</span>
    </button>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSteps } from '@pedidos/composables/useSteps';
import ProductosList from '@productos/components/ProductosList.vue';
import { usePedidosStore } from '@pedidos/store/pedidosStore';
import { FormClientePedido, ConfirmarPedido, SideBarPedido } from '@pedidos/components';
import { CartIcon } from '@common/components/icons';
import { LoadingSpinner } from '@common/components/Loading';

import { Toast } from '@utils/index';

const pedidosStore = usePedidosStore();
const { currentStep, maxSteps, nextStep, prevStep } = useSteps(2);

const router = useRouter();

const confirmarPedido = async () => {
  const result = await pedidosStore.confirmNewPedido();

  if (result.status) {
    Toast.success('Pedido generado');
    router.replace({ name: 'pedido', params: { id: result.id } });
  }
};
</script>
