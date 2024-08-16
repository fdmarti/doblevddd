import { isAxiosError } from 'axios';

import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { Pedido } from '@pedidos/interfaces/pedido.response';

export const GetPedidoById = async (pedidoId: string) => {
  try {
    const { data } = await doblevApi.get<Pedido>(`/ventas/${pedidoId}/detalle`, {
      headers,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw {
        message: 'Token timeout',
        tokenExpired: true,
      };
    }
  }
};
