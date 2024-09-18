<template>
  <div class="collapse bg-base-200 mb-3">
    <input
      type="checkbox"
      :id="`check-item-${producto.itemid}`"
      :name="`check-item-${producto.itemid}`"
    />
    <div class="collapse-title flex items-center justify-between">
      <section class="flex items-center justify-between w-full">
        <section class="flex items-center">
          <PuzzleCompleteIcon />
          <h3 class="text-lg font-medium">{{ producto.descripcion }}</h3>
          -
          <span class="font-semibold">
            Observaciones : <em>{{ producto.observaciones }}</em>
          </span>
        </section>

        <RadialProgressComponent :value="calcPorcentajeItem" />
      </section>
    </div>
    <div class="collapse-content">
      <div>
        <section>
          <p class="font-semibold">
            Cantidad de productos : <em>{{ producto.cantidad }}</em>
          </p>
        </section>
      </div>

      <DividerComponent />
      <StackStatsPedido :detalle="producto.detalle" />
      <DividerComponent />
      <ActionsPedido :itemid="producto.itemid" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { calcPercentage } from '@utils/index';
import { PuzzleCompleteIcon } from '@common/components/icons';
import { StackStatsPedido, ActionsPedido } from '@pedidos/components';
import { RadialProgressComponent } from '@common/components/progress';
import type { Producto } from '@pedidos/interfaces';

interface Props {
  producto: Producto;
}

const props = defineProps<Props>();

const calcPorcentajeItem = computed(() => {
  return calcPercentage(props.producto.detalle.listo, props.producto.cantidad);
});
</script>
