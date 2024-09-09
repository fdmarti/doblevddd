import { useFetch } from '@common/composables';
import type { Pedido } from '@pedidos/interfaces/pedido.response';

export const GetPedidoById = async (pedidoId: string): Promise<Pedido | null> => {
  const { data, error } = await useFetch(`/ventas/${pedidoId}/detalle`);

  if (error) return null;

  return data;
};
