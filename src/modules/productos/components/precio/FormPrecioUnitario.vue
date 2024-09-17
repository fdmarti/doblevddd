<template>
  <div>
    <DividerComponent text="Precio unitario" />
    <form
      @submit.prevent="handleSubmitFormPrecio"
      class="max-w-lg flex flex-col gap-3 mx-auto items-end"
    >
      <label class="input input-bordered flex items-center gap-2 w-full">
        Precio unitario
        <input
          type="number"
          step="0.01"
          placeholder="$ 0"
          class="grow text-right"
          id="precioUnitario"
          name="precioUnitario"
          v-model="preciounitario"
          :disabled="precioStore.isSaving"
        />
      </label>
    </form>
    <div class="max-w-lg flex flex-row-reverse justify-between gap-3 mx-auto items-end mt-5">
      <DButton
        :disabled="precioStore.isSaving"
        :is-loading="precioStore.isSaving"
        @click="handleSubmitFormPrecio"
      >
        Actualizar precio
      </DButton>
      <DButton
        :disabled="precioStore.isSaving"
        :is-loading="precioStore.isSaving"
        color="warning"
        @click="handleSubmitFormPrecioSugerido"
      >
        Actualizar precio por sugerido
      </DButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { DividerComponent } from '@common/components/content';
import { DButton } from '@common/components/Buttons';

import { usePrecioStore } from '@productos/store/preciosStore';
import { useFormPrecio } from '@productos/composables';

import type { Precio } from '@productos/interfaces/producto.response';

interface Props {
  precio: Precio;
}

const props = defineProps<Props>();

const precioStore = usePrecioStore();
const { handleSubmitFormPrecio, handleSubmitFormPrecioSugerido, preciounitario } = useFormPrecio(
  props.precio,
);
</script>
