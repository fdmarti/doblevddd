import { useFetch } from '@common/composables';
import type { PagosList } from '@pagos/interfaces';

export const GetPagos = async (filtro: string = ''): Promise<PagosList[] | null> => {
  let urlRequest = '/pagos';

  if (filtro.trim().length > 0) {
    const date = filtro.split('-');
    urlRequest = `/pagos?mes=${date[1]}&anio=${date[0]}`;
  }

  const { data, error } = await useFetch(urlRequest);

  if (error) return null;
  return data;
};
