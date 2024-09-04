<template>
  <div v-if="productoStore.isLoading">
    <LoadingComponent />
  </div>

  <div class="flex flex-col justify-between items-center w-full" v-else-if="producto">
    <section class="flex justify-between w-full items-center">
      <h1 class="md:text-3xl text-xl font-bold">
        {{ producto.producto.descripcion }} -
        {{ producto.producto.categoria }}
      </h1>
      <div class="flex gap-2">
        <EditIcon @click="handleEditProduct(producto.producto.id)" />
        <TrashIcon />
      </div>
    </section>

    <TabLayout>
      <TabComponent label="Detalle" checked>
        <DetalleProducto :cotizacion="producto.cotizacionTotal" :precio="producto.precio" />
      </TabComponent>
      <TabComponent label="Piezas y extras">
        <PiezasExtraProducto :extras="producto.extras" :piezas="producto.piezas" />
      </TabComponent>
      <TabComponent label="Precios">
        <PreciosProducto :precio="producto.precio" />
      </TabComponent>
      <TabComponent label="Imagen">
        <ImageProducto :productoId="producto.producto.id" :image="producto.producto.imagen" />
      </TabComponent>
    </TabLayout>
  </div>

  <div v-else>
    <p>Error al cargar el pedido</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { TrashIcon, EditIcon } from '@common/components/icons';
import LoadingComponent from '@common/components/LoadingComponent.vue';
import {
  DetalleProducto,
  PiezasExtraProducto,
  ImageProducto,
  PreciosProducto,
} from '@productos/components/TabsProductos';

import { TabComponent, TabLayout } from '@common/components/Tab';
import { useProductosStore } from '@productos/store/productosStore';

const route = useRoute();
const router = useRouter();

const productoStore = useProductosStore();
const { producto } = storeToRefs(productoStore);

const handleEditProduct = (productId: number) => {
  router.push({ name: 'form-product', query: { id: productId } });
};

onMounted(async () => {
  const { id } = route.params;
  await productoStore.getProductById(id as string);
});

onUnmounted(() => {
  productoStore.producto = null;
});
</script>
