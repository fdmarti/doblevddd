<template>
  <section class="mb-5">
    <label class="input input-bordered flex items-center gap-2">
      <input
        type="text"
        class="grow"
        placeholder="Buscar"
        v-model="categoryStore.categoriasFilter"
        name="categoria-search"
        id="categoria-search"
      />
      <SearchIcon />
    </label>
  </section>

  <TableComponent
    :arr-length="categoryStore.categorias!.length"
    :is-loading="categoryStore.isLoading"
    :table-head-arr="thCategorias"
  >
    <template #tbody>
      <tbody>
        <tr class="hover" v-for="categoria in categoryStore.categorias" :key="categoria.id">
          <th>#{{ categoria.id }}</th>
          <td>{{ categoria.descripcion }}</td>
          <td>{{ categoria.productos }}</td>
          <td>{{ categoria.margen }} %</td>
          <td>
            <CheckboxCatalogo :checked="categoria.catalogo" :categoryId="categoria.id" />
          </td>
          <td class="flex justify-center gap-2">
            <button class="btn" @click="emits('edit', categoria)">
              <EditIcon />
            </button>
            <button class="btn" @click="toggleDeleteCategory(categoria)">
              <TrashIcon />
            </button>
          </td>
        </tr>
      </tbody>
    </template>
  </TableComponent>

  <section class="flex justify-center">
    <PaginationComponent
      :current-page="categoryStore.currentPage"
      @nextPage="nextPageCategorias"
      @previousPage="prevPageCategorias"
      :total-pages="categoryStore.totalPages"
    />
  </section>

  <ModalDeleteCategoria
    :open="showModalDelete"
    :deleteCategory="deleteCategory"
    @close="toggleDeleteCategory"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TableComponent } from '@common/components/Table';
import { ModalDeleteCategoria, CheckboxCatalogo } from '@categorias/components';
import { SearchIcon, EditIcon, TrashIcon } from '@common/components/icons';
import { PaginationComponent } from '@/modules/common/components/pagination';
import { useCategoriaStore } from '@categorias/store/categoriaStore';
import type { Categoria } from '@categorias/interfaces/categorias.response';

const thCategorias = ['Codigo', 'Descripción', 'Productos', 'Margen', 'Catalogo', 'Accion'];

const categoryStore = useCategoriaStore();
const { nextPageCategorias, prevPageCategorias } = categoryStore;

const showModalDelete = ref(false);
const deleteCategory = ref<null | Categoria>();

const emits = defineEmits(['edit']);

const toggleDeleteCategory = (category: Categoria) => {
  showModalDelete.value = !showModalDelete.value;
  if (showModalDelete.value) {
    deleteCategory.value = category;
  } else {
    deleteCategory.value = null;
  }
};

onMounted(async () => {
  await categoryStore.getCategories();
});
</script>
