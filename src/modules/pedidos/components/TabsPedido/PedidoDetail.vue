<template>
    <section class="flex flex-col gap-6">
        <section class="flex md:flex-row flex-col gap-5">
            <CardDetail>
                <div class="flex flex-col">
                    <span class="text-gray-400 uppercase text-xs mb-1 font-semibold">Cliente</span>
                    <span class="font-bold text-xl">{{ cliente }}</span>
                </div>
                <UserIcon />
            </CardDetail>
            <CardDetail>
                <div class="flex flex-col">
                    <span class="text-gray-400 uppercase text-xs mb-1 font-semibold">Contacto</span>
                    <span class="font-bold text-xl">{{ contacto }}</span>
                </div>
                <AddressIcon />
            </CardDetail>
        </section>

        <section class="flex md:flex-row flex-col gap-5">
            <CardDetail>
                <div class="flex flex-col">
                    <span class="text-gray-400 uppercase text-xs mb-1 font-semibold">Precio total</span>
                    <span class="font-bold text-xl">$ {{ precio }}</span>
                </div>
                <PriceIcon />
            </CardDetail>
            <CardDetail>
                <div class="flex flex-col">
                    <span class="text-gray-400 uppercase text-xs mb-1 font-semibold">Fecha solicitado</span>
                    <span class="font-bold text-xl">{{ formatDate(fecha) }}</span>
                </div>
                <CalendarStatsIcon />
            </CardDetail>
        </section>

    </section>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils';
import CardDetail from '../CardDetail.vue'
import { AddressIcon, CalendarStatsIcon, PriceIcon, UserIcon } from '@common/components/icons'


interface Props {
    cliente: string;
    contacto: string;
    precio: number;
    fecha: Date | string
}

withDefaults(defineProps<Props>(), {
    cliente: 'Cliente NN',
    contacto: 'mail@google.com',
    precio: 1000,
    fecha: '2024-01-01'
})
</script>