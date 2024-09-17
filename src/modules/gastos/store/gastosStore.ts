import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Gasto, GastoForm } from '@gastos/interfaces/Gastos';
import { GetGastos, SaveGasto, DeleteGasto } from '@gastos/actions';
import { Toast } from '@/utils';

export const useGastosStore = defineStore('gastos', () => {
  const isLoading = ref(true);
  const gastos = ref<Gasto[]>([]);

  const getGastos = async (filtro: string = '') => {
    try {
      const result = await GetGastos(filtro);

      if (!result) throw Error();

      gastos.value = result.gastos;
      isLoading.value = false;
      return true;
    } catch (error) {
      isLoading.value = false;
      Toast.error('Error cargar los gastos');
      return false;
    }
  };

  const saveGasto = async (formData: GastoForm): Promise<boolean> => {
    try {
      const result = await SaveGasto(formData);

      if (!result.status) throw Error();

      const currentDate = new Date().toISOString().split('T');

      gastos.value.push({
        descripcion: formData.descripcion,
        id: result.id,
        monto: formData.monto,
        tipo: formData.tipo,
        fechagasto: new Date(currentDate[0]),
      });

      return true;
    } catch (error) {
      Toast.error('Error al guardar el gasto');
      return false;
    }
  };

  const deleteGasto = async (gastoId: number): Promise<boolean> => {
    try {
      const result = await DeleteGasto(gastoId);

      if (!result) throw Error();

      gastos.value = gastos.value.filter((gasto) => gasto.id !== gastoId);
      Toast.success('Gasto eliminado');

      return true;
    } catch (error) {
      Toast.error('Error al eliminar el gasto');
      return false;
    }
  };

  return {
    gastos: computed(() => gastos.value),
    totalGastos: computed(() => {
      let total = 0;

      gastos.value.forEach((gasto) => {
        total += gasto.monto;
      });

      return total;
    }),
    isLoading,

    getGastos,
    saveGasto,
    deleteGasto,
  };
});
