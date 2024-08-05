import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

export interface CatalogoSuccess {
  status: true;
}

export interface CatalogoError {
  status: false;
}

export const ToggleStateCatalogo = async (
  categoriaId: number,
): Promise<CatalogoSuccess | CatalogoError> => {
  try {
    if (!categoriaId) return { status: false };

    const { data } = await doblevApi.put<CatalogoSuccess | CatalogoError>(
      `/categorias/catalogo`,
      {
        id: categoriaId,
      },
      {
        headers,
      },
    );

    if (!data.status) return { status: false };

    return { status: true };
  } catch (error) {
    return {
      status: false,
    };
  }
};
