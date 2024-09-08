import { useFetch } from '@common/composables';
import type { Cotizaciones } from '@cotizacion/interface';

export interface CotizacionSuccess {
  status: true;
  cotizaciones: Cotizaciones;
}

export interface CotizacionError {
  status: false;
}

export const GetCotizaciones = async (): Promise<CotizacionSuccess | CotizacionError> => {
  const { data, error } = await useFetch('/configuracion/cotizacion');

  if (error) return { status: false };

  return {
    status: true,
    cotizaciones: data,
  };
};
