<template>
    <div class="collapse bg-base-200 mb-3">
        <input type="checkbox" id="check-pieza" name="check-pieza" />
        <div class="collapse-title text-lg font-medium flex gap-2 items-center">
            <PuzzleCompleteIcon /> {{ producto.descripcion }}
        </div>
        <div class="collapse-content">
            <section class="flex items-center justify-between">
                <h2 class="text-lg">Precio unitario: <span class="font-bold">$ {{ producto.preciounidad }}</span></h2>
                <TrashIcon />
            </section>
            <div class="divider"></div>
            <section>
                <h3 class="flex gap-2 font-semibold text-lg items-center">
                    <PuzzleIcon /> Piezas del producto
                </h3>
                <div class="overflow-x-auto">
                    <table class="table table-xs">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Descripción</th>
                                <th>Peso</th>
                                <th>Tiempo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="pieza in producto.piezas" :key="pieza.id">
                                <th># {{ pieza.id }}</th>
                                <td>{{ pieza.descripcion }}</td>
                                <td>{{ pieza.peso }} g</td>
                                <td>{{ pieza.horas }} h {{ pieza.minutos }} min</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PuzzleIcon, PuzzleCompleteIcon, TrashIcon } from '@common/components/icons';
import type { Producto } from '@pedidos/interfaces';

interface Props {
    producto: Producto
}

defineProps<Props>()
</script>