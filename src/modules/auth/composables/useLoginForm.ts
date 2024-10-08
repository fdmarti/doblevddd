import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from '@utils/index';
import { useAuthStore } from '@auth/store/auth.store';

export const useLoginForm = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  const formLoginInitialState = {
    username: '',
    password: '',
  };

  const formData = reactive({ ...formLoginInitialState });

  const onSubmitLogin = async () => {
    if (formData.username.trim() === '') {
      Toast.error('Debe ingresar un usuario');
      return;
    }

    if (formData.password.trim() === '') {
      Toast.error('Debe ingresar una contraseña');
      return;
    }

    const resp = await authStore.login(formData.username, formData.password);

    if (!resp) {
      Toast.error('Credenciales incorrectas');
      return;
    }
    router.replace({ name: 'pedidos' });
  };

  const resetFormLogin = () => {
    Object.assign(formData, formLoginInitialState);
  };

  return {
    formData,

    onSubmitLogin,
    resetFormLogin,
  };
};
