import { useFetch } from '@/modules/common/composables';
import type { Gastos } from '@gastos/interfaces/Gastos';

export const GetGastos = async (filtro: string = ''): Promise<Gastos | null> => {
  let urlRequest = '/gastos';

  if (filtro.trim().length > 0) {
    const date = filtro.split('-');
    urlRequest = `/gastos?mes=${date[1]}&anio=${date[0]}`;
  }

  const { data, error } = await useFetch(urlRequest);

  if (error) return null;

  return data;
};
