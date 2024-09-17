import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

interface PiezaDetailSucces {
  pieza: {
    horas: number;
    minutos: number;
    peso: number;
  };
  status: true;
}

interface PiezaDetailError {
  pieza: null;
  status: false;
}

export const PostPiezaDetail = async (piezaDetail: { time: number; filament_used: number }) => {
  try {
    const { filament_used, time } = piezaDetail;
    const { data } = await doblevApi.post<PiezaDetailSucces | PiezaDetailError>(
      '/productos/precioPieza',
      {
        time,
        filament_used,
      },
      { headers },
    );

    if (!data.status) throw new Error('Error al traer los datos de la pieza');

    return {
      status: true,
      pieza: data.pieza,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};
