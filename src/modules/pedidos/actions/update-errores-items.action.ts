import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

import type { ErrorChangeStateItem, SuccessChangeStateItem } from './change-items-state.action';

export const UpdateErrorsCountItem = async (
  pedidoId: number,
  itemId: string,
  cantidad: number,
): Promise<SuccessChangeStateItem | ErrorChangeStateItem> => {
  try {
    const { data } = await doblevApi.put<SuccessChangeStateItem | ErrorChangeStateItem>(
      `/ventas/${pedidoId}/error/${itemId}`,
      { cantidad },
      { headers },
    );

    console.log(data);

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
