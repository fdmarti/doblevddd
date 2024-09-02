import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { PagosList } from '@pagos/interfaces';

export const GetPagos = async (filtro: string = ''): Promise<PagosList[] | []> => {
  let urlRequest = '/pagos';

  if (filtro.trim().length > 0) {
    const date = filtro.split('-');
    urlRequest = `/pagos?mes=${date[1]}&anio=${date[0]}`;
  }

  try {
    const { data } = await doblevApi.get<PagosList[]>(urlRequest, { headers });

    return data;
  } catch (error) {
    return [];
  }
};
