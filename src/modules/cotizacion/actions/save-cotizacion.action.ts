import { doblevApi } from '@/api/doblevApi';
import type { Cotizaciones } from '@cotizacion/interface';
import { headers } from '@/api/headersApi';

export interface CotizacionesSaveSucces {
  status: true;
}
export interface CotizacionesSaveError {
  status: false;
}

const successSave = { status: true };
const errorSave = { status: false };

export const SaveCotizacion = async (
  cotizaciones: Cotizaciones,
): Promise<CotizacionesSaveSucces | CotizacionesSaveError> => {
  try {
    const { data } = await doblevApi.put<CotizacionesSaveSucces | CotizacionesSaveError>(
      `/configuracion/cotizacion`,
      {
        ...cotizaciones,
      },
      {
        headers,
      },
    );

    if (data.status) return successSave;

    return errorSave;
  } catch (error) {
    return errorSave;
  }
};
