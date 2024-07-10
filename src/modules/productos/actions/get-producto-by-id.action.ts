import { isAxiosError } from 'axios';

import { doblevApi } from '@/api/doblevApi';
import { getHeaders } from '@/api/headersApi';
import type { ProductoDetail } from '@productos/interfaces/producto.response';

export interface ProductoSuccess {
  status: true;
  producto: ProductoDetail;
}

export interface ProductoError {
  status: false;
}

export const GetProductosByID = async (
  productoId: string,
): Promise<ProductoSuccess | ProductoError> => {
  try {
    const { data } = await doblevApi.get<ProductoDetail>(`/productos/${productoId}`, {
      headers: getHeaders(),
    });

    if (data) {
      return {
        status: true,
        producto: data,
      };
    }

    return {
      status: false,
    };
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
