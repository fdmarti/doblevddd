import { Toast } from '@utils/index';
import { reactive } from 'vue';
import { useCategoriaStore } from '@categorias/store/categoriaStore';
import type { NewCategoria } from '@categorias/interfaces/Categoria';
import type { Categoria } from '@categorias/interfaces/categorias.response';

const categoriaInitialState = {
  id: 0,
  categoria: '',
  margen: null,
};

export const useCategoriaForm = () => {
  const categoryStore = useCategoriaStore();

  const formData = reactive<NewCategoria>({ ...categoriaInitialState });

  const handleCateogriaForm = async (): Promise<boolean> => {
    if (formData.categoria.trim().length < 2) {
      Toast.error('El nombre de la categoria debe superar los 2 caracteres');
      return false;
    }

    if (!formData.margen) {
      Toast.error('Debe ingresar un valor en el % del margen');
      return false;
    }

    const result = await categoryStore.saveCategoria(formData);

    if (!result) {
      Toast.error('Error al guardar la categoria');
      return false;
    }

    resetCateogoryForm();
    Toast.success('Cateogria guardada');
    return true;
  };

  const handleEditCategory = (category: Categoria) => {
    formData.id = category.id;
    formData.categoria = category.categoria;
    formData.margen = category.margen;
    formData.catalogo = category.catalogo;
  };

  const resetCateogoryForm = () => {
    Object.assign(formData, categoriaInitialState);
  };

  return {
    formData,

    handleCateogriaForm,
    handleEditCategory,
    resetCateogoryForm,
  };
};
