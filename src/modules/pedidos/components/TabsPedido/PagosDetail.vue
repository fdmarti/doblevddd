<template>
  <div>
    <TitleComponent text="Pagos" />
    <FormPagos :pedido-id="pedidoId" />
    <DividerComponent />
    <ListHistorialPagos :pedido-id="pedidoId" />
  </div>
</template>
<script lang="ts" setup>
import { TitleComponent } from '@common/components';
import { ListHistorialPagos, FormPagos } from '@pagos/components';
import { DividerComponent } from '@common/components/content';

interface Props {
  pedidoId: string;
}

defineProps<Props>();
</script>
