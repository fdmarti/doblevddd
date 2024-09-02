import { reactive, ref } from 'vue';
import type { GastoForm } from '@gastos/interfaces/Gastos';
import { useGastosStore } from '@gastos/store/gastosStore';
import { Toast } from '@/utils';

export const useGastosForm = (formData: GastoForm) => {
  const formGasto = reactive({ ...formData });
  const isSaving = ref(false);
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

    isSaving.value = true;
    const result = await gastosStore.saveGasto(formGasto);

    console.log(result);

    if (result) {
      Toast.success('Gasto agregado');
      isSaving.value = false;
      return true;
    }

    Toast.error('Ocurrio un error al guardar el gasto');
    isSaving.value = false;
    return false;
  };

  const handleClearForm = () => {
    Object.assign(formGasto, formData);
  };

  return {
    formGasto,
    isSaving,

    handleGastoFormSubmit,
    handleClearForm,
  };
};
