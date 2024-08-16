<template>
  <div class="flex justify-center">
    <div class="stats stats-vertical lg:stats-horizontal shadow">
      <StatBlock text="Pendientes" :value="detalle.pendiente" />
      <StatBlock text="Imprimiendo" :value="detalle.imprimiendo" />
      <StatBlock text="Listos" :value="detalle.listo" />
      <StatBlock text="Errores" :value="detalle.errores" />
      <StatBlock text="Cancelados" :value="detalle.cancelados" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Detalle } from '@pedidos/interfaces';
import { StatBlock } from '@common/components';

interface Props {
  detalle: Detalle;
}

defineProps<Props>();
</script>
