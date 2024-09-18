import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';

import {
  GetCategorias,
  SaveCategory,
  DeleteCategoria,
  ToggleStateCatalogo,
} from '@categorias/actions';
import type { Categoria } from '@categorias/interfaces/categorias.response';
import type { NewCategoria } from '@categorias/interfaces/Categoria';

export const useCategoriaStore = defineStore('categoria', () => {
  const categorias = ref<Categoria[]>();
  const categoriasFilter = ref<string>('');
  const categoriasPagination = reactive({
    currentPage: 1,
    amountCategorias: 10,
    totalPages: 0,
  });

  const isLoading = ref(true);

  const getCategories = async () => {
    try {
      const result = await GetCategorias();

      if (!result) throw Error();

      categorias.value = result.categorias;
      isLoading.value = false;
      return true;
    } catch (error) {
      isLoading.value = false;
      return false;
    }
  };

  const saveCategoria = async (category: NewCategoria): Promise<boolean> => {
    try {
      const result = await SaveCategory(category);
      if (!result.status) throw Error();
      if (!categorias.value) throw Error();

      if (!category.id) {
        categorias.value.push({
          id: result.idcategoria,
          descripcion: category.categoria.toUpperCase(),
          categoria: category.categoria.toUpperCase(),
          catalogo: true,
          productos: 0,
          margen: category.margen!,
        });

        return true;
      }

      for (let i = 0; i < categorias.value.length; i++) {
        if (categorias.value[i].id === result.idcategoria) {
          categorias.value[i].descripcion = category.categoria;
          categorias.value[i].margen = category.margen!;

          break;
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteCategoria = async (categoryId: number): Promise<boolean> => {
    try {
      const result = await DeleteCategoria(categoryId);

      if (!result.status) throw Error();

      categorias.value = categorias.value!.filter((c) => c.id !== categoryId);

      return true;
    } catch (error) {
      return false;
    }
  };

  const toggleCategoriaCatalogo = async (categoryId: number) => {
    try {
      const result = await ToggleStateCatalogo(categoryId);

      if (!result.status) throw Error();

      return true;
    } catch (error) {
      return false;
    }
  };

  const nextPageCategorias = () => {
    if (categoriasPagination.currentPage + 1 > categoriasPagination.totalPages) return;
    categoriasPagination.currentPage++;
  };

  const prevPageCategorias = () => {
    if (categoriasPagination.currentPage - 1 === 0) return;
    categoriasPagination.currentPage--;
  };

  const checkAmountPages = (categoriasArray: Categoria[]) => {
    categoriasPagination.totalPages = Math.ceil(
      categoriasArray.length / categoriasPagination.amountCategorias,
    );
  };

  return {
    currentPage: computed(() => categoriasPagination.currentPage),
    totalPages: computed(() => categoriasPagination.totalPages),
    categoriasAll: computed(() => categorias.value),
    categorias: computed(() => {
      const categoryName = categoriasFilter.value.toLowerCase();

      if (categorias.value) {
        const filteredCategories = categorias.value!.filter((categoria) => {
          if (categoria.descripcion.toLowerCase().includes(categoryName)) {
            return categoria;
          }
        });

        checkAmountPages(filteredCategories);

        return filteredCategories.slice(
          (categoriasPagination.currentPage - 1) * categoriasPagination.amountCategorias,
          categoriasPagination.amountCategorias * categoriasPagination.currentPage,
        );
      }

      return [];
    }),
    categoriasFilter,
    isLoading,

    getCategories,
    saveCategoria,
    deleteCategoria,
    nextPageCategorias,
    prevPageCategorias,
    checkAmountPages,
    toggleCategoriaCatalogo,
  };
});
