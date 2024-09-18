import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { sleep } from '@/utils/sleep';

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
      const result = await GetPagos(filtro);

      if (!result) throw new Error('Error al cargar los pagos');

      pagos.value = result;
      await sleep(0.5);
      isLoading.value = false;
      return true;
    } catch (error) {
      isLoading.value = false;
      return false;
    }
  };

  const getPagosByPedido = async (pedidoId: string) => {
    try {
      const result = await GetPagosByPedido(pedidoId);

      if (!result) throw new Error('Error al cargar los pagos por pedido');

      pagosByPedido.value = result;

      isLoading.value = false;
      return true;
    } catch (error) {
      isLoading.value = false;
      return false;
    }
  };

  const getMediosPagos = async () => {
    if (mediosPagos.value.length > 0) return;

    try {
      const result = await GetMediosPagos();

      if (!result) throw new Error('Error al cargar los medios de pago');

      mediosPagos.value = result.mediosDePago;
      return true;
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

  const clearPagosStore = () => {
    pagosByPedido.value = [];
    pagos.value = [];
  };

  return {
    pagos: computed(() => pagos.value),
    pagosTotal: computed(() => pagos.value.reduce((el, acc) => el + acc.monto, 0)),
    precioRestanteAPagar: computed(() => {
      let paid = 0;

      for (let i = 0; i < pagosByPedido.value.length; i++) {
        paid = paid + pagosByPedido.value[i].monto;
      }
      return pedidosStore.pedido.preciototal - paid;
    }),
    pagosByPedido,
    mediosPagos,
    isLoading,

    getPagos,
    getPagosByPedido,
    deletePago,
    getMediosPagos,
    savePago,
    clearPagosStore,
  };
});
