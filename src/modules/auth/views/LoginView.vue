<template>
    <div class="flex flex-col gap-4 mt-20 bg-base-300 w-full max-w-lg rounded-lg shadow-2xl p-10 sm:mx-0 mx-10">
        <h1 class="text-4xl font-bold text-center">Login</h1>
        <form class="flex flex-col gap-5" @submit.prevent="onSubmitLogin" id="login-form" name="login-form">
            <label class="input input-bordered flex items-center gap-2">
                <input type="text" placeholder="Usuario" class="grow" id="username" name="username"
                    ref="usernameInputRef" autocomplete="username" v-model="formData.username">
            </label>

            <label class="input input-bordered flex items-center gap-2">
                <input :type="inputType" class="grow" id="password" name="password" placeholder="Contraseña"
                    ref="passwordInputRef" autocomplete="current-password" v-model="formData.password" />
                <EyeIcon @click="onChangeInputType" v-if="isPasswordType" />
                <EyeOffIcon @click="onChangeInputType" v-else />
            </label>
            <button type="submit" class="btn btn-primary text-lg font-bold" :disabled="authStore.isLoading">
                <span v-if="authStore.isLoading" class="loading loading-spinner"></span>
                <span v-else>Ingresar</span>
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';
const toast = useToast()

import { EyeIcon, EyeOffIcon } from '@common/components/icons';

import { usePassword } from '@/modules/common/composables/usePassword';
const { inputType, onChangeInputType, isPasswordType } = usePassword();

import { useAuthStore } from '@auth/store/auth.store';
const authStore = useAuthStore();

import { useRouter } from 'vue-router';
const router = useRouter()


const usernameInputRef = ref<HTMLInputElement | null>(null)
const passwordInputRef = ref<HTMLInputElement | null>(null)


const formData = reactive({
    username: '',
    password: ''
})

const onSubmitLogin = async () => {
    if (formData.username === '') {
        return usernameInputRef.value?.focus()
    }

    if (formData.password === '') {
        return passwordInputRef.value?.focus()
    }

    const resp = await authStore.login(formData.username, formData.password)

    if (!resp) {
        toast.error('Credenciales incorrectas')
        return
    }
    router.replace({ name: 'pedidos' })
}


</script>

<style scoped></style>