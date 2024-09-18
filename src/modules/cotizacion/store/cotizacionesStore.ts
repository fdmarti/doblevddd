import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { GetCotizaciones, SaveCotizacion } from '@cotizacion/actions';
import { cotizacionInitialState } from '@cotizacion/utils';
import type { Cotizaciones } from '@cotizacion/interface';

import { Toast } from '@utils/index';

export const useCotizacionStore = defineStore('cotizacion', () => {
  const cotizaciones = reactive<Cotizaciones>({ ...cotizacionInitialState });
  const isLoading = ref(true);
  const isSaving = ref(false);

  const getCotizaciones = async () => {
    try {
      const result = await GetCotizaciones();

      if (!result.status) throw Error();

      Object.assign(cotizaciones, result.cotizaciones);
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
      return false;
    }
  };

  const saveCotizacion = async () => {
    isSaving.value = true;
    try {
      const result = await SaveCotizacion(cotizaciones);
      if (!result.status) throw Error();

      return Toast.success('Cotización actualizada');
    } catch (error) {
      Toast.error('Error al actualizar la cotización');
      return false;
    }
  };

  return {
    cotizaciones,
    isLoading,
    isSaving,

    getCotizaciones,
    saveCotizacion,
  };
});
