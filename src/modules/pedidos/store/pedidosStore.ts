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
} from '@pedidos/actions';

import type { SavePedidoSuccess, SavePedidoError } from '@pedidos/interfaces/NuevoEstadoItem';
import type { Venta, Pedido } from '@pedidos/interfaces';
import type { NuevoPedido } from '@pedidos/interfaces/NuevoPedido';
import type { NewItemState } from '@pedidos/interfaces/NuevoEstadoItem';

import { formatDate } from '@/utils';

import { newPedidoInitialState } from '@pedidos/utils/index';

export const usePedidosStore = defineStore('pedidos', () => {
  const pedidos = ref<Venta[] | undefined>([]);
  const pedido = ref<Pedido | null>();
  const newPedido = ref<NuevoPedido>({ ...newPedidoInitialState });
  const isLoading = ref(false);

  const getPedidos = async (): Promise<boolean> => {
    isLoading.value = true;
    try {
      pedidos.value = await GetPedidosActions();
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
      pedido.value = await GetPedidoById(pedidoId);
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
        pedido.value = null;
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
    try {
      const result = await SavePedido(newPedido.value);

      if (result.status) return result;

      return {
        status: false,
      };
    } catch (error) {
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

  const resetPedidosState = () => {
    pedidos.value = [];
    pedido.value = null;
    isLoading.value = false;
    newPedido.value = { ...newPedidoInitialState };
  };

  const resetPedido = () => {
    pedido.value = null;
    isLoading.value = false;
  };

  return {
    isLoading,
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

    pedido: computed(() => {
      const estadoActual = pedido.value?.estado.actual.estado;

      return {
        ...pedido.value,
        estadoActual,
      };
    }),

    newPedido,

    costoTotalPedido: computed(() => {
      let total = 0;

      newPedido.value.productos.forEach((prod) => {
        const costoPerItem = prod.cantidad * prod.preciounitario;
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
  };
});
