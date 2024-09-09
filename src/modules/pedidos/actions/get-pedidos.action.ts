import { useFetch } from '@common/composables';

import type { Pedidos } from '@pedidos/interfaces/pedidos.response';

export const GetPedidosActions = async (): Promise<Pedidos | null> => {
  const { data, error } = await useFetch('/ventas');

  if (error) return null;

  return data;
};
