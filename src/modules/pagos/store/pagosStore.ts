import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { GetPagosByPedido, DeleteGasto, GetMediosPagos, SavePago, GetPagos } from '@pagos/actions';
import type { MediosDePago, Pagos, FormPagos, PagosList } from '@pagos/interfaces';
import { usePedidosStore } from '@pedidos/store/pedidosStore';

export const usePagosStore = defineStore('pagos', () => {
  const pedidosStore = usePedidosStore();

  const isLoading = ref(true);
  const pagosByPedido = ref<Pagos[]>([]);
  const pagos = ref<PagosList[]>([]);
  const mediosPagos = ref<MediosDePago[]>([]);

  const getPagos = async (filtro: string = '') => {
    try {
      pagos.value = await GetPagos(filtro);

      isLoading.value = false;
      return true;
    } catch (error) {
      isLoading.value = false;
      return error;
    }
  };

  const getPagosByPedido = async (pedidoId: string) => {
    try {
      pagosByPedido.value = await GetPagosByPedido(pedidoId);

      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
      return false;
    }
  };

  const getMediosPagos = async () => {
    try {
      mediosPagos.value = await GetMediosPagos();
    } catch (error) {
      return false;
    }
  };

  const savePago = async (formPagos: FormPagos): Promise<Boolean> => {
    try {
      const result = await SavePago(formPagos);

      if (!result.status) return false;

      await getPagosByPedido(formPagos.pedidoId);

      pedidosStore.pedido.senia = pedidosStore.pedido.senia + formPagos.monto;

      return true;
    } catch (error) {
      return false;
    }
  };

  const deletePago = async (pagoId: number) => {
    try {
      const result = await DeleteGasto(pagoId);

      if (!result.status) return false;

      const valorGasto = pagosByPedido.value.find((pago) => pago.id === pagoId);

      if (valorGasto) {
        pedidosStore.pedido.senia = pedidosStore.pedido.senia - valorGasto.monto;
      }

      pagosByPedido.value = pagosByPedido.value.filter((pago) => pago.id !== pagoId);

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    pagos: computed(() => pagos.value),
    pagosByPedido,
    mediosPagos,
    isLoading,

    getPagos,
    getPagosByPedido,
    deletePago,
    getMediosPagos,
    savePago,
  };
});
