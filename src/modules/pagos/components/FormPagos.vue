<template>
  <section v-if="pedidosStore.isAvailable">
    <h2>Agregar pago</h2>
    <form
      @submit.prevent="onHandleSubmitFormPago"
      class="max-w-xl mx-auto flex flex-col gap-2 items-end"
    >
      <div class="flex items-center justify-center w-full gap-5">
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Medio de pago</span>
          </div>
          <select class="select select-bordered" id="medio-pago" v-model="formDatePago.idMedioPago">
            <option disabled selected value="0">Seleccionar un medio de pago</option>
            <option
              v-for="mediopago in pagosStore.mediosPagos"
              :key="mediopago.id"
              :value="mediopago.id"
            >
              {{ mediopago.descripcion }}
            </option>
          </select>
        </label>

        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Monto</span>
          </div>
          <input
            v-model="formDatePago.monto"
            type="number"
            step=".01"
            id="pago-monto"
            placeholder="$ 0"
            class="input input-bordered w-full max-w-xs text-right"
          />
        </label>
      </div>

      <section class="flex justify-between w-full mt-2">
        <DButton color="warning" :disabled="isAllProductPaid" @click="onHandlePagarTotal">
          Pagar Total
        </DButton>
        <DButton
          :type="isAllProductPaid ? 'button' : 'submit'"
          color="info"
          :disabled="isAllProductPaid"
        >
          Confirmar
        </DButton>
      </section>
      <p class="italic text-sm mt-1 text-error" v-if="isAllProductPaid">
        *El producto esta pagado en su totalidad*
      </p>
    </form>
    <DividerComponent />
  </section>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useFormPagos } from '@pagos/composables/useFormPagos';
import { usePagosStore } from '@pagos/store/pagosStore';
import { usePedidosStore } from '@pedidos/store/pedidosStore';

const pagosStore = usePagosStore();
const pedidosStore = usePedidosStore();

interface Props {
  pedidoId: string;
}

const props = defineProps<Props>();

const { formDatePago, onHandleSubmitFormPago, onHandlePagarTotal } = useFormPagos(props.pedidoId);

const isAllProductPaid = computed(() => {
  return pagosStore.precioRestanteAPagar ? false : true;
});
</script>
