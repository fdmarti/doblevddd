import { doblevApi } from '@/api/doblevApi';
import type { PrecioUnitarioForm } from '../interfaces/Precio/Precio.form';
import { headers } from '@/api/headersApi';

interface UpdatePrecioSuccess {
  status: true;
}

interface UpdatePrecioError {
  status: false;
}

export const UpdatePrecioProducto = async (
  precioData: PrecioUnitarioForm,
  productoId: number,
): Promise<UpdatePrecioSuccess | UpdatePrecioError> => {
  try {
    const { data } = await doblevApi.post(
      `/productos/${productoId}/precio`,
      {
        ...precioData,
        id: productoId,
      },
      {
        headers,
      },
    );

    if (data.status) {
      return {
        status: true,
      };
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
