import { isAxiosError } from 'axios';
import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

export interface SuccessDeletePago {
  status: true;
}

export interface ErrorDeletePago {
  status: false;
}

export const DeleteGasto = async (pagoId: number): Promise<SuccessDeletePago | ErrorDeletePago> => {
  try {
    const { data } = await doblevApi.delete<SuccessDeletePago | ErrorDeletePago>(
      `/pagos/${pagoId}`,
      { headers },
    );

    if (!data.status) throw new Error('Error in delete in delete pago');

    return {
      status: true,
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
