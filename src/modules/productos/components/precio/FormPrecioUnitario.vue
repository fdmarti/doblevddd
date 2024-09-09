<template>
  <TitleDividerComponent title="Precio unitario" />
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
        v-model="precioForm.preciounitario"
        :disabled="precioStore.isSaving"
      />
    </label>

    <label class="input input-bordered flex items-center gap-2 w-full">
      Costo total
      <input
        type="number"
        step="0.01"
        placeholder="$ 0"
        class="grow text-right"
        id="costototal"
        name="costototal"
        readonly
        v-model="precioForm.costototal"
      />
    </label>
    <ButtonSuccess
      type="submit"
      :disabled="precioStore.isSaving"
      :is-loading="precioStore.isSaving"
    >
      Actualizar precio
    </ButtonSuccess>
  </form>
</template>
<script lang="ts" setup>
import { TitleDividerComponent } from '@common/components/Text';
import { ButtonSuccess } from '@common/components/Buttons';

import { usePrecioStore } from '@productos/store/preciosStore';
import { useFormPrecio } from '@productos/composables/useFormPrecio';

import type { Precio } from '@productos/interfaces/producto.response';

interface Props {
  precio: Precio;
}

const props = defineProps<Props>();

const precioStore = usePrecioStore();
const { handleSubmitFormPrecio, precioForm } = useFormPrecio(props.precio);
</script>
