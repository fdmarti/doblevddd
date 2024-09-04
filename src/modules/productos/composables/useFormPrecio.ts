import { reactive } from 'vue';
import { Toast } from '@/utils';
import type { PrecioUnitarioForm } from '@productos/interfaces/Precio/Precio.form';
import { usePrecioStore } from '@productos/store/preciosStore';

export const useFormPrecio = (formPrecio: PrecioUnitarioForm) => {
  const precioStore = usePrecioStore();

  const precioForm = reactive({
    preciounitario: formPrecio.preciounitario,
    costototal: formPrecio.costototal,
  });

  const handleSubmitFormPrecio = async () => {
    if (precioForm.preciounitario <= 0) {
      Toast.error('Debe ingresar un precio unitario valido');
      return false;
    }

    const result = await precioStore.updatePrecioProducto(precioForm);

    if (result) {
      Toast.success('Precio actualizado');
      return true;
    }
  };

  return {
    precioForm,

    handleSubmitFormPrecio,
  };
};
