<template>
  <button class="btn btn-outline" @click="createNewFactura(pedido)">Crear Factura</button>
</template>
<script lang="ts" setup>
import type { Pedido } from '@pedidos/interfaces';
import { createNewFactura } from '@factura/utils';
interface Props {
  pedido: Pedido;
}

defineProps<Props>();
</script>
