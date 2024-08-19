<template>
  <section class="flex flex-col gap-6">
    <section class="flex md:flex-row flex-col gap-5">
      <CardDetailLayout>
        <CardDetailContent :componentIcon="UserIcon" title="Cliente" :text="cliente" />
      </CardDetailLayout>

      <CardDetailLayout>
        <CardDetailContent :componentIcon="AddressIcon" title="Contacto" :text="contacto" />
      </CardDetailLayout>
    </section>

    <section class="flex md:flex-row flex-col gap-5">
      <CardDetailLayout>
        <CardDetailContent :componentIcon="PriceIcon" title="Precio total" :text="`$ ${precio}`" />
      </CardDetailLayout>

      <CardDetailLayout>
        <CardDetailContent
          :componentIcon="CalendarStatsIcon"
          title="Fecha solicitado"
          :text="formatDate(fecha)"
        />
      </CardDetailLayout>
    </section>
  </section>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils';
import { AddressIcon, CalendarStatsIcon, PriceIcon, UserIcon } from '@common/components/icons';
import { CardDetailContent, CardDetailLayout } from '@pedidos/components/Pedido/CardDetail';

interface Props {
  cliente: string;
  contacto: string;
  precio: number;
  fecha: Date | string;
}

withDefaults(defineProps<Props>(), {
  cliente: 'Cliente NN',
  contacto: 'mail@google.com',
  precio: 1000,
  fecha: '2024-01-01',
});
</script>
