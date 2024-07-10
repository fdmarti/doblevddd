import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useStorage } from '@vueuse/core';

import { AuthStatus } from '@auth/interface/auth-status.enum';
import { LoginAction } from '@auth/actions/login.action';
import { CheckAuth } from '@auth/actions/check-auth.action';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatus.unAuthenticated);
  const token = ref(useStorage(import.meta.env.VITE_TOKEN_LOCALSTORAGE_NAME, ''));
  const isLoading = ref(false);

  const login = async (username: string, password: string): Promise<boolean> => {
    isLoading.value = true;
    try {
      const resp = await LoginAction(username, password);

      if (!resp.ok) {
        logout();
        return false;
      }

      token.value = resp.token;
      authStatus.value = AuthStatus.Authenticated;
      isLoading.value = false;

      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  const checkAuthStatus = async () => {
    const resp = await CheckAuth();

    if (resp) {
      authStatus.value = AuthStatus.Authenticated;
    } else {
      logout();
    }
  };

  const logout = () => {
    token.value = '';
    authStatus.value = AuthStatus.unAuthenticated;
    isLoading.value = false;
    return false;
  };

  return {
    isLoading,
    authStatus,

    isAuth: computed(() => (authStatus.value === AuthStatus.Authenticated ? true : false)),

    login,
    logout,
    checkAuthStatus,
  };
});
