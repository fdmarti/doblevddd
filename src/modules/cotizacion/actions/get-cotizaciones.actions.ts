import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';
import type { Cotizaciones } from '@cotizacion/interface';

export interface CotizacionSuccess {
  status: true;
  cotizaciones: Cotizaciones;
}

export interface CotizacionError {
  status: false;
}

export const GetCotizaciones = async (): Promise<CotizacionSuccess | CotizacionError> => {
  try {
    const { data } = await doblevApi.get<Cotizaciones>('/configuracion/cotizacion', {
      headers,
    });

    if (data) {
      return {
        status: true,
        cotizaciones: data,
      };
    }

    return {
      status: false,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};
