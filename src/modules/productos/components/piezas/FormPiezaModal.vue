<template>
  <PopupComponent :open="open" id="modal-form-pieza" title="Pieza">
    <template #body>
      <div class="my-5">
        <form @submit.prevent="handlePiezaForm" class="flex flex-col gap-2">
          <label class="input input-bordered flex items-center gap-2">
            <input
              type="text"
              placeholder="Nombre de la pieza"
              class="grow"
              id="pieza-description"
              name="pieza-description"
              autocomplete="name"
              v-model="formData.descripcion"
            />
            <PuzzleIcon />
          </label>
          <section class="flex justify-between">
            <label class="input input-bordered flex items-center gap-2">
              <input
                type="number"
                placeholder="Horas"
                class="grow"
                id="pieza-hours"
                name="pieza-hours"
                v-model="formData.horas"
              />
            </label>
            <label class="input input-bordered flex items-center gap-2">
              <input
                type="number"
                placeholder="Minutos"
                class="grow"
                id="pieza-minutes"
                name="pieza-minutes"
                v-model="formData.minutos"
              />
            </label>
          </section>
          <label class="input input-bordered flex items-center gap-2">
            <input
              type="number"
              placeholder="Peso (En g)"
              class="grow"
              id="pieza-weight"
              name="pieza-weight"
              v-model="formData.peso"
            />
          </label>
          <div class="border-t border-t-gray-600 pt-4 flex items-center justify-between">
            <DButton color="error" @click="emits('close')">Cancelar</DButton>
            <DButton color="success" type="submit">Confirmar</DButton>
          </div>
        </form>
      </div>
    </template>
  </PopupComponent>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

import { Toast } from '@utils/index';
import type { Pieza } from '@productos/interfaces/Pieza';
import { PuzzleIcon } from '@common/components/icons';
import { PopupComponent } from '@common/components/Popup';
import { DButton } from '@common/components/Buttons';

interface Props {
  open: boolean;
  piezaEdit?: Pieza;
}

defineProps<Props>();
const emits = defineEmits(['close', 'savePieza']);

const piezaInitialState = {
  descripcion: '',
  horas: null,
  minutos: null,
  peso: null,
};

const formData = reactive<Pieza>({ ...piezaInitialState });

const handlePiezaForm = () => {
  if (formData.descripcion.trim().length <= 3) {
    Toast.error('El nombre de la pieza debe ser mayor a 3');
    return;
  }

  if (formData.horas?.toString.length === 0 || formData.horas! < 0) {
    Toast.error('Debe ingresar un numero de horas validas');
    return;
  }

  if (formData.minutos?.toString.length === 0 || formData.minutos! < 0) {
    Toast.error('Debe ingresar un numero de minutos validos');
    return;
  }

  if (!formData.peso) {
    Toast.error('Debe ingresar un numero de peso valido.');
    return;
  }

  emits('savePieza', formData);
  Object.assign(formData, piezaInitialState);
};
</script>
