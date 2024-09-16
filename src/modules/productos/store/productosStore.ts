import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { sleep } from '@/utils/sleep';

import type { Producto } from '@productos/interfaces/productos.response';
import type { ProductoDetail } from '@productos/interfaces/producto.response';
import type { Producto as ProductoFrom } from '@productos/interfaces';

import {
  DeleteImage,
  GetProductos,
  GetProductosByID,
  SaveProducto,
  UploadImageProduct,
  PostPiezaDetail,
  type ErrorProducto,
  type ProductoError,
  type ProductoSuccess,
  type SuccessProducto,
} from '@productos/actions';

export const useProductosStore = defineStore('productos', () => {
  const productos = ref<Producto[]>([]);
  const productosFilter = ref<string>('');
  const productosPagination = reactive({
    currentPage: 1,
    amountProductos: 10,
    totalPages: 0,
  });

  const producto = ref<ProductoDetail | null>(null);
  const isLoading = ref(false);

  const getProductos = async () => {
    isLoading.value = true;

    try {
      productos.value = await GetProductos();
      checkAmountPages(productos.value);

      isLoading.value = false;
    } catch (error) {
      resetProductoState();
      return false;
    }
  };

  const getProductById = async (productoId: string): Promise<ProductoSuccess | ProductoError> => {
    isLoading.value = true;

    try {
      const result = await GetProductosByID(productoId);

      if (!result.status) {
        return {
          status: false,
        };
      }

      await sleep();

      producto.value = result.producto;
      isLoading.value = false;

      return {
        producto: result.producto,
        status: true,
      };
    } catch (error) {
      resetProductoState();
      return {
        status: false,
      };
    }
  };

  const uploadProductImage = async (productId: number, file: File) => {
    try {
      const result = await UploadImageProduct(productId, file);

      if (!result.status) return false;

      producto.value!.producto.imagen = result.imagen;
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteImagen = async (productId: number) => {
    try {
      if (!productId) throw Error;

      const result = await DeleteImage(productId);

      if (!result.status) throw Error;

      producto.value!.producto.imagen = '';

      return true;
    } catch (error) {
      return false;
    }
  };

  const clearProductsList = () => {
    productos.value = [];
  };

  const resetProductoState = async () => {
    productos.value = [];
    isLoading.value = false;
  };

  const clearProductState = () => {
    producto.value = null;
  };

  const nextPageProductos = () => {
    if (productosPagination.currentPage + 1 > productosPagination.totalPages) return;
    productosPagination.currentPage++;
  };

  const prevPageProductos = () => {
    if (productosPagination.currentPage - 1 === 0) return;
    productosPagination.currentPage--;
  };

  const checkAmountPages = (productsArray: Producto[]) => {
    productosPagination.totalPages = Math.ceil(
      productsArray.length / productosPagination.amountProductos,
    );
  };

  const saveProducto = async (
    paramsProduct: ProductoFrom,
  ): Promise<SuccessProducto | ErrorProducto> => {
    isLoading.value = true;

    try {
      const result = await SaveProducto(paramsProduct);

      return result;
    } catch (error) {
      resetProductoState();
      return {
        status: false,
      };
    }
  };

  const postPiezaDetail = async (piezaDetail: {
    descripcion: string;
    time: number;
    filament_used: number;
  }) => {
    const { descripcion } = piezaDetail;
    try {
      const result = await PostPiezaDetail(piezaDetail);

      if (!result.status) throw new Error();

      return {
        ...result.pieza,
        descripcion,
      };
    } catch (error) {
      return false;
    }
  };

  return {
    isLoading,
    productosFilter,
    currentPage: computed(() => productosPagination.currentPage),
    totalPages: computed(() => productosPagination.totalPages),
    productos: computed(() => {
      const productName = productosFilter.value.toLowerCase();
      const filteredProducts = productos.value.filter((producto) => {
        if (
          producto.descripcion.toLowerCase().includes(productName) ||
          producto.categoria.toLowerCase().includes(productName)
        ) {
          return producto;
        }
      });

      checkAmountPages(filteredProducts);

      return filteredProducts.slice(
        (productosPagination.currentPage - 1) * productosPagination.amountProductos,
        productosPagination.amountProductos * productosPagination.currentPage,
      );
    }),

    producto,

    getProductos,
    nextPageProductos,
    prevPageProductos,
    saveProducto,
    getProductById,
    uploadProductImage,
    deleteImagen,
    clearProductsList,
    postPiezaDetail,
    clearProductState,
  };
});
