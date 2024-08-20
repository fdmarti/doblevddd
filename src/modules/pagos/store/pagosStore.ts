import { ref } from 'vue';
import { defineStore } from 'pinia';
import { GetPagos, DeleteGasto, GetMediosPagos, SavePago } from '@pagos/actions';
import type { MediosDePago, Pagos, FormPagos } from '@pagos/interfaces';
import { usePedidosStore } from '@pedidos/store/pedidosStore';

export const usePagosStore = defineStore('pagos', () => {
  const pedidosStore = usePedidosStore();

  const isLoading = ref(true);
  const pagos = ref<Pagos[]>([]);
  const mediosPagos = ref<MediosDePago[]>([]);

  const getPagos = async (pedidoId: string) => {
    try {
      pagos.value = await GetPagos(pedidoId);

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

      await getPagos(formPagos.pedidoId);

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

      const valorGasto = pagos.value.find((pago) => pago.id === pagoId);

      if (valorGasto) {
        pedidosStore.pedido.senia = pedidosStore.pedido.senia - valorGasto.monto;
      }

      pagos.value = pagos.value.filter((pago) => pago.id !== pagoId);

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    pagos,
    mediosPagos,
    isLoading,

    getPagos,
    deletePago,
    getMediosPagos,
    savePago,
  };
});
