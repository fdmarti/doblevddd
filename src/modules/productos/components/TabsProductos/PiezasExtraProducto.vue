<template>
  <TitleDividerComponent title="Detalle de las Piezas" />
  <section class="w-full max-w-6xl text-center mt-5 mx-auto">
    <ListPiezasProducto :piezas="piezas" />
  </section>
  <!-- Extras -->
  <TitleDividerComponent title="Detalle de los extras" />
  <section class="w-full max-w-6xl text-center mt-5 mx-auto">
    <ListExtrasProducto :extras="extras" />
  </section>
</template>
<script lang="ts" setup>
import type { Pieza, Extra } from '@productos/interfaces/producto.response';
import { TitleDividerComponent } from '@common/components/Text';
import { ListExtrasProducto } from '@productos/components/extras';
import { ListPiezasProducto } from '@productos/components/piezas';

interface Props {
  piezas: Pieza[];
  extras: Extra[];
}

defineProps<Props>();
</script>
