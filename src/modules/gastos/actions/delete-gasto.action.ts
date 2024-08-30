import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

interface DeleteGastoSuccess {
  status: true;
}

interface DeleteGastoError {
  status: false;
}

export const DeleteGasto = async (gastoId: number): Promise<boolean> => {
  try {
    const { data } = await doblevApi.delete<DeleteGastoSuccess | DeleteGastoError>(
      `/gastos/${gastoId}`,
      { headers },
    );
    if (data.status) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};
