<template>
  <div>
    <TitleComponent text="Pagos" />
    <FormPagos :pedido-id="pedidoId" />
    <ListHistorialPagos :pedido-id="pedidoId" />
  </div>
</template>
<script lang="ts" setup>
import { TitleComponent } from '@common/components/Text';
import { ListHistorialPagos, FormPagos } from '@pagos/components';

interface Props {
  pedidoId: string;
}

defineProps<Props>();
</script>
