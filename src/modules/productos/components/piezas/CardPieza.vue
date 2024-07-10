<template>
    <div class="bg-base-100 shadow max-w-[150px] w-[150px] min-h-[200px] rounded flex flex-col justify-center items-center hover:shadow-lg hover:cursor-pointer p-2"
        v-if="!pieza">
        <PlusIcon />
    </div>
    <div class="bg-base-100 shadow max-w-[150px] w-[150px] min-h-[200px] rounded flex flex-col justify-start items-start hover:shadow-lg hover:cursor-pointer p-2"
        v-else>
        <div class="w-full">
            <section class="flex justify-between items-start w-full">
                <h3 class="font-bold mb-3 min-h-12">{{ pieza.descripcion }}</h3>
                <TrashIcon :size="20" @click="emits('delete-pieza')" />
            </section>
            <section class="font-semibold">
                <h4>Tiempo : </h4>
                <div class="flex gap-2">
                    <p>{{ pieza.horas }} hr</p>
                    <p>{{ pieza.minutos }} Min</p>
                </div>
            </section>

            <section class="font-semibold mt-3">
                <h4>Peso : </h4>
                <p>{{ pieza.peso }}g</p>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PlusIcon, TrashIcon } from '@common/components/icons'
import type { Pieza } from '@productos/interfaces/Pieza'

interface Props {
    pieza?: Pieza;
}

defineProps<Props>()

const emits = defineEmits(['delete-pieza'])

</script>