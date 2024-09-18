<template>
  <DividerComponent />
  <div class="max-w-lg mx-auto mb-5">
    <section class="flex justify-center w-full">
      <div class="stats stats-vertical lg:stats-horizontal shadow">
        <StatBlock text="Errores" :value="detalle.errores" color="text-error" />
      </div>
    </section>
    <DividerComponent />
    <form @submit.prevent="onHandleErroresItems">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="text-lg font-semibold">Cantidad de productos con errores</span>
        </div>
        <input
          type="number"
          step="1"
          placeholder="0"
          :disabled="!pedidoStore.isAvailable"
          class="input input-bordered w-full max-w-xs text-right"
          v-model="formDataErrores.cantidad"
          id="cantidad-errores-pedido"
        />
      </label>
      <div class="flex justify-end mt-2" v-if="pedidoStore.isAvailable">
        <DButton color="error" type="submit">Guardar error</DButton>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { useChangeItemsState } from '@pedidos/composables/useChangeItemsState';
import { usePedidosStore } from '@pedidos/store/pedidosStore';
import { StatBlock } from '@common/components/Text';

import type { Detalle } from '@pedidos/interfaces';

const pedidoStore = usePedidosStore();

interface Props {
  detalle: Detalle;
  itemid: string;
}

const props = defineProps<Props>();

const { formDataErrores, onHandleErroresItems } = useChangeItemsState(props.itemid);
</script>
