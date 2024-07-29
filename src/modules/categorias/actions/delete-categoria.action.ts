import { isAxiosError } from 'axios';
import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

export interface DeleteSuccess {
  status: true;
}

export interface DeleteError {
  status: false;
}

export const DeleteCategoria = async (categoryId: number): Promise<DeleteSuccess | DeleteError> => {
  try {
    const { data } = await doblevApi.delete<Boolean>(`/categorias/${categoryId}`, {
      headers,
    });
    if (!data) throw new Error(data);

    return {
      status: true,
    };
  } catch (error) {
    console.error(`Error Delete categoria - ${error}`);
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
