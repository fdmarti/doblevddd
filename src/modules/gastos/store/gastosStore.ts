import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Gasto, GastoForm } from '@gastos/interfaces/Gastos';
import { GetGastos, SaveGasto, DeleteGasto } from '@gastos/actions';
import { Toast } from '@/utils';

export const useGastosStore = defineStore('gastos', () => {
  const isLoading = ref(true);
  const gastos = ref<Gasto[]>([]);

  const getGastos = async () => {
    try {
      const result = await GetGastos();

      gastos.value = result;
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
    }
  };

  const saveGasto = async (formData: GastoForm): Promise<boolean> => {
    try {
      const result = await SaveGasto(formData);

      if (result.status) {
        // TODO - Push al listado de gastos

        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  };

  const deleteGasto = async (gastoId: number): Promise<boolean> => {
    try {
      const result = await DeleteGasto(gastoId);

      if (result) {
        gastos.value.filter((gasto) => gasto.id !== gastoId);
        Toast.success('Gasto eliminado');
        return true;
      }

      return false;
    } catch (error) {
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
