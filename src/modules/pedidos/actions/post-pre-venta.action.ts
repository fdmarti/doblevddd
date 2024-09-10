import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { PreVenta, Producto } from '@pedidos/interfaces/NuevoPedido';

interface PreVentaError {
  status: false;
}

export const GeneratePreVenta = async (
  hash: string,
  productos: Producto[],
): Promise<PreVenta | PreVentaError> => {
  try {
    const { data } = await doblevApi.post<PreVenta>(
      '/preVenta',
      {
        hash,
        productos,
      },
      { headers },
    );

    console.log(data);

    if (!data.status) throw new Error('Error al generar la preventa');

    return {
      preVenta: data.preVenta,
      status: true,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};
