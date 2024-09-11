import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import {
  GetPedidosActions,
  GetPedidoById,
  DeletePedidoAction,
  SavePedido,
  UpdateStateItems,
  UpdateErrorsCountItem,
  type SuccessChangeStateItem,
  type ErrorChangeStateItem,
  GeneratePreVenta,
} from '@pedidos/actions';

import type { SavePedidoSuccess, SavePedidoError } from '@pedidos/interfaces/NuevoEstadoItem';
import type { Venta, Pedido } from '@pedidos/interfaces';
import type { NuevoPedido } from '@pedidos/interfaces/NuevoPedido';
import type { NewItemState } from '@pedidos/interfaces/NuevoEstadoItem';

import { formatDate, Uuid } from '@/utils';

import { newPedidoInitialState, pedidoInit } from '@pedidos/utils/index';

export const usePedidosStore = defineStore('pedidos', () => {
  const pedidos = ref<Venta[] | []>([]);
  const pedido = ref<Pedido>({ ...pedidoInit });
  const newPedido = ref<NuevoPedido>({ ...newPedidoInitialState });
  const isLoading = ref(true);
  const isSaving = ref(false);

  const getPedidos = async (): Promise<boolean> => {
    try {
      const result = await GetPedidosActions();

      if (!result) throw new Error('Error al cargar los pedidos');

      pedidos.value = result.ventas;

      isLoading.value = false;
      return true;
    } catch (error) {
      resetPedidosState();
      return false;
    }
  };

  const getPedidoById = async (pedidoId: string): Promise<boolean> => {
    isLoading.value = true;
    try {
      const result = await GetPedidoById(pedidoId);

      if (!result) throw new Error('Error al cargar el pedido');

      pedido.value = result;

      isLoading.value = false;
      return true;
    } catch (error) {
      resetPedidosState();
      return false;
    }
  };

  const deletePedido = async (): Promise<boolean> => {
    isLoading.value = true;

    try {
      const result = await DeletePedidoAction(pedido.value!.id);
      if (result) {
        pedido.value = { ...pedidoInit };
        return true;
      }

      isLoading.value = false;
      return false;
    } catch (error) {
      resetPedido();
      return false;
    }
  };

  const confirmNewPedido = async (): Promise<SavePedidoSuccess | SavePedidoError> => {
    isSaving.value = true;
    try {
      const result = await SavePedido(newPedido.value);
      isSaving.value = false;

      if (result.status) return result;

      return {
        status: false,
      };
    } catch (error) {
      isSaving.value = false;

      return {
        status: false,
      };
    }
  };

  const updateItemsPedido = async (
    itemId: string,
    newState: NewItemState,
  ): Promise<SuccessChangeStateItem | ErrorChangeStateItem> => {
    if (!itemId) return { status: false };
    if (!pedido.value?.id) return { status: false };

    try {
      const result = await UpdateStateItems(pedido.value.id, itemId, newState);

      if (!result.status) return { status: false };

      return result;
    } catch (error) {
      return { status: false };
    }
  };

  const updateItemsErrores = async (
    itemId: string,
    newCantidad: number,
  ): Promise<SuccessChangeStateItem | ErrorChangeStateItem> => {
    if (!itemId) return { status: false };
    if (!newCantidad || newCantidad <= 0) return { status: false };

    try {
      const result = await UpdateErrorsCountItem(pedido.value!.id, itemId, newCantidad);

      if (!result.status) return { status: false };

      return result;
    } catch (error) {
      return { status: false };
    }
  };

  const generatePreVenta = async () => {
    const { productos } = newPedido.value;
    const hash = Uuid.generate();
    isLoading.value = true;

    try {
      const result = await GeneratePreVenta(hash, productos);

      if (!result.status) throw Error();

      newPedido.value.hash = result.preVenta.hash;
      newPedido.value.productos.splice(
        0,
        newPedido.value.productos.length,
        ...result.preVenta.productos,
      );

      isLoading.value = false;
      return true;
    } catch (error) {
      isLoading.value = false;

      return false;
    }
  };

  const resetPedidosState = () => {
    pedidos.value = [];
    pedido.value = { ...pedidoInit };
    isLoading.value = false;
  };

  const resetNewPedido = () => {
    newPedido.value = { ...newPedidoInitialState };
    newPedido.value.productos = [];
  };

  const resetPedido = () => {
    pedido.value = { ...pedidoInit };
    isLoading.value = false;
  };

  return {
    isLoading,
    isSaving,
    pedidos: computed(() => {
      return pedidos.value!.map((venta) => {
        const ventaFormat = { ...venta };
        const fechacreacion = formatDate(venta.fechacreacion);
        const completion = venta.preciototal === 0 ? 0 : (venta.senia / venta.preciototal) * 100;
        return {
          ...ventaFormat,
          fechacreacion,
          completion: Math.ceil(completion),
        };
      });
    }),

    pedido: computed(() => pedido.value),
    newPedido,

    costoTotalPedido: computed(() => {
      let total = 0;

      newPedido.value.productos.forEach((prod) => {
        let costoPerItem = 0;
        if (prod.precioUnitarioFinal) {
          costoPerItem = prod.cantidad * prod.precioUnitarioFinal;
        } else {
          costoPerItem = 0;
        }

        total = total + costoPerItem;
      });

      return total;
    }),

    getPedidos,
    getPedidoById,
    deletePedido,
    confirmNewPedido,
    updateItemsPedido,
    updateItemsErrores,
    generatePreVenta,
    resetNewPedido,
  };
});
