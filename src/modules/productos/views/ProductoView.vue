<template>
  <div v-if="productoStore.isLoading">
    <LoadingComponent />
  </div>
  <div class="flex flex-col justify-between items-center w-full" v-else>
    <section class="flex justify-between w-full items-center">
      <h1 class="md:text-3xl text-xl font-bold">
        {{ productoStore.producto?.producto.descripcion }}
      </h1>
      <div class="flex gap-2">
        <EditIcon @click="handleEditProduct(productoStore.producto!.producto.id)" />
        <TrashIcon />
      </div>
    </section>

    <TabLayout v-if="productoStore.producto">
      <TabComponent label="Detalle" checked>
        <DetalleProducto
          :cotizacion="productoStore.producto.cotizacionTotal"
          :precio="productoStore.producto.precio"
        />
      </TabComponent>
      <TabComponent label="Piezas y extras">
        <PiezasExtraProducto
          :extras="productoStore.producto.extras"
          :piezas="productoStore.producto.piezas"
        />
      </TabComponent>
      <TabComponent label="Imagen">
        <ImageProducto
          :productoId="productoStore.producto.producto.id"
          :image="productoStore.producto.producto.imagen"
        />
      </TabComponent>
    </TabLayout>

    <div v-else>
      <p>Error al cargar el pedido</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TrashIcon, EditIcon } from '@common/components/icons';
import LoadingComponent from '@common/components/LoadingComponent.vue';
import {
  DetalleProducto,
  PiezasExtraProducto,
  ImageProducto,
} from '@productos/components/TabsProductos';

import { TabComponent, TabLayout } from '@common/components/Tab';
import { useProductosStore } from '@productos/store/productosStore';

const route = useRoute();
const router = useRouter();

const productoStore = useProductosStore();

const handleEditProduct = (productId: number) => {
  router.push({ name: 'form-product', query: { id: productId } });
};

onMounted(async () => {
  const { id } = route.params;
  await productoStore.getProductById(id as string);
});
</script>
