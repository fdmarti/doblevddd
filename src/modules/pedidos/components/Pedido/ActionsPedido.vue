<template>
  <div class="mx-auto max-w-4xl">
    <form @submit.prevent="onHandleChangeItemsState">
      <section class="flex gap-3">
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Mover de</span>
          </div>
          <select
            class="select select-bordered"
            id="dropdown-current-state-item"
            v-model="formDataChangeState.estadoAnterior"
          >
            <option disabled selected value="">Seleccionar una opción</option>
            <option v-for="state in arrayStates" :key="state.value" :value="state.value">
              {{ state.text }}
            </option>
          </select>
        </label>

        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Cantidad de productos</span>
          </div>
          <input
            type="number"
            step="1"
            placeholder="0"
            id="cantidad-productos-items"
            class="input input-bordered w-full max-w-xs text-right"
            v-model="formDataChangeState.cantidad"
          />
        </label>

        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">A</span>
          </div>
          <select
            class="select select-bordered"
            id="dropdown-new-state-item"
            v-model="formDataChangeState.estadoNuevo"
          >
            <option disabled selected value="">Seleccionar una opción</option>
            <option v-for="state in arrayStates" :key="state.value" :value="state.value">
              {{ state.text }}
            </option>
          </select>
        </label>
      </section>
      <div class="flex justify-end mt-2">
        <DButton color="primary" type="submit">Confirmar</DButton>
      </div>
    </form>
    <DividerComponent />
    <form @submit.prevent="onHandleDeleteItems">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="text-lg font-semibold">Cantidad de productos con errores</span>
        </div>
        <input
          type="number"
          step="1"
          placeholder="0"
          class="input input-bordered w-full max-w-xs text-right"
          v-model="formDataErrores.cantidad"
          id="cantidad-errores-pedido"
        />
      </label>
      <div class="flex justify-end mt-2">
        <DButton color="error" type="submit">Guardar error</DButton>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { arrayStates } from '@pedidos/utils';
import { useChangeItemsState } from '@pedidos/composables/useChangeItemsState';

interface Props {
  itemid: string;
}

const props = defineProps<Props>();

const { formDataChangeState, formDataErrores, onHandleChangeItemsState, onHandleDeleteItems } =
  useChangeItemsState(props.itemid);
</script>
