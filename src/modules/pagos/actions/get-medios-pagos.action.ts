import { useFetch } from '@common/composables';

import type { MediosPagos } from '@pagos/interfaces';

export const GetMediosPagos = async (): Promise<MediosPagos | null> => {
  const { data, error } = await useFetch('/mediosDePago');

  if (error) return null;

  return data;
};
