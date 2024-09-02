import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { Gasto, Gastos } from '@gastos/interfaces/Gastos';

export const GetGastos = async (filtro: string = ''): Promise<Gasto[] | []> => {
  let urlRequest = '/gastos';

  if (filtro.trim().length > 0) {
    const date = filtro.split('-');
    urlRequest = `/gastos?mes=${date[1]}&anio=${date[0]}`;
  }
  try {
    const { data } = await doblevApi.get<Gastos>(urlRequest, { headers });
    return data.gastos;
  } catch (error) {
    return [];
  }
};
