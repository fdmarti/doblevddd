<template>
  <div class="collapse bg-base-200 mb-3">
    <input
      type="checkbox"
      :id="`check-item-${producto.itemid}`"
      :name="`check-item-${producto.itemid}`"
    />
    <div class="collapse-title flex items-center justify-between">
      <section class="flex items-center gap-2">
        <PuzzleCompleteIcon />
        <h3 class="text-lg font-medium">{{ producto.descripcion }}</h3>
      </section>
    </div>
    <div class="collapse-content">
      <div>
        <section>
          <p class="font-semibold">
            Observaciones : <em>{{ producto.observaciones }}</em>
          </p>
          <p class="font-semibold">
            Cantidad de productos : <em>{{ producto.cantidad }}</em>
          </p>
        </section>
      </div>

      <div class="divider"></div>
      <StackStatsPedido :detalle="producto.detalle" />
      <div class="divider"></div>
      <ActionsPedido :itemid="producto.itemid" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PuzzleCompleteIcon } from '@common/components/icons';
import { StackStatsPedido, ActionsPedido } from '@pedidos/components';
import type { Producto } from '@pedidos/interfaces';

interface Props {
  producto: Producto;
}

defineProps<Props>();
</script>
