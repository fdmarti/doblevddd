import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

export interface ExtraDeleteSuccess {
  status: true;
}

export interface ExtraDeleteError {
  status: false;
}

export const DeleteExtra = async (
  extraId: number,
): Promise<ExtraDeleteSuccess | ExtraDeleteError> => {
  try {
    const { data } = await doblevApi.delete<ExtraDeleteSuccess>(`/extras/${extraId}`, {
      headers,
    });

    if (data.status) {
      return data;
    }

    return {
      status: false,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};
