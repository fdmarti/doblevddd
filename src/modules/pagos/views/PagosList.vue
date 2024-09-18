<template>
  <TitleComponent text="Listado de pagos">
    <template #action>
      <button
        class="flex items-center flex-row-reverse gap-2 btn btn-warning"
        @click="toggleFiltroPagosPopup"
      >
        Filtrar <ChartCandleIcon />
      </button>
    </template>
  </TitleComponent>

  <TableComponent
    :arr-length="pagosStore.pagos.length"
    :is-loading="pagosStore.isLoading"
    :table-head-arr="pagosTh"
  >
    <template #tbody>
      <tr v-for="pago in pagosStore.pagos" :key="pago.id">
        <th>#{{ pago.id }}</th>
        <td>{{ pago.cliente }}</td>
        <td>{{ pago.descripcion }}</td>
        <td>{{ formatShortDate(pago.fechapago) }}</td>
        <td>
          <span class="text-lg font-bold">{{ formatCurrency(pago.monto) }}</span>
        </td>
      </tr>
    </template>
    <template #tfoot>
      <tfoot>
        <tr class="bg-neutral">
          <td colspan="4" class="text-2xl text-gray-100">Total</td>
          <td colspan="2" class="text-2xl text-gray-100 font-bold">
            {{ formatCurrency(pagosStore.pagosTotal) }}
          </td>
        </tr>
      </tfoot>
    </template>
  </TableComponent>
  <FormFiltroPagos :open="showFiltroPagos" @close="toggleFiltroPagosPopup" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { usePagosStore } from '@pagos/store/pagosStore';
import { ChartCandleIcon } from '@common/components/icons';
import { FormFiltroPagos } from '@pagos/components';
import { formatShortDate } from '@/utils';
import { formatCurrency } from '@/utils/numbers/format-currency';

const pagosStore = usePagosStore();
const pagosTh = ['Código', 'Cliente', 'Descripción', 'Fecha', 'Monto'];

const showFiltroPagos = ref(false);

const toggleFiltroPagosPopup = () => {
  showFiltroPagos.value = !showFiltroPagos.value;
};

onMounted(async () => {
  await pagosStore.getPagos();
});
</script>
