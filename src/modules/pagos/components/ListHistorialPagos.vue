<template>
  <div class="overflow-x-auto">
    <table class="table table-xs">
      <thead>
        <tr>
          <th>Código</th>
          <th>Descripción</th>
          <th>Fecha</th>
          <th>Monto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody v-if="pagosStore.isLoading">
        <tr>
          <td colspan="5">
            <LoadingComponent :size="40" />
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="pagosStore.pagos.length > 0">
        <tr v-for="pago in pagosStore.pagos" :key="pago.id" class="hover">
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
      <tbody v-else>
        <tr>
          <td colspan="5">No hay gastos registrados</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { formatShortDate, Toast } from '@utils/index';
import { usePagosStore } from '@pagos/store/pagosStore';
import { LoadingComponent } from '@common/components';
import { TrashIcon } from '@common/components/icons';
const pagosStore = usePagosStore();

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
  await pagosStore.getPagos(props.pedidoId);
});
</script>
