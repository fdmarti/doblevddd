import { reactive } from 'vue';
import { Toast } from '@utils/index';
import { usePedidosStore } from '@pedidos/store/pedidosStore';
import type { NewItemState } from '@pedidos/interfaces/NuevoEstadoItem';

const dataChangeStateInitial = {
  estadoAnterior: '',
  estadoNuevo: '',
  cantidad: 0,
};

export const useChangeItemsState = (itemId: string) => {
  const pedidoStore = usePedidosStore();

  const formDataChangeState = reactive<NewItemState>({ ...dataChangeStateInitial });

  const formDataErrores = reactive({
    cantidad: 0,
  });

  const onHandleChangeItemsState = async () => {
    if (formDataChangeState.cantidad! <= 0 || !formDataChangeState.cantidad) {
      Toast.error('Debe ingresar una cantidad valida');
      return;
    }

    if (!formDataChangeState.estadoAnterior) {
      Toast.error('Debe ingresar el estado anterior');
      return;
    }

    if (!formDataChangeState.estadoNuevo) {
      Toast.error('Debe ingresar un nuevo estado');
      return;
    }

    if (formDataChangeState.estadoAnterior === formDataChangeState.estadoNuevo) {
      Toast.error('Los estados no pueden ser iguales');
      return;
    }

    const result = await pedidoStore.updateItemsPedido(itemId, formDataChangeState);

    if (!result.status) {
      Toast.error('Algo paso que no se guardo D:');
      return;
    }

    Object.assign(formDataChangeState, dataChangeStateInitial);

    pedidoStore.pedido.productos?.forEach((item) => {
      if (item.itemid === itemId) {
        Object.assign(item.detalle, result.detalle);
      }
    });

    Toast.success('Cambio realizado de forma correcta');
  };

  const onHandleDeleteItems = async () => {
    if (formDataErrores.cantidad <= 0 || !formDataErrores.cantidad) {
      Toast.error('Debe ingresar una cantidad valida');
      return;
    }

    const item = pedidoStore.pedido.productos!.find((item) => item.itemid === itemId);

    if (!item) return;

    if (item.detalle.imprimiendo < formDataErrores.cantidad) {
      Toast.error(
        'La cantidad de errores no puede superer a los productos que se estan imprimiendo',
      );
      return;
    }

    const result = await pedidoStore.updateItemsErrores(itemId, formDataErrores.cantidad);

    if (!result.status) {
      Toast.error('Algo paso que no se guardo D:');
      return;
    }

    formDataErrores.cantidad = 0;

    pedidoStore.pedido.productos?.forEach((item) => {
      if (item.itemid === itemId) {
        Object.assign(item.detalle, result.detalle);
      }
    });

    Toast.success('Errores cargados');
  };

  return {
    formDataChangeState,
    formDataErrores,

    onHandleChangeItemsState,
    onHandleDeleteItems,
  };
};
