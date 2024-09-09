import type { Pagos } from '@pagos/interfaces';
import { useFetch } from '@/modules/common/composables';

export const GetPagosByPedido = async (pedidoId: string): Promise<Pagos[] | null> => {
  const { data, error } = await useFetch(`/ventas/${pedidoId}/pagos`);

  if (error) return null;

  return data;
};
