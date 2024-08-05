<template>
    <dialog id="modal-form-pieza" class="modal" :open="open">
        <div class="modal-box">
            <div class="border-b border-blue-500 pb-5">
                <h2 class="text-xl font-bold">Pieza</h2>
            </div>
            <div class="my-5">
                <form @submit.prevent="handlePiezaForm" class="flex flex-col gap-2">
                    <label class="input input-bordered flex items-center gap-2">
                        <input type="text" placeholder="Nombre de la pieza" class="grow" id="pieza-description"
                            name="pieza-description" autocomplete="name" v-model="formData.descripcion">
                        <PuzzleIcon />
                    </label>
                    <section class="flex justify-between">
                        <label class="input input-bordered flex items-center gap-2">
                            <input type="number" placeholder="Horas" class="grow" id="pieza-hours" name="pieza-hours"
                                v-model="formData.horas">
                        </label>
                        <label class="input input-bordered flex items-center gap-2">
                            <input type="number" placeholder="Minutos" class="grow" id="pieza-minutes"
                                name="pieza-minutes" v-model="formData.minutos">
                        </label>
                    </section>
                    <label class="input input-bordered flex items-center gap-2">
                        <input type="number" placeholder="Peso (En g)" class="grow" id="pieza-weight"
                            name="pieza-weight" v-model="formData.peso">
                    </label>
                    <div class="border-t border-t-blue-500 pt-5 flex items-center justify-between">
                        <button @click="emits('close')" class="btn btn-error" type="button">Cancelar</button>
                        <button class="btn btn-success" type="submit">Confirmar</button>
                    </div>
                </form>
            </div>

        </div>
    </dialog>
    <BackgroundModal v-if="open" />
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

import { Toast } from '@utils/index'
import BackgroundModal from '@common/components/content/BackgroundModal.vue';
import type { Pieza } from '@productos/interfaces/Pieza';
import { PuzzleIcon } from '@common/components/icons'


interface Props {
    open: boolean;
}

defineProps<Props>()
const emits = defineEmits(['close', 'savePieza'])

const piezaInitialState = {
    descripcion: '',
    horas: null,
    minutos: null,
    peso: null
}

const formData = reactive<Pieza>({ ...piezaInitialState })

const handlePiezaForm = () => {
    if (formData.descripcion.trim().length <= 3) {
        Toast.error('El nombre de la pieza debe ser mayor a 3')
        return
    }

    if (!formData.horas) {
        Toast.error('Debe ingresar un numero de horas validas')
        return
    }

    if (!formData.minutos) {
        Toast.error('Debe ingresar un numero de minutos validos')
        return
    }

    if (!formData.peso) {
        Toast.error('Debe ingresar un numero de peso valido.')
        return
    }

    emits('savePieza', formData)
    Object.assign(formData, piezaInitialState)

}


</script>