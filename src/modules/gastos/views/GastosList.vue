<template>
  <TitleComponent text="Gastos">
    <template #action>
      <button
        class="flex items-center flex-row-reverse gap-2 btn btn-warning"
        @click="toggleFiltroGastosPopup"
      >
        Filtrar <ChartCandleIcon />
      </button>
    </template>
  </TitleComponent>
  <TableComponent
    :arr-length="gastosStore.gastos.length"
    :is-loading="gastosStore.isLoading"
    :table-head-arr="gastosTh"
  >
    <template #tbody>
      <tbody>
        <tr class="hover" v-for="gasto in gastosStore.gastos" :key="gasto.id">
          <th># {{ gasto.id }}</th>
          <td>{{ gasto.descripcion }}</td>
          <td>{{ gasto.tipo === 'G' ? 'Gasto' : 'Costo' }}</td>
          <td>$ {{ gasto.monto }}</td>
          <td>{{ formatShortDate(gasto.fechagasto) }}</td>
          <td>
            <button @click="onToggleDeleteGastoPopup(gasto.id)">
              <TrashIcon />
            </button>
          </td>
        </tr>
      </tbody>
    </template>
    <template #tfoot>
      <tfoot>
        <tr class="bg-neutral">
          <td colspan="4" class="text-2xl text-gray-100">Total</td>
          <td colspan="2" class="text-2xl text-gray-100 font-bold">
            $ {{ gastosStore.totalGastos }}
          </td>
        </tr>
      </tfoot>
    </template>
  </TableComponent>

  <FormGastos :open="showModalGasto" @close="onToggleGastoPopup" />

  <FormFiltroGastos :open="showFiltroGastos" @close="toggleFiltroGastosPopup" />

  <GastoModalDelete
    :open="showModalDeleteGasto"
    @close="onToggleDeleteGastoPopup"
    :deletedGasto="deletedGasto"
  />

  <FabButton @click="onToggleGastoPopup">
    <DolarIcon />
  </FabButton>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import {} from '@common/components/Text';
import { TrashIcon, DolarIcon, ChartCandleIcon } from '@common/components/icons';
import { FormGastos, GastoModalDelete, FormFiltroGastos } from '@gastos/components';
import { useGastosPopups } from '@gastos/composables/useGastosPopups';
import { formatShortDate } from '@/utils';
import { useGastosStore } from '@gastos/store/gastosStore';

const gastosStore = useGastosStore();

const {
  deletedGasto,
  onToggleDeleteGastoPopup,
  onToggleGastoPopup,
  showFiltroGastos,
  showModalDeleteGasto,
  showModalGasto,
  toggleFiltroGastosPopup,
} = useGastosPopups();

const gastosTh = ['Codigo', 'Descripcion', 'Tipo', 'Monto', 'Fecha', 'Acciones'];

onMounted(async () => {
  await gastosStore.getGastos();
});
</script>
