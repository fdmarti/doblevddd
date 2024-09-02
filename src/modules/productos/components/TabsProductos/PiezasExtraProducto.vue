<template>
  <div class="divider mt-10">
    <h2 class="font-semibold text-2xl mb-3">Detalle de las Piezas</h2>
  </div>
  <section class="w-full max-w-6xl text-center mt-5 mx-auto">
    <ListPiezasProducto :piezas="piezas" />
  </section>
  <!-- Extras -->
  <div class="divider mt-10">
    <h2 class="font-semibold text-2xl mb-3">Detalle de los extras</h2>
  </div>
  <section class="w-full max-w-6xl text-center mt-5 mx-auto">
    <ListExtrasProducto :extras="extras" />
  </section>
</template>
<script lang="ts" setup>
import type { Pieza, Extra } from '@productos/interfaces/producto.response';
import { ListExtrasProducto } from '@productos/components/extras';
import { ListPiezasProducto } from '@productos/components/piezas';

interface Props {
  piezas: Pieza[];
  extras: Extra[];
}

defineProps<Props>();
</script>
