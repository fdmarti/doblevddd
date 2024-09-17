import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

interface PedidoEntregadoSuccess {
  status: true;
}

interface PedidoEntregadoError {
  status: false;
}

export const EntregarPedido = async (pedidoId: number) => {
  try {
    const { data } = await doblevApi.put<PedidoEntregadoSuccess | PedidoEntregadoError>(
      `/ventas/${pedidoId}/entregado`,
      {},
      { headers },
    );

    if (!data.status) throw new Error('Error al entregar el paquete');

    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};
