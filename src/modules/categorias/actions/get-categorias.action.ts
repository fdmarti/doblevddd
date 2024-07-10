import { isAxiosError } from 'axios';

import { doblevApi } from '@/api/doblevApi';
import { getHeaders } from '@/api/headersApi';
import type { Categorias } from '@categorias/interfaces/categorias.response';

export const GetCategorias = async (): Promise<Categorias | undefined> => {
  try {
    const { data } = await doblevApi.get<Categorias>('/categorias', {
      headers: getHeaders(),
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw {
        message: 'Token timeout',
        tokenExpired: true,
      };
    }
  }
};
