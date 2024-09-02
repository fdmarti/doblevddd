<template>
  <PopupComponent id="modal-form-categoria" :open="open" title="Confirmar eliminar categoria">
    <template #body>
      <div class="my-5">
        <p class="text-lg font-semibold text-center pb-5">
          ¿Seguro que queres eliminar la categoria {{ props.deleteCategory?.descripcion }} ?
        </p>
        <div class="border-t border-t-blue-300 pt-5 flex items-center justify-between">
          <ButtonError @click="emits('close')">Cancelar</ButtonError>
          <ButtonSuccess type="button" @click="handleDeleteCategory">Confirmar</ButtonSuccess>
        </div>
      </div>
    </template>
  </PopupComponent>
</template>
<script lang="ts" setup>
import { Toast } from '@utils/index';
import { PopupComponent } from '@common/components/Popup';
import { ButtonError, ButtonSuccess } from '@common/components/Buttons';
import { useCategoriaStore } from '@categorias/store/categoriaStore';
import type { Categoria } from '@categorias/interfaces/categorias.response';

interface Props {
  open: boolean;
  deleteCategory?: Categoria | null;
}

const props = defineProps<Props>();

const emits = defineEmits(['close']);

const { deleteCategoria } = useCategoriaStore();

const handleDeleteCategory = async () => {
  const result = await deleteCategoria(props.deleteCategory!.id);

  if (result) {
    Toast.success('Cateogria eliminada');
    emits('close');
  }
};
</script>
