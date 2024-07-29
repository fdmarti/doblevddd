import { isAxiosError } from 'axios';

import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { Producto, Productos } from '@productos/interfaces/productos.response';

export const GetProductos = async (): Promise<Producto[] | []> => {
  try {
    const { data } = await doblevApi.get<Productos>('/productos', {
      headers,
    });

    return data.productos;
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
