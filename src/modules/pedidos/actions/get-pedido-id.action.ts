import { isAxiosError } from 'axios';

import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { Pedido } from '@pedidos/interfaces/pedido.response';
import { pedidoInit } from '@pedidos/utils';

export const GetPedidoById = async (pedidoId: string) => {
  try {
    const { data } = await doblevApi.get<Pedido>(`/ventas/${pedidoId}/detalle`, {
      headers,
    });

    if (!data) {
      return { ...pedidoInit };
    }

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw {
        message: 'Token timeout',
        tokenExpired: true,
      };
    }

    return { ...pedidoInit };
  }
};
