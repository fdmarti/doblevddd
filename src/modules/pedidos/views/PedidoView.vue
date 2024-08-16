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
          {{ pedidosStore.pedido.estadoActual }}
        </span>
      </div>
    </section>
    <div role="tablist" class="tabs tabs-md tabs-bordered py-6" v-if="pedidosStore.pedido">
      <input
        type="radio"
        name="tab-detalle-pedido"
        id="tab-detalle"
        role="tab"
        class="tab"
        aria-label="Detalle del pedido"
        checked
      />
      <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <PedidoDetail
          :cliente="pedidosStore.pedido.cliente"
          :contacto="pedidosStore.pedido.contacto"
          :precio="pedidosStore.pedido.preciototal"
          :fecha="pedidosStore.pedido.fechacreacion"
        />
      </div>

      <input
        type="radio"
        name="tab-detalle-pedido"
        id="tab-productos"
        role="tab"
        class="tab"
        aria-label="Productos"
      />
      <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <ItemDetail
          v-for="producto in pedidosStore.pedido.productos"
          :key="producto.itemid"
          :producto="producto"
        />
      </div>

      <input
        type="radio"
        name="tab-detalle-pedido"
        id="tab-acciones"
        role="tab"
        class="tab"
        aria-label="Acciones"
      />
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
import { ItemDetail, PedidoDetail, AccionesDetail } from '@pedidos/components/TabsPedido';

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
