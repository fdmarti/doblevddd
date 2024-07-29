import { isAxiosError } from 'axios';
import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

export const DeletePedidoAction = async (pedidoId: number): Promise<Boolean> => {
  try {
    const { status } = await doblevApi.delete(`/ventas/${pedidoId}`, {
      headers,
    });

    if (status == 200) {
      return true;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw {
        message: 'Token timeout',
        tokenExpired: true,
      };
    }
  }

  return false;
};
