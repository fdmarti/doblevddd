import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { FormPagos } from '@pagos/interfaces';

export interface SuccessSavePago {
  idPago: number;
  status: true;
}

export interface ErrorSavePago {
  status: false;
}

export const SavePago = async (formPagos: FormPagos): Promise<SuccessSavePago | ErrorSavePago> => {
  try {
    const { data } = await doblevApi.post<SuccessSavePago | ErrorSavePago>(
      `/pagos`,
      { ...formPagos, idVenta: formPagos.pedidoId },
      { headers },
    );

    if (!data.status)
      return {
        status: false,
      };

    return {
      idPago: data.idPago,
      status: true,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};
