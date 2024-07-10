<template>
    <section class="mb-5">
        <label class="input input-bordered flex items-center gap-2">
            <input type="text" class="grow" placeholder="Buscar" v-model="productoStore.productosFilter" />
            <SearchIcon />
        </label>
    </section>

    <div class="overflow-x-auto mb-10">
        <table class="table bg-base-300">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Descripción</th>
                    <th>Cateogira</th>
                    <th>Precio unitario</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody v-if="productoStore.isLoading">
                <tr>
                    <td colspan="8">
                        <LoadingComponent />
                    </td>
                </tr>
            </tbody>
            <tbody v-else-if="productoStore.productos.length === 0">
                <tr>
                    <td colspan="8">
                        No hay productos
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr class="hover" v-for="producto in productoStore.productos" :key="producto.id">
                    <th>#{{ producto.id }}</th>
                    <td>{{ producto.descripcion }}</td>
                    <td>{{ producto.categoria }}</td>
                    <td> $ {{ producto.preciounitario }}</td>
                    <td class="flex justify-center">
                        <router-link class="btn" :to="{ name: 'product', params: { id: producto.id } }">
                            <InfoIcon />
                        </router-link>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <PaginationComponent :current-page="productoStore.currentPage" :total-pages="productoStore.totalPages"
        @nextPage="nextPageProductos" @previousPage="prevPageProductos" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useProductosStore } from '@productos/store/productosStore';
import LoadingComponent from '@common/components/LoadingComponent.vue';
import { PaginationComponent } from '@common/components/pagination'
import { SearchIcon, InfoIcon } from '@common/components/icons'

const productoStore = useProductosStore()
const { nextPageProductos, prevPageProductos } = productoStore

onMounted(async () => {
    await productoStore.getProductos()
})


onUnmounted(() => {
    productoStore.productosFilter = ''
})


</script>
