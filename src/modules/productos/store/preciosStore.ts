import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useProductosStore } from '@productos/store/productosStore';
import type { PrecioUnitarioForm } from '@productos/interfaces/Precio/Precio.form';
import { UpdatePrecioProducto, GetPriceByAmount } from '@productos/actions';

export const usePrecioStore = defineStore('precios', () => {
  const productStore = useProductosStore();
  const isSaving = ref(false);

  const updatePrecioProducto = async (precioData: PrecioUnitarioForm): Promise<boolean> => {
    if (!productStore.producto?.producto.id) return false;

    isSaving.value = true;

    try {
      const result = await UpdatePrecioProducto(precioData, productStore.producto.producto.id);

      if (result.status) {
        productStore.producto.precio.preciounitario = precioData.preciounitario;

        const calcGanancia = precioData.preciounitario - productStore.producto.precio.costototal;
        productStore.producto.precio.ganancia = Number(calcGanancia.toFixed(2));

        isSaving.value = false;
        return true;
      }

      isSaving.value = false;
      return false;
    } catch (error) {
      isSaving.value = false;
      return false;
    }
  };

  const getPrecioPorMayor = async (cantidad: number) => {
    if (!productStore.producto?.producto.id) return false;

    try {
      const result = await GetPriceByAmount(productStore.producto.producto.id, cantidad);

      if (!result.status) throw new Error('Error al traer el precio por cantidad');

      return result.precio;
    } catch (error) {
      return false;
    }
  };

  return {
    isSaving,

    updatePrecioProducto,
    getPrecioPorMayor,
  };
});
