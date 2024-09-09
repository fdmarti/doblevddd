import { ref } from 'vue';
import { Toast } from '@/utils';
import type { PrecioUnitarioForm } from '@productos/interfaces/Precio/Precio.form';
import { usePrecioStore } from '@productos/store/preciosStore';

export const useFormPrecio = (formPrecio: PrecioUnitarioForm) => {
  const precioStore = usePrecioStore();

  const preciounitario = ref<number | null>(formPrecio.preciounitario);

  const handleSubmitFormPrecio = async () => {
    if (!preciounitario.value || preciounitario.value <= 0) {
      Toast.error('Debe ingresar un precio unitario valido');
      return false;
    }

    const result = await precioStore.updatePrecioProducto(preciounitario.value);

    if (result) {
      Toast.success('Precio actualizado');
      return true;
    }
  };

  const handleSubmitFormPrecioSugerido = async () => {
    if (!formPrecio.preciosugerido || formPrecio.preciosugerido <= 0) {
      Toast.error('El precio sugerido debe ser mayor a 0');
      return false;
    }

    const result = await precioStore.updatePrecioProducto(formPrecio.preciosugerido);

    if (result) {
      Toast.success('Precio actualizado');
      preciounitario.value = formPrecio.preciosugerido;
      return true;
    }
  };

  return {
    preciounitario,

    handleSubmitFormPrecio,
    handleSubmitFormPrecioSugerido,
  };
};
