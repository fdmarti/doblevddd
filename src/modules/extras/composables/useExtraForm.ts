import { Toast } from '@utils/index';
import { reactive } from 'vue';
import { useExtrasStore } from '@extras/store/extrasStore';
import { extrasInitialState } from '@extras/utils/ExtraInit';

import type { Extra } from '@extras/interface/extras.response';

export const useExtraForm = () => {
  const extraStore = useExtrasStore();

  const formData = reactive<Extra>({ ...extrasInitialState });

  const handleExtraForm = async (): Promise<boolean> => {
    if (formData.descripcion.trim().length < 2) {
      Toast.error('El nombre del extra debe superar los 2 caracteres');
      return false;
    }

    if (!formData.precio) {
      Toast.error('Debe ingresar un valor valido');
      return false;
    }

    const result = await extraStore.saveExtra(formData);

    if (!result) {
      Toast.error('Error al guardar el extra');
      return false;
    }

    resetExtraForm();
    Toast.success('Extra guardada');
    return true;
  };

  const handleEditExtra = (extra: Extra) => {
    formData.id = extra.id;
    formData.descripcion = extra.descripcion;
    formData.precio = extra.precio;
  };

  const resetExtraForm = () => {
    Object.assign(formData, extrasInitialState);
  };

  return {
    formData,

    handleExtraForm,
    handleEditExtra,
    resetExtraForm,
  };
};
