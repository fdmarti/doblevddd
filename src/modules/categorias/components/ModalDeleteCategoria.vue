<template>
    <dialog id="modal-form-categoria" class="modal" :open="open">
        <div class="modal-box">
            <div class="border-b border-blue-300 pb-5">
                <h2 class="text-xl font-bold">
                    Confirmar eliminar categoria
                </h2>
            </div>
            <div class="my-5">
                <p class="text-lg font-semibold text-center pb-5">
                    ¿Seguro que queres eliminar la categoria {{ props.deleteCategory?.descripcion }} ?
                </p>
                <div class="border-t border-t-blue-300 pt-5 flex items-center justify-between">
                    <button @click="emits('close')" class="btn btn-error" type="button">Cancelar</button>
                    <button class="btn btn-success" type="button" @click="handleDeleteCategory">Confirmar</button>
                </div>
            </div>
        </div>
    </dialog>
    <BackgroundModal v-if="open" />
</template>
<script lang="ts" setup>
import { useToast } from 'vue-toastification';
import BackgroundModal from '@common/components/content/BackgroundModal.vue';
import { useCategoriaStore } from '@categorias/store/categoriaStore'
import type { Categoria } from '@categorias/interfaces/categorias.response'

const toast = useToast()

interface Props {
    open: boolean,
    deleteCategory?: Categoria | null
}

const props = defineProps<Props>()

const emits = defineEmits(['close'])

const { deleteCategoria } = useCategoriaStore()

const handleDeleteCategory = async () => {
    const result = await deleteCategoria(props.deleteCategory!.id)

    if (result) {
        toast.success('Cateogria guardada');
        emits('close')
    }
}

</script>