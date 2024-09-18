import { reactive, ref } from 'vue';
import { Toast } from '@utils/index';
import { usePedidosStore } from '@pedidos/store/pedidosStore';

const dataChangeStateInitial = {
  estadoAnterior: '',
  estadoNuevo: '',
  cantidad: 0,
};

export const useChangeItemsState = (itemId: string) => {
  const pedidoStore = usePedidosStore();

  const formDataChangeState = reactive({ ...dataChangeStateInitial });
  const currentStateArr = ref<string[]>([]);
  const bgColorSelected = 'bg-accent';

  const formDataErrores = reactive({
    cantidad: 0,
  });

  const addStateForItem = (state: string) => {
    if (currentStateArr.value.includes(state)) {
      const index = currentStateArr.value.indexOf(state);
      currentStateArr.value.splice(index, 1);
      return;
    }

    if (currentStateArr.value.length == 2) {
      currentStateArr.value[0] = currentStateArr.value[1];
      currentStateArr.value.pop();
    }

    currentStateArr.value.push(state);
  };

  const addClassIsInStateArr = (currentState: string) => {
    return currentStateArr.value.includes(currentState) ? bgColorSelected : '';
  };

  const onHandleChangeItemsState = async () => {
    if (formDataChangeState.cantidad! <= 0 || !formDataChangeState.cantidad) {
      Toast.error('Debe ingresar una cantidad valida');
      return;
    }

    if (!currentStateArr.value[0]) {
      Toast.error('Debe ingresar el estado anterior');
      return;
    }

    if (!currentStateArr.value[1]) {
      Toast.error('Debe ingresar un nuevo estado');
      return;
    }

    formDataChangeState.estadoAnterior = currentStateArr.value[0];
    formDataChangeState.estadoNuevo = currentStateArr.value[1];

    const result = await pedidoStore.updateItemsPedido(itemId, formDataChangeState);

    if (!result.status) {
      Toast.error('Algo paso que no se guardo D:');
      return;
    }

    currentStateArr.value = [];
    formDataChangeState.cantidad = 0;

    pedidoStore.pedido.productos.forEach((item) => {
      if (item.itemid === itemId) Object.assign(item.detalle, result.detalle);
    });

    Toast.success('Cambio realizado de forma correcta');
  };

  const onHandleErroresItems = async () => {
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
    formDataErrores,
    formDataChangeState,
    currentStateArr,

    onHandleChangeItemsState,
    onHandleErroresItems,
    addClassIsInStateArr,
    addStateForItem,
  };
};
