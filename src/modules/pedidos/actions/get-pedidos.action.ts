import { useFetch } from '@common/composables';

import type { Pedidos } from '@pedidos/interfaces/pedidos.response';

export const GetPedidosActions = async (): Promise<Pedidos[] | []> => {
  const { data, error } = await useFetch('/pedidos');

  if (error) return [];

  return data;
};
