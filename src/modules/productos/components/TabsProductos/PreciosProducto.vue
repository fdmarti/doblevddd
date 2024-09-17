<template>
  <div class="flex flex-col gap-8">
    <FormPrecioUnitario :precio="precio" />
    <FormPrecioPorCantidad />
  </div>
</template>
<script lang="ts" setup>
import { FormPrecioUnitario, FormPrecioPorCantidad } from '@productos/components/precio';
import type { Precio } from '@productos/interfaces/producto.response';

interface Props {
  precio: Precio;
}

defineProps<Props>();
</script>
