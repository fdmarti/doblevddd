<template>
  <PopupComponent id="modal-delete-gasto" :open="open" title="Confirmar eliminar Gasto">
    <template #body>
      <div class="my-5">
        <p class="text-lg font-semibold text-center pb-5">
          ¿Seguro que queres eliminar el gasto # {{ deletedGasto }}?
        </p>
        <div class="border-t border-t-blue-300 pt-5 flex items-center justify-between">
          <DButton @click="emits('close')" color="error">Cancelar</DButton>
          <DButton type="button" @click="handleDeleteGasto">Confirmar</DButton>
        </div>
      </div>
    </template>
  </PopupComponent>
</template>
<script lang="ts" setup>
import { useGastosStore } from '@gastos/store/gastosStore';

const gastosStore = useGastosStore();

interface Props {
  open: boolean;
  deletedGasto?: number;
}
const props = defineProps<Props>();

const emits = defineEmits(['close']);

const handleDeleteGasto = async () => {
  if (props.deletedGasto) {
    const result = await gastosStore.deleteGasto(props.deletedGasto);

    if (result) {
      emits('close');
    }
  }
};
</script>
