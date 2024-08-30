import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { Gasto, GastoForm } from '@gastos/interfaces/Gastos';

interface SaveGastoSuccess {
  status: true;
  gasto: Gasto;
}

interface SaveGastoError {
  status: false;
}

export const SaveGasto = async (
  formData: GastoForm,
): Promise<SaveGastoSuccess | SaveGastoError> => {
  try {
    const { data } = await doblevApi.post<SaveGastoSuccess | SaveGastoError>(
      '/gastos',
      [{ ...formData }],
      { headers },
    );

    if (!data.status) {
      return {
        status: false,
      };
    }

    return {
      status: true,
      gasto: data.gasto,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};
