import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { NewItemState } from '@pedidos/interfaces/NuevoEstadoItem';
import type { Detalle } from '@pedidos/interfaces';

export interface SuccessChangeStateItem {
  detalle: Detalle;
  status: true;
}

export interface ErrorChangeStateItem {
  status: false;
}

export const UpdateStateItems = async (
  pedidoId: number,
  itemId: string,
  newState: NewItemState,
): Promise<SuccessChangeStateItem | ErrorChangeStateItem> => {
  try {
    const { data } = await doblevApi.put<SuccessChangeStateItem | ErrorChangeStateItem>(
      `/ventas/${pedidoId}/estadoItem/${itemId}`,
      { ...newState },
      { headers },
    );

    if (!data.status) {
      return {
        status: false,
      };
    }

    return data;
  } catch (error) {
    return {
      status: false,
    };
  }
};
