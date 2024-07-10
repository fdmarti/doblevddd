import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { GetCategorias } from '@categorias/actions/get-categorias.action';
import type { Categoria } from '@categorias/interfaces/categorias.response';

export const useCategoriaStore = defineStore('categoria', () => {
  const categoriasList = ref<Categoria[]>();
  const isLoading = ref(true);

  const getCategorias = async () => {
    try {
      const result = await GetCategorias();
      categoriasList.value = result?.categorias;
      isLoading.value = false;
    } catch (error) {
      return false;
    }
  };

  return {
    categoriasList: computed(() => categoriasList.value),

    getCategorias,
  };
});
