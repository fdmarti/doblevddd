<template>
  <section class="flex flex-col gap-6">
    <section class="grid md:grid-cols-2 gap-5">
      <CardDetailLayout v-for="blockPedido in pedidoDetails" :key="blockPedido.primaryText">
        <CardDetailContent
          :componentIcon="blockPedido.componentIcon"
          :primaryText="blockPedido.primaryText"
          :primaryValue="blockPedido.primaryValue"
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

const pedidoDetails = [
  {
    componentIcon: AddressIcon,
    primaryText: 'Cliente',
    primaryValue: props.pedido.cliente,
  },
  {
    componentIcon: UserIcon,
    primaryText: 'Contacto',
    primaryValue: props.pedido.contacto,
  },
  {
    componentIcon: PriceIcon,
    primaryText: 'Precio total',
    primaryValue: props.pedido.preciototal,
    secondaryTitle: messageSecondarySenia,
    secondaryValue: props.pedido.preciototal - props.pedido.senia,
  },
  {
    componentIcon: CalendarStatsIcon,
    primaryText: 'Fecha solicitado',
    primaryValue: formatShortDate(props.pedido.fechacreacion),
  },
];
</script>
