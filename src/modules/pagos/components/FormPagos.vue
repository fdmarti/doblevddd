<template>
  <section>
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

      <button type="submit" class="btn btn-info">Confirmar</button>
    </form>
  </section>
</template>
<script lang="ts" setup>
import { useFormPagos } from '@pagos/composables/useFormPagos';
import { usePagosStore } from '@pagos/store/pagosStore';

const pagosStore = usePagosStore();

interface Props {
  pedidoId: string;
}

const props = defineProps<Props>();

const { formDatePago, onHandleSubmitFormPago } = useFormPagos(props.pedidoId);
</script>
