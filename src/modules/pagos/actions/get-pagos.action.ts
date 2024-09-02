import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { Pagos } from '@pagos/interfaces';

export const GetPagos = async (): Promise<Pagos[] | []> => {
  try {
    const { data } = await doblevApi.get<Pagos[]>('/pagos', { headers });

    return data;
  } catch (error) {
    return [];
  }
};
