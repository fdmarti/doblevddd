import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

import type { MediosPagos, MediosDePago } from '@pagos/interfaces';

export const GetMediosPagos = async (): Promise<MediosDePago[] | []> => {
  try {
    const { data } = await doblevApi.get<MediosPagos>('/mediosDePago', { headers });

    if (!data.mediosDePago) return [];

    return data.mediosDePago;
  } catch (error) {
    return [];
  }
};
