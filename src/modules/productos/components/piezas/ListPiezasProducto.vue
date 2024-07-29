<template>
    <div class="overflow-x-auto">
        <table class="table bg-base-300">
            <thead>
                <tr>
                    <th></th>
                    <th>Descripción</th>
                    <th>Electricidad</th>
                    <th>Plástico</th>
                    <th>Amortización</th>
                    <th>Taza fallos</th>
                    <th>Peso</th>
                    <th>Tiempo</th>
                    <th>Costo total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(pieza, index) in piezas" :key="pieza.descripcion" class="[&_td]:text-sm">
                    <th>#{{ index + 1 }}</th>
                    <td>{{ pieza.descripcion }}</td>
                    <td>$ {{ pieza.cotizacion.electricidad }}</td>
                    <td>$ {{ pieza.cotizacion.plastico }}</td>
                    <td>$ {{ pieza.cotizacion.costoAmortizacion }}</td>
                    <td>$ {{ pieza.cotizacion.tazaFallos }}</td>
                    <td>{{ pieza.peso }}g</td>
                    <td>{{ pieza.horas }}hr {{ pieza.minutos }}m</td>
                    <td>$ {{ pieza.cotizacion.costoPieza }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import type { Pieza } from '@productos/interfaces/producto.response'

interface Props {
    piezas?: Pieza[]
}

defineProps<Props>()

</script>