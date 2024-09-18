<template>
  <LoadingComponent v-if="pedidosStore.isLoading" />
  <div v-else>
    <section
      class="flex justify-between md:items-center flex-col md:flex-row items-start md:mb-0 mb-5"
    >
      <h1 class="mb-5 md:text-3xl text-xl font-bold">Número del pedido : # {{ id }}</h1>

      <p v-if="!pedidosStore.isAvailable" class="text-xs italic text-secondary">
        * El pedido se encuentra ENTREGADO o CANCELADO por lo que hay acciones bloqueadas.
      </p>
      <div>
        Estado :
        <span class="md:text-2xl text-lg font-semibold">
          {{ pedidosStore.pedido.estado }}
        </span>
      </div>
    </section>
    <TabLayout v-if="pedidosStore.pedido">
      <TabComponent checked label="Detalle del pedido">
        <PedidoDetail :pedido="pedidosStore.pedido" />
      </TabComponent>
      <TabComponent label="Productos">
        <ItemDetail
          v-for="producto in pedidosStore.pedido.productos"
          :key="producto.itemid"
          :producto="producto"
        />
      </TabComponent>
      <TabComponent label="Pagos">
        <PagosDetail :pedidoId="props.id" />
      </TabComponent>
      <TabComponent label="Acciones">
        <AccionesDetail />
      </TabComponent>
    </TabLayout>

    <div v-else>
      <p>Error al cargar el pedido</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { usePedidosStore } from '@pedidos/store/pedidosStore';
import { TabComponent, TabLayout } from '@common/components/Tab';
import {
  ItemDetail,
  PedidoDetail,
  AccionesDetail,
  PagosDetail,
} from '@pedidos/components/TabsPedido';

interface Props {
  id: string;
}
const props = defineProps<Props>();

const pedidosStore = usePedidosStore();
const router = useRouter();

onMounted(async () => {
  const status = await pedidosStore.getPedidoById(props.id);
  if (!status) return router.replace({ name: 'pedidos' });
});
</script>
