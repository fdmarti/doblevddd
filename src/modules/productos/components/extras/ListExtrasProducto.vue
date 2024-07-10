<template>
    <div class="overflow-x-auto">
        <table class="table table-xs bg-base-300">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="extra in extras" :key="extra.id" class="[&_td]:text-sm">
                    <th>#{{ extra.id }}</th>
                    <td>{{ extra.descripcion }}</td>
                    <td>${{ extra.precio }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="bg-base-100 font-bold uppercase text-base">
                    <th></th>
                    <td>Total Extras</td>
                    <td>$ {{ calcTotalExtras }}</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script setup lang="ts">
import type { Extra } from '@productos/interfaces/producto.response'
import { computed } from 'vue';

interface Props {
    extras?: Extra[]
}

const props = defineProps<Props>()

const calcTotalExtras = computed(() => {
    let total = 0
    console.log(props.extras)

    props.extras?.forEach(extra => {
        total = total + extra.precio
    })
    return total
})

</script>