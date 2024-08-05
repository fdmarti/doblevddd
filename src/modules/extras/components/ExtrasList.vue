<template>
    <section class="mb-5">
        <label class="input input-bordered flex items-center gap-2">
            <input type="text" class="grow" placeholder="Buscar" v-model="extrasStore.extrasFilter" name="extra-search"
                id="extra-search" />
            <SearchIcon />
        </label>
    </section>

    <div class="overflow-x-auto mb-10">
        <table class="table bg-base-300">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody v-if="extrasStore.isLoading">
                <tr>
                    <td colspan="4">
                        <LoadingComponent />
                    </td>
                </tr>
            </tbody>
            <tbody v-else-if="extrasStore.extras!.length === 0">
                <tr>
                    <td colspan="4">
                        No hay extras
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr class="hover" v-for="extra in extrasStore.extras" :key="extra.id">
                    <th>#{{ extra.id }}</th>
                    <td>{{ extra.descripcion }}</td>
                    <td>$ {{ extra.precio }}</td>
                    <td class="flex justify-center gap-2">
                        <button class="btn" @click="emits('edit', extra)">
                            <EditIcon />
                        </button>
                        <button class="btn" @click="toggleDeleteExtra(extra)">
                            <TrashIcon />
                        </button>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <section class="flex justify-center">
        <PaginationComponent :current-page="extrasStore.currentPage" @nextPage="nextPageExtras"
            @previousPage="prevPageExtras" :total-pages="extrasStore.totalPages" />
    </section>

    <ExtraModalDelete :open="showModalDelete" :deleteExtra="deleteExtra" @close="toggleDeleteExtra" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { LoadingComponent } from '@common/components';
import { SearchIcon, EditIcon, TrashIcon } from '@common/components/icons'
import { PaginationComponent } from '@common/components/pagination'
import { ExtraModalDelete } from '@extras/components'

import type { Extra } from '@extras/interface/extras.response'

import { useExtrasStore } from '@extras/store/extrasStore';
const extrasStore = useExtrasStore()
const { nextPageExtras, prevPageExtras } = extrasStore

const showModalDelete = ref(false)
const deleteExtra = ref<null | Extra>()

const emits = defineEmits(['edit'])

const toggleDeleteExtra = (extra: Extra) => {
    showModalDelete.value = !showModalDelete.value
    if (showModalDelete.value) {
        deleteExtra.value = extra
    } else {
        deleteExtra.value = null
    }
}

onMounted(async () => {
    await extrasStore.getExtras()
})

</script>
