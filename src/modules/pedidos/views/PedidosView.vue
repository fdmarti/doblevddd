<template>
  <TitleComponent text="Listado de Pedidos" />

  <TableComponent
    :arr-length="pedidosStore.pedidos.length"
    :is-loading="pedidosStore.isLoading"
    :table-head-arr="thPedido"
  >
    <template #tbody>
      <tbody>
        <tr v-for="pedido in pedidosStore.pedidos" :key="pedido.id">
          <th>#{{ pedido.id }}</th>
          <td>{{ pedido.cliente }}</td>
          <td>{{ pedido.contacto }}</td>
          <td>{{ pedido.fechacreacion }}</td>
          <td>{{ pedido.productos }}</td>
          <td>
            <PaymentProgess :completion="pedido.completion" />
          </td>

          <td>{{ pedido.estado }}</td>
          <td>
            <RouterLink :to="{ name: 'pedido', params: { id: pedido.id } }" class="btn btn-outline"
              >Detalle
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </template>
  </TableComponent>

  <FabButton @click="onHandleNewPedido">
    <PlusIcon />
  </FabButton>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { usePedidosStore } from '@pedidos/store/pedidosStore';
import { PlusIcon } from '@common/components/icons';
import PaymentProgess from '@pedidos/components/PaymentProgress.vue';

const thPedido = [
  'Codigo',
  'Cliente',
  'Contacto',
  'Fecha creación',
  'Cantidad productos',
  'Pago',
  'Estado',
  'Acciones',
];

const pedidosStore = usePedidosStore();
const router = useRouter();

onMounted(async () => {
  const status = await pedidosStore.getPedidos();
  if (!status) router.replace({ name: 'login' });
});

const onHandleNewPedido = () => {
  router.push({ name: 'nuevo-pedido' });
};
</script>
