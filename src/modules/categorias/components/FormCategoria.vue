<template>
    <dialog id="modal-form-categoria" class="modal" :open="open">
        <div class="modal-box">
            <div class="border-b border-blue-300 pb-5">
                <h2 class="text-xl font-bold">
                    {{ props.category?.isEditing ? 'Editar categoria' : 'Nueva categoria' }}
                </h2>
            </div>
            <div class="my-5">
                <form @submit.prevent="handleForm" class="flex flex-col gap-2">
                    <label class="input input-bordered flex items-center gap-2">
                        <input type="text" placeholder="Nombre de la categoria" class="grow" id="categoria-description"
                            name="categoria-description" autocomplete="name" v-model="formData.categoria">
                    </label>
                    <label class="input input-bordered flex items-center gap-2">
                        <input type="number" placeholder="0%" class="grow" id="category-margen" name="category-margen"
                            v-model="formData.margen">
                    </label>
                    <div class="border-t border-t-blue-300 pt-5 flex items-center justify-between">
                        <button @click="emits('close')" class="btn btn-error" type="button">Cancelar</button>
                        <button class="btn btn-success" type="submit">Guardar</button>
                    </div>
                </form>
            </div>

        </div>
    </dialog>
    <BackgroundModal v-if="open" />
</template>
<script lang="ts" setup>
import { watch } from 'vue';
import BackgroundModal from '@common/components/content/BackgroundModal.vue';
import { useCategoriaForm } from '@categorias/composables/useCategoriaForm';
import type { Categoria } from '@categorias/interfaces/categorias.response'

const { formData, handleCateogriaForm, handleEditCategory, resetCateogoryForm } = useCategoriaForm()

const handleForm = async () => {
    const result = await handleCateogriaForm()
    if (result) {
        emits('close')
    }
}

interface Props {
    category?: {
        category: Categoria,
        isEditing: boolean
    };
    open: boolean;
}

const props = defineProps<Props>()
const emits = defineEmits(['close'])

watch(props, (updProps) => {
    if (updProps.category?.isEditing) {
        handleEditCategory(updProps.category.category)
    } else {
        resetCateogoryForm()
    }
})


</script>