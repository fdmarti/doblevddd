import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from '@utils/index';
import type { Pieza } from '@productos/interfaces/Pieza';

import { useProductosStore } from '@productos/store/productosStore';

const productInitialState = {
  productName: '',
  piezas: [] as Pieza[],
  categoria: 0,
  extras: [] as number[],
  productId: 0,
};

export const useFormProduct = () => {
  const router = useRouter();

  const productosStore = useProductosStore();
  const product = reactive({ ...productInitialState });

  const showModalPieza = ref(false);
  const isEditProduct = ref(false);
  const isLoadingForm = ref(false);

  const togglePopup = () => {
    showModalPieza.value = !showModalPieza.value;
  };

  const handleNewPieza = (newPieza: Pieza) => {
    product.piezas.push({ ...newPieza });
    togglePopup();
  };

  const handleDeletePieza = (piezaId: number) => {
    product.piezas = product.piezas.filter((_, i) => piezaId != i);
  };

  const handleSubmitFormProducto = async () => {
    if (!product.productName.trim()) {
      Toast.error('Debe ingresar el nombre de producto');
      return;
    }

    if (product.piezas.length === 0) {
      Toast.error('Debe ingresar al menos 1 pieza');
      return;
    }

    if (!product.categoria) {
      Toast.error('Debe ingresar una categoria');
      return;
    }

    const result = await productosStore.saveProducto(product);

    if (!result.status) {
      Toast.error('Error al guardar el producto');
      return;
    }

    Toast.success('Producto guardado');
    router.replace({ name: 'product', params: { id: result.idproducto } });
  };

  const setProductEdit = async (productId: string) => {
    isLoadingForm.value = true;
    clearProductState();
    try {
      const productResult = await productosStore.getProductById(productId);

      if (!productResult.status) {
        isLoadingForm.value = false;
        return;
      }

      const { producto } = productResult;

      product.categoria = producto.producto.idcategoria;
      product.productName = producto.producto.descripcion;
      product.productId = producto.producto.id;

      product.piezas = producto.piezas;
      product.extras = producto.extras.map((extra) => extra.id);
      isLoadingForm.value = false;
    } catch (error) {
      isLoadingForm.value = false;
      return false;
    }
  };

  const clearProductState = () => {
    Object.assign(product, productInitialState);
  };

  return {
    product,
    showModalPieza,
    isEditProduct,
    isLoadingForm,

    handleNewPieza,
    handleDeletePieza,
    handleSubmitFormProducto,
    togglePopup,
    setProductEdit,
  };
};
