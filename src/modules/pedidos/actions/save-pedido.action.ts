import { isAxiosError } from 'axios';
import type { NuevoPedido } from '@pedidos/interfaces/NuevoPedido';
import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

export interface SavePedidoSuccess {
  id: number;
  status: true;
}

export interface SavePedidoError {
  status: false;
}

export const SavePedido = async (
  newPedido: NuevoPedido,
): Promise<SavePedidoSuccess | SavePedidoError> => {
  try {
    const { data } = await doblevApi.post<SavePedidoSuccess | SavePedidoSuccess>(
      `/ventas`,
      newPedido,
      { headers },
    );

    if (data.status) {
      return {
        status: true,
        id: data.id,
      };
    }

    return {
      status: false,
    };

    console.log(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw {
        message: 'Token timeout',
        tokenExpired: true,
      };
    }

    return {
      status: false,
    };
  }
};
