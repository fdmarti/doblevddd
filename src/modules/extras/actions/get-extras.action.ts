import { isAxiosError } from 'axios';

import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { Extra, Extras } from '@extras/interface/extras.response';

export const GetExtras = async (): Promise<Extra[] | []> => {
  try {
    const { data } = await doblevApi.get<Extras>('/extras', {
      headers,
    });

    return data.extras;
  } catch (error) {
    if (isAxiosError(error)) {
      throw {
        message: 'Token timeout',
        tokenExpired: true,
      };
    }

    return [];
  }
};
