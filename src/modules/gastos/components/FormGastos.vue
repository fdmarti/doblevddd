<template>
  <dialog id="modal-form-extra" class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-blue-300 pb-5">
        <h2 class="text-xl font-bold">Nuevo gasto</h2>
      </div>
      <div class="my-5">
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
          <label class="input input-bordered flex items-center gap-2">
            <input
              type="text"
              placeholder="Descripción"
              class="grow"
              id="gasto-description"
              name="gasto-description"
              autocomplete="name"
              v-model="formGasto.descripcion"
            />
          </label>

          <select
            class="select select-bordered w-full"
            name="tipo-gasto"
            id="tipo-gasto"
            v-model="formGasto.tipo"
          >
            <option disabled selected value="">Seleccionar un tipo</option>
            <option v-for="tipo in tiposGastos" :key="tipo.value" :value="tipo.value">
              {{ tipo.text }}
            </option>
          </select>

          <label class="input input-bordered flex items-center gap-2">
            <DolarIcon />
            <input
              type="number"
              placeholder="0"
              class="grow text-right"
              step=".01"
              id="gasto-precio"
              name="gasto-precio"
              v-model="formGasto.monto"
            />
          </label>

          <div class="border-t border-t-blue-300 pt-5 flex items-center justify-between">
            <button @click="closeGastosPopup" class="btn btn-error" type="button">Cancelar</button>
            <button class="btn btn-success" :disabled="isSaving" type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </dialog>
  <BackgroundModal v-if="open" />
</template>
<script lang="ts" setup>
import BackgroundModal from '@common/components/content/BackgroundModal.vue';
import { DolarIcon } from '@common/components/icons';
import { InitialGastoState, tiposGastos } from '@gastos/utils';
import { useGastosForm } from '../composables/useGastosForm';

const { formGasto, isSaving, handleClearForm, handleGastoFormSubmit } =
  useGastosForm(InitialGastoState);

interface Props {
  open: boolean;
}

defineProps<Props>();
const emits = defineEmits(['close']);

const handleSubmit = async () => {
  const result = await handleGastoFormSubmit();

  if (result) {
    closeGastosPopup();
  }
};

const closeGastosPopup = () => {
  handleClearForm();
  emits('close');
};
</script>
