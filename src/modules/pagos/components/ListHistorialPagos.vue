<template>
  <TableComponent
    :arr-length="pagosStore.pagos.length"
    :is-loading="pagosStore.isLoading"
    :table-head-arr="thPagos"
  >
    <template #tbody>
      <tbody>
        <tr v-for="pago in pagosStore.pagos" :key="pago.id">
          <th># {{ pago.id }}</th>
          <td>{{ pago.descripcion }}</td>
          <td>{{ formatShortDate(pago.fechapago) }}</td>
          <td>$ {{ pago.monto }}</td>
          <td class="flex justify-center">
            <button class="btn" @click="handleDeletePago(pago.id)">
              <TrashIcon :size="25" />
            </button>
          </td>
        </tr>
      </tbody>
    </template>
  </TableComponent>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { formatShortDate, Toast } from '@utils/index';
import { usePagosStore } from '@pagos/store/pagosStore';
import { TrashIcon } from '@common/components/icons';
import { TableComponent } from '@common/components/Table';
const pagosStore = usePagosStore();

const thPagos = ['Código', 'Descripción', 'Fecha', 'Monto', 'Acciones'];

interface Props {
  pedidoId: string;
}

const props = defineProps<Props>();

const handleDeletePago = async (pagoId: number) => {
  const result = await pagosStore.deletePago(pagoId);

  if (!result) {
    Toast.error('Error al eliminar el pago');
    return;
  }

  Toast.success('Pago eliminado');
};

onMounted(async () => {
  await pagosStore.getPagosByPedido(props.pedidoId);
});
</script>
