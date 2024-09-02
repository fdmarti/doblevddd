<template>
  <TitleComponent text="Listado de pagos" />
</template>
<script lang="ts" setup>
import { TitleComponent } from '@common/components/Text';
import { usePagosStore } from '@pagos/store/pagosStore';
import { onMounted } from 'vue';

const pagosStore = usePagosStore();

onMounted(async () => {
  await pagosStore.getPagos();
});
</script>
