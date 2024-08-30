import { reactive } from 'vue';
import type { GastoForm } from '@gastos/interfaces/Gastos';
import { useGastosStore } from '@gastos/store/gastosStore';
import { Toast } from '@/utils';

export const useGastosForm = (formData: GastoForm) => {
  const formGasto = reactive({ ...formData });
  const gastosStore = useGastosStore();

  const handleGastoFormSubmit = async () => {
    if (!formGasto.descripcion.trim()) {
      Toast.error('Debe ingresar una descripción del gasto');
      return;
    }

    if (!formGasto.tipo) {
      Toast.error('Debe ingresar un tipo de gasto');
      return;
    }

    if (formGasto.monto <= 0) {
      Toast.error('Debe ingresar un monto valido');
      return;
    }

    const result = await gastosStore.saveGasto(formGasto);
    Toast.success('Gasto agregado');
    return true;
  };

  const handleClearForm = () => {
    Object.assign(formGasto, formData);
  };

  return {
    formGasto,

    handleGastoFormSubmit,
    handleClearForm,
  };
};
