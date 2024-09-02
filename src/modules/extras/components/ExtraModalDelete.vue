<template>
  <PopupComponent id="modal-extra-delete" :open="open" title="Confirmar eliminar Extra">
    <template #body>
      <div class="my-5">
        <p class="text-lg font-semibold text-center pb-5">
          ¿Seguro que queres eliminar el extra {{ props.deleteExtra?.descripcion }} ?
        </p>
        <div class="border-t border-t-blue-300 pt-5 flex items-center justify-between">
          <ButtonError @click="emits('close')">Cancelar</ButtonError>
          <ButtonSuccess type="button" @click="handleDeleteExtra">Confirmar</ButtonSuccess>
        </div>
      </div>
    </template>
  </PopupComponent>
</template>
<script lang="ts" setup>
import { Toast } from '@utils/index';
import { ButtonError, ButtonSuccess } from '@common/components/Buttons';
import { PopupComponent } from '@common/components/Popup';
import type { Extra } from '@extras/interface/extras.response';
import { useExtrasStore } from '@extras/store/extrasStore';

const extraStore = useExtrasStore();

interface Props {
  open: boolean;
  deleteExtra?: Extra | null;
}

const props = defineProps<Props>();

const emits = defineEmits(['close']);

const handleDeleteExtra = async () => {
  const result = await extraStore.deleteExtra(props.deleteExtra!.id);

  if (result) {
    Toast.success('Extra eliminado');
    emits('close');
  }
};
</script>
