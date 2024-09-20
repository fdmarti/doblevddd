import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

interface UpdateMedioPagoSuccess {
  status: true;
}

interface UpdateMedioPagoError {
  status: false;
}

export const UpdateMedioPagoInPago = async (idPago: number, idMedioPago: number) => {
  try {
    const { data } = await doblevApi.put<UpdateMedioPagoSuccess | UpdateMedioPagoError>(
      '/moverPago',
      {
        idPago,
        idMedioPago,
      },
      { headers },
    );

    if (!data.status) throw Error();

    return true;
  } catch (error) {
    return false;
  }
};
