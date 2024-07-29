import { isAxiosError } from 'axios';

import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { Categoria, Categorias } from '@categorias/interfaces/categorias.response';

export const GetCategorias = async (): Promise<Categoria[] | []> => {
  try {
    const { data } = await doblevApi.get<Categorias>('/categorias', {
      headers,
    });

    return data.categorias;
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
