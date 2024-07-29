import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

export const CheckAuth = async (): Promise<boolean> => {
  try {
    await doblevApi.get('/configuracion/cotizacion', {
      headers,
    });

    return true;
  } catch (error) {
    return false;
  }
};
