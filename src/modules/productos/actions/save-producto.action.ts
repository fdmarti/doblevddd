import { isAxiosError } from 'axios';

import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { Producto } from '@productos/interfaces/Producto';
import type { ProductEdit } from '@productos/interfaces/producto.edit.response';

export interface SuccessProducto {
  status: true;
  idproducto: number;
}

export interface ErrorProducto {
  status: false;
}

export const SaveProducto = async (
  paramsProduct: Producto,
): Promise<SuccessProducto | ErrorProducto> => {
  try {
    const result = await handleResultProductSaved(paramsProduct);

    if (result.status) {
      return {
        status: true,
        idproducto: result.idproducto,
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

const handleResultProductSaved = async (
  paramsProduct: Producto,
): Promise<SuccessProducto | ErrorProducto> => {
  const { categoria, extras, piezas, productName, productId } = paramsProduct;

  if (productId) {
    const { data } = await doblevApi.put<ProductEdit>(
      `/productos/${productId}`,
      {
        descripcion: productName,
        extras,
        piezas,
        idCategoria: categoria,
        estado: true,
      },
      {
        headers,
      },
    );

    if (data) {
      const { producto } = data;
      return {
        status: true,
        idproducto: producto.id,
      };
    }

    return {
      status: false,
    };
  } else {
    const { data } = await doblevApi.post<SuccessProducto>(
      `/productos`,
      {
        descripcion: productName,
        extras,
        piezas,
        idCategoria: categoria,
      },
      {
        headers,
      },
    );

    if (data) {
      return {
        status: true,
        idproducto: data.idproducto,
      };
    }

    return {
      status: false,
    };
  }
};
