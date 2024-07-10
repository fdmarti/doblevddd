import { doblevApi } from '@/api/doblevApi';
import type { AuthResponse } from '@auth/interface/auth.response.interface';

interface LoginSuccess {
  ok: true;
  username: string;
  token: string;
}

interface LoginError {
  ok: false;
}

export const LoginAction = async (
  username: string,
  password: string,
): Promise<LoginSuccess | LoginError> => {
  try {
    const { data } = await doblevApi.post<AuthResponse>('/login', {
      usuario: username,
      password,
    });

    return {
      ok: true,
      username,
      token: data.token,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};
