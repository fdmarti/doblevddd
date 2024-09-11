<template>
  <ul class="steps w-full steps-pedido">
    <li :class="['step', currentStep >= 0 && 'step-primary']">Elegir productos</li>
    <li :class="['step', currentStep >= 1 && 'step-primary']">Datos del cliente</li>
    <li :class="['step', currentStep >= 2 && 'step-primary']">Observaciones y descuentos</li>
    <li :class="['step', currentStep >= 3 && 'step-primary']">Confirmar pedido</li>
  </ul>

  <div v-if="currentStep === 0" class="w-full text-center p-7">
    <ProductosList />
    <SideBarPedido />
  </div>
  <div v-if="currentStep === 1" class="w-full text-center p-7">
    <FormClientePedido />
  </div>
  <div v-if="currentStep === 2" class="w-full text-center p-7">
    <ObservacionesDescuentosPedido />
  </div>
  <div v-if="currentStep === 3" class="w-full text-center p-7">
    <LoadingComponent v-if="pedidosStore.isLoading" />
    <ConfirmarPedido v-else />
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

    <DButton :is-loading="pedidosStore.isSaving" :color="`primary`" @click="confirmarPedido" v-else>
      Confirmar Pedido
    </DButton>
  </section>
</template>

<script setup lang="ts">
import { onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useSteps } from '@pedidos/composables/useSteps';
import ProductosList from '@productos/components/ProductosList.vue';
import { usePedidosStore } from '@pedidos/store/pedidosStore';
import {
  FormClientePedido,
  ObservacionesDescuentosPedido,
  SideBarPedido,
  ConfirmarPedido,
} from '@pedidos/components';
import { CartIcon } from '@common/components/icons';
import { LoadingComponent } from '@common/components/Loading';
import { DButton } from '@common/components/Buttons';

import { Toast } from '@utils/index';

const pedidosStore = usePedidosStore();
const { currentStep, maxSteps, nextStep, prevStep } = useSteps(3);

const router = useRouter();

const confirmarPedido = async () => {
  const result = await pedidosStore.confirmNewPedido();

  if (result.status) {
    Toast.success('Pedido generado');
    router.replace({ name: 'pedido', params: { id: result.id } });
  }
};

watch(currentStep, async () => {
  if (currentStep.value === 3) {
    await pedidosStore.generatePreVenta();
  }
});

onUnmounted(() => {
  pedidosStore.resetNewPedido();
});
</script>
