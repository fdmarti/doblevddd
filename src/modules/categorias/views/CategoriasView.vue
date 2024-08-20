<template>
  <div>
    <CateogoriasList @edit="onHandleEditCategory" />
    <FormCategoria
      :open="showModalCategory"
      @close="onToggleCategoryPopup"
      :category="editCategory"
    />
    <FabButton @click="onToggleCategoryPopup">
      <CategoryIcon :size="26" />
    </FabButton>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

import { CateogoriasList, FormCategoria } from '@categorias/components';
import { FabButton } from '@common/components';
import { CategoryIcon } from '@common/components/icons';

import type { Categoria } from '@categorias/interfaces/categorias.response';
import { categoryInitialState } from '@categorias/utils/categoryInit';

const showModalCategory = ref(false);
const editCategory = reactive({
  category: { ...categoryInitialState },
  isEditing: false,
});

const onToggleCategoryPopup = () => {
  showModalCategory.value = !showModalCategory.value;

  if (!showModalCategory.value) {
    editCategory.isEditing = false;
    Object.assign(editCategory.category, categoryInitialState);
  }
};

const onHandleEditCategory = (category: Categoria) => {
  Object.assign(editCategory.category, category);
  editCategory.isEditing = true;
  onToggleCategoryPopup();
};
</script>
