<template>
    <section class="flex items-center justify-between">
        <h1 class="mb-5 text-xl font-bold">Cotizaciones</h1>
        <button class="btn btn-outline btn-primary text-lg font-bold" @click="cotizacionStore.saveCotizacion">
            Guardar Cotizaciones
        </button>
    </section>
    <div class="divider"></div>

    <form class="grid sm:grid-cols-2 gap-5" id="cotizacion-form" name="cotizacion-form">
        <label class="form-control w-full" v-for="(cotizacion, index) in cotizacionStore.cotizaciones" :key="index">
            <div class="label">
                <span class="label-text font-semibold text-lg">{{ splitCamelCase(index) }}</span>
            </div>
            <input type="number" placeholder="0" step=".01" class="input input-bordered w-full"
                v-model="cotizacionStore.cotizaciones[index]" />
        </label>
    </form>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCotizacionStore } from '@cotizacion/store/cotizacionesStore';
import { splitCamelCase } from '@cotizacion/utils'

const cotizacionStore = useCotizacionStore()

onMounted(async () => {
    await cotizacionStore.getCotizaciones()
})
</script>
