<template>
  <div
    class="flex flex-col gap-4 mt-20 bg-base-300 w-full max-w-lg rounded-lg shadow-2xl p-10 sm:mx-0 mx-10"
  >
    <h1 class="text-4xl font-bold text-center">Login</h1>
    <form
      class="flex flex-col gap-5"
      @submit.prevent="onSubmitLogin"
      id="login-form"
      name="login-form"
    >
      <label class="input input-bordered flex items-center gap-2">
        <input
          type="text"
          placeholder="Usuario"
          class="grow"
          id="username"
          name="username"
          autocomplete="username"
          v-model="formData.username"
        />
      </label>

      <label class="input input-bordered flex items-center gap-2">
        <input
          :type="inputType"
          class="grow"
          id="password"
          name="password"
          placeholder="Contraseña"
          autocomplete="current-password"
          v-model="formData.password"
        />
        <EyeIcon @click="onChangeInputType" v-if="isPasswordType" />
        <EyeOffIcon @click="onChangeInputType" v-else />
      </label>
      <DButton
        color="primary"
        type="submit"
        :disabled="authStore.isLoading"
        :is-loading="authStore.isLoading"
      >
        <span class="text-lg"> Ingresar </span>
      </DButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { EyeIcon, EyeOffIcon } from '@common/components/icons';
import { usePassword } from '@common/composables/usePassword';
import { useAuthStore } from '@auth/store/auth.store';
import { useLoginForm } from '@auth/composables';

const { inputType, onChangeInputType, isPasswordType } = usePassword();
const authStore = useAuthStore();
const { formData, onSubmitLogin, resetFormLogin } = useLoginForm();

onMounted(() => {
  authStore.logout();
});

onUnmounted(() => {
  resetFormLogin();
});
</script>
