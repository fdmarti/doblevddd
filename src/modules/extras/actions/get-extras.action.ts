import type { Extras } from '@extras/interface/extras.response';
import { useFetch } from '@common/composables';

export const GetExtras = async (): Promise<Extras | null> => {
  const { data, error } = await useFetch('/extras');

  if (error) return null;

  return data;
};
