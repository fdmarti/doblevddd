import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

interface DeleteSuccess {
  status: true;
}

interface DeleteError {
  status: false;
}

export const DeleteImage = async (productId: number): Promise<DeleteSuccess | DeleteError> => {
  try {
    const { data } = await doblevApi.delete<DeleteSuccess | DeleteError>(
      `/productos/${productId}/imagen`,
      { headers },
    );

    if (!data.status) throw new Error('Error al eliminar la imagen');

    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};
