<template>
  <section class="mb-5">
    <label class="input input-bordered flex items-center gap-2">
      <input
        type="text"
        class="grow"
        placeholder="Buscar"
        v-model="extrasStore.extrasFilter"
        name="extra-search"
        id="extra-search"
      />
      <SearchIcon />
    </label>
  </section>

  <TableComponent
    v-if="extrasStore.extras"
    :arr-length="extrasStore.extras.length"
    :is-loading="extrasStore.isLoading"
    :table-head-arr="['Codigo', 'Descripción', 'Precio', 'Accion']"
  >
    <template #tbody>
      <tbody>
        <tr class="hover" v-for="extra in extrasStore.extras" :key="extra.id">
          <th>#{{ extra.id }}</th>
          <td>{{ extra.descripcion }}</td>
          <td>$ {{ extra.precio }}</td>
          <td class="flex justify-center gap-2">
            <button class="btn" @click="emits('edit', extra)">
              <EditIcon />
            </button>
            <button class="btn" @click="toggleDeleteExtra(extra)">
              <TrashIcon />
            </button>
          </td>
        </tr>
      </tbody>
    </template>
  </TableComponent>

  <section class="flex justify-center">
    <PaginationComponent
      :current-page="extrasStore.currentPage"
      @nextPage="nextPageExtras"
      @previousPage="prevPageExtras"
      :total-pages="extrasStore.totalPages"
    />
  </section>

  <ExtraModalDelete :open="showModalDelete" :deleteExtra="deleteExtra" @close="toggleDeleteExtra" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { SearchIcon, EditIcon, TrashIcon } from '@common/components/icons';
import PaginationComponent from '@/modules/common/components/PaginationComponent.vue';
import { ExtraModalDelete } from '@extras/components';
import { TableComponent } from '@common/components/Table';

import type { Extra } from '@extras/interface/extras.response';

import { useExtrasStore } from '@extras/store/extrasStore';
const extrasStore = useExtrasStore();
const { nextPageExtras, prevPageExtras } = extrasStore;

const showModalDelete = ref(false);
const deleteExtra = ref<null | Extra>();

const emits = defineEmits(['edit']);

const toggleDeleteExtra = (extra: Extra) => {
  showModalDelete.value = !showModalDelete.value;
  if (showModalDelete.value) {
    deleteExtra.value = extra;
  } else {
    deleteExtra.value = null;
  }
};

onMounted(async () => {
  await extrasStore.getExtras();
});
</script>
