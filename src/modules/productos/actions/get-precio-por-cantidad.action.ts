import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

export const GetPriceByAmount = async (productoId: number, cantidad: number) => {
  try {
    const { data } = await doblevApi.get(`/productos/${productoId}/precioPorCantidad`, {
      headers,
      params: { cantidad },
    });

    console.log(data);
  } catch (error) {
    return error;
  }
};
