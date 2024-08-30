<template>
  <TitleComponent text="Gastos" />
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
        <tr class="bg-accent">
          <td colspan="4" class="text-2xl text-base-100">Total</td>
          <td colspan="2" class="text-2xl text-base-100 font-bold">
            $ {{ gastosStore.totalGastos }}
          </td>
        </tr>
      </tfoot>
    </template>
  </TableComponent>

  <FormGastos :open="showModalGasto" @close="onToggleGastoPopup" />
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
import { onMounted, ref } from 'vue';
import { TitleComponent } from '@common/components/Text';
import { TableComponent } from '@common/components/Table';
import { FabButton } from '@common/components/Buttons';
import { TrashIcon, DolarIcon } from '@common/components/icons';
import { FormGastos, GastoModalDelete } from '@gastos/components';
import { formatShortDate } from '@/utils';
import { useGastosStore } from '@gastos/store/gastosStore';

const gastosStore = useGastosStore();

const showModalGasto = ref(false);
const showModalDeleteGasto = ref(false);
const deletedGasto = ref();

const gastosTh = ['Codigo', 'Descripcion', 'Tipo', 'Monto', 'Fecha', 'Acciones'];

const onToggleGastoPopup = () => {
  showModalGasto.value = !showModalGasto.value;
};

const onToggleDeleteGastoPopup = (gastoId: number = 0) => {
  if (gastoId) {
    deletedGasto.value = gastoId;
  }
  showModalDeleteGasto.value = !showModalDeleteGasto.value;
};

onMounted(async () => {
  await gastosStore.getGastos();
});
</script>
