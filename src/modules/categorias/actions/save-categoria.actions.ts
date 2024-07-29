import { isAxiosError } from 'axios';
import type { NewCategoria } from '@categorias/interfaces/Categoria';
import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

export interface CategorySuccess {
  status: true;
  idcategoria: number;
}

export interface CategoryError {
  status: false;
}
export const SaveCategory = async (
  paramsCategory: NewCategoria,
): Promise<CategorySuccess | CategoryError> => {
  try {
    const result = await handleSaveCategory(paramsCategory);

    if (result.status) {
      return {
        status: true,
        idcategoria: result.idcategoria,
      };
    }

    return {
      status: false,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      throw {
        message: 'Token timeout',
        tokenExpired: true,
      };
    }
    return {
      status: false,
    };
  }
};

const handleSaveCategory = async (
  category: NewCategoria,
): Promise<CategorySuccess | CategoryError> => {
  const { id } = category;

  try {
    if (!id) {
      const { data } = await doblevApi.post<CategorySuccess>(
        '/categorias',
        { ...category },
        { headers },
      );

      return {
        status: true,
        idcategoria: data.idcategoria,
      };
    }

    const { data } = await doblevApi.put<CategorySuccess>(
      `/categorias/${id}`,
      { ...category },
      { headers },
    );

    return {
      status: true,
      idcategoria: data.idcategoria,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};
