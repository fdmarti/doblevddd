<template>
  <dialog id="modal-delete-gasto" class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-blue-300 pb-5">
        <h2 class="text-xl font-bold">Confirmar eliminar Gasto</h2>
      </div>
      <div class="my-5">
        <p class="text-lg font-semibold text-center pb-5">
          ¿Seguro que queres eliminar el gasto # {{ deletedGasto }}?
        </p>
        <div class="border-t border-t-blue-300 pt-5 flex items-center justify-between">
          <button @click="emits('close')" class="btn btn-error" type="button">Cancelar</button>
          <button class="btn btn-success" type="button" @click="handleDeleteGasto">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </dialog>
  <BackgroundModal v-if="open" />
</template>
<script lang="ts" setup>
import BackgroundModal from '@common/components/content/BackgroundModal.vue';
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
