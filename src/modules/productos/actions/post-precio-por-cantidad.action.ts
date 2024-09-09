import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

interface PriceByAmountSuccess {
  status: true;
  precio: { total: number; unidad: number; unidades: number };
}

interface PriceByAmountError {
  status: false;
}

export const GetPriceByAmount = async (
  productoId: number,
  cantidad: number,
): Promise<PriceByAmountSuccess | PriceByAmountError> => {
  try {
    const { data } = await doblevApi.post<PriceByAmountSuccess>(
      `/productos/${productoId}/precioPorCantidad`,
      { cantidad },
      { headers },
    );

    if (!data.status) throw new Error('Error al traer el precio por cantidad');

    return {
      status: true,
      precio: data.precio,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};
