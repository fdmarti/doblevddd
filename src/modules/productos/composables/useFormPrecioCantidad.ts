import { reactive, ref } from 'vue';
import { usePrecioStore } from '@productos/store/preciosStore';
import { Toast } from '@/utils';

export const useFormPrecioCantidad = () => {
  const precioStore = usePrecioStore();

  const isSearching = ref(false);
  const numberAmountSelected = ref(0);
  const priceByAmount = reactive({
    total: 0,
    unidad: 0,
    unidades: 0,
  });

  const handleSubmitFormCantidad = async () => {
    if (priceByAmount.unidades <= 0) {
      Toast.error('La cantidad debe ser mayor a 0');
      return false;
    }

    if (priceByAmount.unidades <= 4) {
      Toast.error('La cantidad debe ser mayor a 4 para que haya un descuento');
      return false;
    }

    if (priceByAmount.unidades <= 4) {
      Toast.error('La cantidad debe ser mayor a 4 para que haya un descuento');
      return false;
    }

    if (priceByAmount.unidades === numberAmountSelected.value) {
      Toast.error('La cantidad ha buscar debe ser diferente a la anterior');
      return false;
    }

    isSearching.value = true;
    const result = await precioStore.getPrecioPorMayor(priceByAmount.unidades);

    Object.assign(priceByAmount, result);
    numberAmountSelected.value = priceByAmount.unidades;

    isSearching.value = false;
    Toast.success('Precio por mayor generado');
  };
  return {
    priceByAmount,
    isSearching,

    handleSubmitFormCantidad,
  };
};
