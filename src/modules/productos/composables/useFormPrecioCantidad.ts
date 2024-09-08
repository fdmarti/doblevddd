import { ref } from 'vue';
import { usePrecioStore } from '@productos/store/preciosStore';

export const useFormPrecioCantidad = () => {
  const precioStore = usePrecioStore();

  const amount = ref(0);

  const handleSubmitFormCantidad = async () => {
    if (amount.value <= 0) return false;

    const result = await precioStore.getPrecioPorMayor(amount.value);
  };
  return {
    amount,

    handleSubmitFormCantidad,
  };
};
