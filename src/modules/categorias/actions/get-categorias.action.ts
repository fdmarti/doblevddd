import type { Categorias } from '@categorias/interfaces/categorias.response';
import { useFetch } from '@common/composables';

export const GetCategorias = async (): Promise<Categorias | null> => {
  const { data, error } = await useFetch('/categorias');

  if (error) return null;

  return data;
};
