<template>
  <PopupComponent
    id="modal-form-categoria"
    :open="open"
    :title="props.category?.isEditing ? 'Editar categoria' : 'Nueva categoria'"
  >
    <template #body>
      <div class="my-5">
        <form @submit.prevent="handleForm" class="flex flex-col gap-2">
          <label class="input input-bordered flex items-center gap-2">
            <input
              type="text"
              placeholder="Nombre de la categoria"
              class="grow"
              id="categoria-description"
              name="categoria-description"
              autocomplete="name"
              v-model="formData.categoria"
            />
          </label>
          <label class="input input-bordered flex items-center gap-2">
            <input
              type="number"
              placeholder="0%"
              class="grow"
              id="category-margen"
              name="category-margen"
              v-model="formData.margen"
            />
          </label>
          <div class="border-t border-t-blue-300 pt-5 flex items-center justify-between">
            <ButtonError @click="emits('close')">Cancelar</ButtonError>
            <ButtonSuccess type="submit">Guardar</ButtonSuccess>
          </div>
        </form>
      </div>
    </template>
  </PopupComponent>
</template>
<script lang="ts" setup>
import { watch } from 'vue';
import { PopupComponent } from '@common/components/Popup';
import { ButtonError, ButtonSuccess } from '@common/components/Buttons';
import { useCategoriaForm } from '@categorias/composables/useCategoriaForm';
import type { Categoria } from '@categorias/interfaces/categorias.response';

const { formData, handleCateogriaForm, handleEditCategory, resetCateogoryForm } =
  useCategoriaForm();

const handleForm = async () => {
  const result = await handleCateogriaForm();
  if (result) {
    emits('close');
  }
};

interface Props {
  category?: {
    category: Categoria;
    isEditing: boolean;
  };
  open: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(['close']);

watch(props, (updProps) => {
  if (updProps.category?.isEditing) {
    handleEditCategory(updProps.category.category);
  } else {
    resetCateogoryForm();
  }
});
</script>
