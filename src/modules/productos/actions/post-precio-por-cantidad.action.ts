import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { PrecioCantidad } from '@productos/interfaces/Precio/PrecioCantidad';

interface PriceByAmountSuccess extends PrecioCantidad {
  status: true;
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
