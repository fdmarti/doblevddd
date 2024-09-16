import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

export const EntregarPedido = async (pedidoId: number) => {
  try {
    const { data } = await doblevApi.put(`/ventas/${pedidoId}/entregado`, {}, { headers });

    console.log(data);
  } catch (error) {
    return error;
  }
};
