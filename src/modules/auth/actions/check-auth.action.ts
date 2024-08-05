import { doblevApi } from '@/api/doblevApi';

export const CheckAuth = async (): Promise<boolean> => {
  const token = localStorage.getItem(import.meta.env.VITE_TOKEN_LOCALSTORAGE_NAME);
  try {
    await doblevApi.get('/configuracion/cotizacion', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};
