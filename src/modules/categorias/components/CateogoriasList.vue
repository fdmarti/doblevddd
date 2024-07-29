<template>
    <section class="mb-5">
        <label class="input input-bordered flex items-center gap-2">
            <input type="text" class="grow" placeholder="Buscar" v-model="categoryStore.categoriasFilter"
                name="categoria-search" id="categoria-search" />
            <SearchIcon />
        </label>
    </section>

    <div class="overflow-x-auto mb-10">
        <table class="table bg-base-300">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Descripción</th>
                    <th>Productos</th>
                    <th>Margen</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody v-if="categoryStore.isLoading">
                <tr>
                    <td colspan="8">
                        <LoadingComponent />
                    </td>
                </tr>
            </tbody>
            <tbody v-else-if="categoryStore.categorias!.length === 0">
                <tr>
                    <td colspan="8">
                        No hay categorias
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr class="hover" v-for="categoria in categoryStore.categorias" :key="categoria.id">
                    <th>#{{ categoria.id }}</th>
                    <td>{{ categoria.descripcion }}</td>
                    <td>{{ categoria.productos }}</td>
                    <td>{{ categoria.margen }} % </td>
                    <td class="flex justify-center gap-2">
                        <button class="btn" @click="emits('edit', categoria)">
                            <EditIcon />
                        </button>
                        <button class="btn" @click="toggleDeleteCategory(categoria)">
                            <TrashIcon />
                        </button>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <section class="flex justify-center">
        <PaginationComponent :current-page="categoryStore.currentPage" @nextPage="nextPageCategorias"
            @previousPage="prevPageCategorias" :total-pages="categoryStore.totalPages" />
    </section>

    <ModalDeleteCategoria :open="showModalDelete" :deleteCategory="deleteCategory" @close="toggleDeleteCategory" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { LoadingComponent } from '@common/components';
import { ModalDeleteCategoria } from '@categorias/components'
import { SearchIcon, EditIcon, TrashIcon } from '@common/components/icons'
import { PaginationComponent } from '@common/components/pagination'
import { useCategoriaStore } from '@categorias/store/categoriaStore';
import type { Categoria } from '@categorias/interfaces/categorias.response'

const categoryStore = useCategoriaStore()
const { nextPageCategorias, prevPageCategorias } = categoryStore

const showModalDelete = ref(false)
const deleteCategory = ref<null | Categoria>()

const emits = defineEmits(['edit'])

const toggleDeleteCategory = (category: Categoria) => {
    showModalDelete.value = !showModalDelete.value
    if (showModalDelete.value) {
        deleteCategory.value = category
    } else {
        deleteCategory.value = null
    }
}

onMounted(async () => {
    await categoryStore.getCategories()
})

</script>
