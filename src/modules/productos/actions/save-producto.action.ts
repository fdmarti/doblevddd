import { isAxiosError } from 'axios';

import { doblevApi } from '@/api/doblevApi';
import { getHeaders } from '@/api/headersApi';
import type { Producto } from '@productos/interfaces/Producto';

export interface SuccessProducto {
  status: true;
  idproducto: number;
}

export interface ErrorProducto {
  status: false;
}

export interface ProductoSaved {
  idproducto: number;
}

export const SaveProducto = async (
  paramsProduct: Producto,
): Promise<SuccessProducto | ErrorProducto> => {
  const { categoria, extras, piezas, productName } = paramsProduct;

  try {
    const { data } = await doblevApi.post<ProductoSaved>(
      '/productos',
      {
        descripcion: productName,
        extras,
        piezas,
        idCategoria: categoria,
      },
      {
        headers: getHeaders(),
      },
    );

    if (data.idproducto) {
      return {
        status: true,
        idproducto: data.idproducto,
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
