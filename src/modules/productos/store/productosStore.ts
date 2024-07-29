import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { sleep } from '@/utils/sleep';

import type { Producto } from '@/modules/productos/interfaces/productos.response';
import type { ProductoDetail } from '@productos/interfaces/producto.response';
import type { Producto as ProductoFrom } from '@productos/interfaces';

import {
  GetProductos,
  GetProductosByID,
  SaveProducto,
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

  const producto = ref<ProductoDetail>();
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

  const resetProductoState = async () => {
    productos.value = [];
    isLoading.value = false;
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

  return {
    isLoading,
    productosFilter,
    currentPage: computed(() => productosPagination.currentPage),
    totalPages: computed(() => productosPagination.totalPages),
    productos: computed(() => {
      const productName = productosFilter.value.toLowerCase();
      const filteredProducts = productos.value.filter((producto) => {
        if (producto.descripcion.toLowerCase().includes(productName)) {
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
  };
});
