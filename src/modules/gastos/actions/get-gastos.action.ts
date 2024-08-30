import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { Gasto, Gastos } from '@gastos/interfaces/Gastos';

export const GetGastos = async (): Promise<Gasto[] | []> => {
  try {
    const { data } = await doblevApi.get<Gastos>('/gastos', { headers });
    return data.gastos;
  } catch (error) {
    return [];
  }
};
