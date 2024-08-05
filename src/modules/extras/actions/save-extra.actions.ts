import { isAxiosError } from 'axios';
import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

import type { Extra } from '@extras/interface/extras.response';

export interface ExtraSuccess {
  status: true;
  idextra: number;
}

export interface ExtraError {
  status: false;
}
export const SaveExtra = async (paramsExtra: Extra): Promise<ExtraSuccess | ExtraError> => {
  try {
    const result = await handleSaveExtra(paramsExtra);

    if (result.status) {
      return {
        status: true,
        idextra: result.idextra,
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

const handleSaveExtra = async (extra: Extra): Promise<ExtraSuccess | ExtraError> => {
  const { id } = extra;

  try {
    if (!id) {
      const { data } = await doblevApi.post<ExtraSuccess>('/extras', { ...extra }, { headers });

      return {
        status: true,
        idextra: data.idextra,
      };
    }

    const { data } = await doblevApi.put<ExtraSuccess>(`/extras/${id}`, { ...extra }, { headers });

    return {
      status: true,
      idextra: data.idextra,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};
