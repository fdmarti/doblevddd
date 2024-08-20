<template>
  <LoadingComponent v-if="pedidosStore.isLoading" />
  <div v-else>
    <section
      class="flex justify-between md:items-center flex-col md:flex-row items-start md:mb-0 mb-5"
    >
      <h1 class="mb-5 md:text-3xl text-xl font-bold">Número del pedido : # {{ id }}</h1>
      <div>
        Estado :
        <span class="md:text-2xl text-lg font-semibold">
          {{ pedidosStore.pedido.estado }}
        </span>
      </div>
    </section>
    <div role="tablist" class="tabs tabs-md tabs-bordered py-6" v-if="pedidosStore.pedido">
      <RadioInputTab aria-label="Detalle del pedido" checked id="tab-detalle-pedido" />
      <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <PedidoDetail :pedido="pedidosStore.pedido!" />
      </div>

      <RadioInputTab aria-label="Productos" id="tab-productos-pedido" />
      <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <ItemDetail
          v-for="producto in pedidosStore.pedido.productos"
          :key="producto.itemid"
          :producto="producto"
        />
      </div>

      <RadioInputTab aria-label="Pagos" id="tab-pagos-pedido" />
      <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <PagosDetail :pedidoId="props.id" />
      </div>

      <RadioInputTab aria-label="Acciones" id="tab-acciones-pedido" />
      <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <AccionesDetail />
      </div>
    </div>
    <div v-else>
      <p>Error al cargar el pedido</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { usePedidosStore } from '@pedidos/store/pedidosStore';
import LoadingComponent from '@common/components/LoadingComponent.vue';
import {
  ItemDetail,
  PedidoDetail,
  AccionesDetail,
  PagosDetail,
} from '@pedidos/components/TabsPedido';
import { RadioInputTab } from '@pedidos/components/Pedido/Inputs';

interface Props {
  id: string;
}
const props = defineProps<Props>();

const pedidosStore = usePedidosStore();
const router = useRouter();

onMounted(async () => {
  const status = await pedidosStore.getPedidoById(props.id);
  if (!status) router.replace({ name: 'pedidos' });
});
</script>
