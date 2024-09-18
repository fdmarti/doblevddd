<template>
  <TableComponent
    v-if="extras"
    :arr-length="extras.length"
    :is-loading="false"
    :table-head-arr="['Codigo', 'Descripción', 'Precio']"
  >
    <template #tbody>
      <tbody>
        <tr v-for="extra in extras" :key="extra.id" class="[&_td]:text-sm">
          <th>#{{ extra.id }}</th>
          <td>{{ extra.descripcion }}</td>
          <td>{{ formatCurrency(extra.precio) }}</td>
        </tr>
      </tbody>
    </template>
    <template #tfoot>
      <tfoot>
        <tr class="bg-base-200 font-bold uppercase text-base">
          <th></th>
          <td>Total Extras</td>
          <td>{{ formatCurrency(calcTotalExtras) }}</td>
        </tr>
      </tfoot>
    </template>
  </TableComponent>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Extra } from '@productos/interfaces/producto.response';
import { formatCurrency } from '@/utils/numbers/format-currency';

interface Props {
  extras?: Extra[];
}

const props = defineProps<Props>();

const calcTotalExtras = computed(() => {
  let total = 0;
  props.extras?.forEach((extra) => {
    total = total + extra.precio;
  });
  return total;
});
</script>
