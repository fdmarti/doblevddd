<template>
  <section class="mb-5">
    <label class="input input-bordered flex items-center gap-2">
      <input
        type="text"
        class="grow"
        placeholder="Buscar"
        v-model="productoStore.productosFilter"
        name="product-search"
        id="product-search"
      />
      <SearchIcon />
    </label>
  </section>

  <div class="overflow-x-auto mb-10">
    <table class="table bg-base-300">
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Descripción</th>
          <th>Cateogira</th>
          <th>Precio unitario</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody v-if="productoStore.isLoading">
        <tr>
          <td colspan="8">
            <LoadingComponent />
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="productoStore.productos.length === 0">
        <tr>
          <td colspan="8">No hay productos</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="hover" v-for="producto in productoStore.productos" :key="producto.id">
          <th>#{{ producto.id }}</th>
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.categoria }}</td>
          <td>$ {{ producto.preciounitario }}</td>
          <td class="flex justify-center">
            <CheckProductoPedido v-if="isPedido" :producto="producto" />
            <router-link class="btn" :to="{ name: 'product', params: { id: producto.id } }" v-else>
              <InfoIcon />
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <PaginationComponent
    :current-page="productoStore.currentPage"
    :total-pages="productoStore.totalPages"
    @nextPage="nextPageProductos"
    @previousPage="prevPageProductos"
  />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useProductosStore } from '@productos/store/productosStore';
import { LoadingComponent } from '@common/components';
import { PaginationComponent } from '@common/components/pagination';
import { SearchIcon, InfoIcon } from '@common/components/icons';
import { CheckProductoPedido } from '@pedidos/components';

const productoStore = useProductosStore();
const { nextPageProductos, prevPageProductos } = productoStore;

const isPedido = ref(false);

const route = useRoute();

onMounted(async () => {
  await productoStore.getProductos();

  const { name } = route;
  if (name === 'nuevo-pedido') {
    isPedido.value = true;
  }
});

onUnmounted(() => {
  productoStore.productosFilter = '';
});
</script>
