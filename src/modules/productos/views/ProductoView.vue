<template>
    <div v-if="productoStore.isLoading">
        Cargando...
    </div>
    <div class="flex flex-col justify-center items-center" v-else>
        <h1 class="font-bold text-3xl">{{ productoStore.producto?.producto.descripcion }}</h1>
        <!-- Cotizaciones -->
        <div class="divider mt-10">
            <h2 class="font-semibold text-2xl mb-3">Cotización</h2>
        </div>
        <section class="w-full max-w-4xl text-center">
            <div class="flex justify-between">
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
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ListPiezasProducto } from '@productos/components/piezas'
import { ListExtrasProducto } from '@productos/components/extras'

import { useRoute } from 'vue-router';
const route = useRoute();

import { useProductosStore } from '@productos/store/productosStore';
const productoStore = useProductosStore()


onMounted(() => {
    const { id } = route.params
    productoStore.getProductById(id as string)
})

</script>