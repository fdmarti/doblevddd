import { doblevApi } from '@/api/doblevApi';
import { getHeaders } from '@/api/headersApi';

import type { Pedidos, Venta } from '@pedidos/interfaces/pedidos.response';
import { isAxiosError } from 'axios';

export const GetPedidosActions = async (): Promise<Venta[] | undefined> => {
  try {
    const { data } = await doblevApi.get<Pedidos>('/ventas', {
      headers: getHeaders(),
    });

    return data.ventas;
  } catch (error) {
    if (isAxiosError(error)) {
      throw {
        message: 'Token timeout',
        tokenExpired: true,
      };
    }
  }
};
