<template>
  <section class="flex flex-col gap-6">
    <section class="grid md:grid-cols-2 gap-5">
      <CardDetailLayout>
        <CardDetailContent
          :componentIcon="AddressIcon"
          primaryText="Cliente"
          :primaryValue="pedido.cliente"
        />
      </CardDetailLayout>

      <CardDetailLayout>
        <CardDetailContent
          :componentIcon="UserIcon"
          primaryText="Contacto"
          :primaryValue="pedido.contacto"
        />
      </CardDetailLayout>

      <CardDetailLayout>
        <CardDetailContent
          :componentIcon="PriceIcon"
          primaryText="Precio total"
          :primaryValue="pedido.preciototal"
          :secondaryTitle="messageSecondarySenia"
          :secondaryValue="pedido.preciototal - pedido.senia"
        />
      </CardDetailLayout>

      <CardDetailLayout>
        <CardDetailContent
          :componentIcon="CalendarStatsIcon"
          primaryText="Fecha solicitado"
          :primaryValue="formatShortDate(pedido.fechacreacion)"
        />
      </CardDetailLayout>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatShortDate } from '@/utils';
import { AddressIcon, CalendarStatsIcon, PriceIcon, UserIcon } from '@common/components/icons';
import { CardDetailContent, CardDetailLayout } from '@/modules/common/components/Card';
import type { Pedido } from '@pedidos/interfaces';

interface Props {
  pedido: Pedido;
}

const props = defineProps<Props>();

const messageSecondarySenia = computed(() => {
  switch (true) {
    case props.pedido.senia != 0 && props.pedido.senia !== props.pedido.preciototal:
      return 'Falta pagar';
    case props.pedido.senia === props.pedido.preciototal:
      return 'Pagado';

    default:
      return '';
  }
});
</script>
