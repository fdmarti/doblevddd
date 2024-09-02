import { isAxiosError } from 'axios';
import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

import type { Pagos } from '@pagos/interfaces';

export const GetPagosByPedido = async (pedidoId: string): Promise<Pagos[] | []> => {
  try {
    const { data } = await doblevApi.get<Pagos[] | []>(`/ventas/${pedidoId}/pagos`, { headers });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw {
        message: 'Token timeout',
        tokenExpired: true,
      };
    }

    return [];
  }
};
