<template>
    <div v-if="productoStore.isLoading">
        <LoadingComponent />
    </div>
    <div class="flex flex-col justify-center items-center" v-else>
        <section class="relative w-full">
            <h1 class="font-bold text-3xl text-center">{{ productoStore.producto?.producto.descripcion }}</h1>
            <div class="absolute right-0 top-0 flex gap-2">
                <EditIcon @click="handleEditProduct(productoStore.producto!.producto.id)" />
                <TrashIcon />
            </div>
        </section>
        <!-- Cotizaciones -->
        <div class="divider mt-10">
            <h2 class="font-semibold text-2xl mb-3">Cotización</h2>
        </div>
        <section class="w-full max-w-4xl text-center">
            <div class="flex justify-between md:flex-row flex-col gap-4 md:gap-0">
                <p class="text-lg font-semibold">
                    Tiempo <br> {{ productoStore.producto?.cotizacionTotal.totalHoras }}hrs
                    {{ productoStore.producto?.cotizacionTotal.totalMinutos }}m
                </p>
                <p class="text-lg font-semibold">
                    Costo Elaboración <br> $ {{ productoStore.producto?.cotizacionTotal.costoElaboracion }}
                </p>
                <p class="text-lg font-semibold">
                    Costo Peso <br> {{ productoStore.producto?.cotizacionTotal.totalPeso }}g
                </p>
                <p class="text-lg font-semibold">
                    Plastico <br> $ {{ productoStore.producto?.cotizacionTotal.plastico }}
                </p>
            </div>
        </section>
        <!-- Piezas -->
        <div class="divider mt-10">
            <h2 class="font-semibold text-2xl mb-3">Detalle de las Piezas</h2>
        </div>
        <section class="w-full max-w-6xl text-center mt-5">
            <ListPiezasProducto :piezas="productoStore.producto?.piezas" />
        </section>
        <!-- Extras -->
        <div class="divider mt-10">
            <h2 class="font-semibold text-2xl mb-3">Detalle de los extras</h2>
        </div>
        <section class="w-full max-w-6xl text-center mt-5">
            <ListExtrasProducto :extras="productoStore.producto?.extras" />
        </section>
        <!-- Total -->
        <TotalPrecioProducto :precio="productoStore.producto?.precio" />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ListPiezasProducto } from '@productos/components/piezas'
import { ListExtrasProducto } from '@productos/components/extras'
import { TotalPrecioProducto } from '@productos/components'
import { TrashIcon, EditIcon } from '@common/components/icons'
import LoadingComponent from '@common/components/LoadingComponent.vue'

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter()

import { useProductosStore } from '@productos/store/productosStore';
const productoStore = useProductosStore()


const handleEditProduct = (productId: number) => {
    router.push({ name: 'form-product', query: { id: productId } })
}

onMounted(async () => {
    const { id } = route.params
    await productoStore.getProductById(id as string)
})

</script>