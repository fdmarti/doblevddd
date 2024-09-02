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
    <div
      role="tablist"
      class="tabs tabs-md tabs-bordered py-6 w-full mt-3"
      v-if="productoStore.producto"
    >
      <RadioInputTab aria-label="Detalle" checked id="tab-detalle-producto" />
      <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <DetalleProducto :cotizacion="productoStore.producto.cotizacionTotal" />
        <TotalPrecioProducto :precio="productoStore.producto.precio" />
      </div>

      <RadioInputTab aria-label="Piezas y extras" id="tab-piezas-extras-producto" />
      <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <PiezasExtraProducto
          :extras="productoStore.producto.extras"
          :piezas="productoStore.producto.piezas"
        />
      </div>
    </div>
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
import { DetalleProducto, PiezasExtraProducto } from '@productos/components/TabsProductos';
import RadioInputTab from '@pedidos/components/Pedido/Inputs/RadioInputTab.vue';
import { useProductosStore } from '@productos/store/productosStore';
import { TotalPrecioProducto } from '@productos/components';

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
