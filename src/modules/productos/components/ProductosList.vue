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

  <TableComponent
    :arr-length="productoStore.productos.length"
    :is-loading="productoStore.isLoading"
    :table-head-arr="thProductos"
  >
    <template #tbody>
      <tr class="hover" v-for="producto in productoStore.productos" :key="producto.id">
        <th>#{{ producto.id }}</th>
        <td class="flex justify-center">
          <img
            :src="`${producto.imagen}?t=${timeStamp()}`"
            :alt="`product image ${producto.descripcion}`"
            v-if="producto.imagen"
            class="h-[60px] w-[60px] rounded shadow"
          />
        </td>
        <td>{{ producto.descripcion }}</td>
        <td>{{ producto.categoria }}</td>

        <td>
          <p class="flex justify-center items-center gap-2">
            $ {{ producto.preciounitario }}
            <span class="w-[1rem] text-warning md:tooltip" data-tip="Precio desactualizado!">
              <AlertIcon v-if="producto.precioUnitarioVencido" />
            </span>
          </p>
        </td>
        <td class="flex justify-center">
          <CheckProductoPedido v-if="isPedido" :producto="producto" />
          <router-link
            class="btn text-primary"
            :to="{ name: 'product', params: { id: producto.id } }"
            v-else
          >
            <InfoIcon />
          </router-link>
        </td>
      </tr>
    </template>
  </TableComponent>

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

import { timeStamp } from '@/utils';
import { useProductosStore } from '@productos/store/productosStore';
import { PaginationComponent } from '@common/components/Pagination';
import { SearchIcon, InfoIcon, AlertIcon } from '@common/components/icons';
import { CheckProductoPedido } from '@pedidos/components';

const thProductos = ['Codigo', 'Imagen', 'Descripción', 'Cateogira', 'Precio unitario', 'Accion'];

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
  productoStore.clearProductsList();
});
</script>
