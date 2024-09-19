<template>
  <div>
    <div class="flex justify-center">
      <div class="stats stats-vertical lg:stats-horizontal shadow">
        <StatBlock
          v-for="stat in statsBlock"
          :key="stat.text"
          :text="stat.text"
          :value="stat.value"
          @click="addStateForItem(stat.textLower)"
          :class="addClassIsInStateArr(stat.textLower)"
        >
          <template #desc>
            <div
              class="text-center font-bold text-base"
              v-if="currentStateArr[0] === stat.textLower"
              v-html="`Desde`"
            ></div>
            <div
              class="text-center font-bold text-base"
              v-if="currentStateArr[1] === stat.textLower"
              v-html="`Hasta`"
            ></div>
          </template>
        </StatBlock>
      </div>
    </div>
    <form @submit.prevent="onHandleChangeItemsState" class="w-full max-w-lg mx-auto mt-8">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Cantidad de productos</span>
        </div>
        <input
          type="number"
          step="1"
          placeholder="0"
          :disabled="!pedidoStore.isAvailable"
          id="cantidad-productos-items"
          class="input input-bordered w-full max-w-xs text-right"
          v-model="formDataChangeState.cantidad"
        />
      </label>
      <DividerComponent />
      <div class="flex justify-end mt-2" v-if="pedidoStore.isAvailable">
        <DButton color="primary" type="submit">Confirmar</DButton>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import type { Detalle } from '@pedidos/interfaces';
import { StatBlock } from '@common/components/Text';
import { usePedidosStore } from '@pedidos/store/pedidosStore';
import { useChangeItemsState } from '@pedidos/composables/useChangeItemsState';

const pedidoStore = usePedidosStore();

interface Props {
  detalle: Detalle;
  itemid: string;
}

const props = defineProps<Props>();
const propsDetalle = toRefs(props.detalle);

const statsBlockInitial = [
  {
    text: 'Pendiente',
    textLower: 'pendiente',
    value: propsDetalle.pendiente,
  },
  {
    text: 'Imprimiendo',
    textLower: 'imprimiendo',
    value: propsDetalle.imprimiendo,
  },
  {
    text: 'Listos',
    textLower: 'listo',
    value: propsDetalle.listo,
  },
  {
    text: 'Cancelados',
    textLower: 'cancelados',
    value: propsDetalle.cancelados,
  },
];

const {
  formDataChangeState,
  onHandleChangeItemsState,
  addClassIsInStateArr,
  addStateForItem,
  currentStateArr,
} = useChangeItemsState(props.itemid);

const statsBlock = ref([...statsBlockInitial]);
</script>
