<template>
  <div class="flex justify-center">
    <label class="cursor-pointer label">
      <input
        type="checkbox"
        :checked="checked"
        @change="handleToggleStatusCatalogo"
        class="checkbox checkbox-accent"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { Toast } from '@utils/index';

import { useCategoriaStore } from '@categorias/store/categoriaStore';
const categoriasStore = useCategoriaStore();

interface Props {
  categoryId: number;
  checked: boolean;
}

const props = defineProps<Props>();

const handleToggleStatusCatalogo = async () => {
  const result = await categoriasStore.toggleCategoriaCatalogo(props.categoryId);

  if (result) {
    Toast.success('Cambio realizado');
    return;
  }

  Toast.error('Ocurrio un error');
};
</script>
