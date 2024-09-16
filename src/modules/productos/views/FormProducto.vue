<template>
  <div v-if="isLoadingForm">
    <LoadingComponent />
  </div>
  <div v-else>
    <h1 class="text-xl font-bold mb-5">
      {{ isEditProduct ? `Editar producto` : `Nuevo producto` }}
    </h1>
    <div class="flex flex-col items-end h-full">
      <div class="w-full flex min-h-[600px] mb-5">
        <section class="basis-1/3">
          <div class="mt-5">
            <label class="input input-bordered flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="Nombre del producto"
                class="grow"
                id="productName"
                name="productName"
                autocomplete="name"
                v-model="product.productName"
              />
              <BoxIcon />
            </label>
            <select
              class="select select-bordered w-full max-w-xs"
              name="categoria"
              id="categoria"
              v-model="product.categoria"
            >
              <option disabled selected value="0">Seleccionar una categoria</option>
              <option
                v-for="categoria in categoriaStore.categoriasAll"
                :key="categoria.id"
                class="text-base"
                :value="categoria.id"
              >
                {{ categoria.descripcion }}
              </option>
            </select>
            <div class="divider"></div>
            <h2 class="mt-2 font-bold text-lg">Extras</h2>

            <CheckExtras
              :isLoading="extrasStore.isLoading"
              :extras="extrasStore.extrasAll"
              v-model="product.extras"
            />
          </div>
        </section>
        <div class="divider divider-horizontal"></div>
        <section class="w-full">
          <h2>Listado de Piezas</h2>
          <div class="divider"></div>
          <div class="flex gap-2 flex-wrap">
            <CardPieza
              v-for="(pieza, index) in product.piezas"
              :key="pieza.descripcion"
              :pieza="pieza"
              @delete-pieza="handleDeletePieza(index)"
            />
            <CardPieza @click="togglePopup" />
          </div>
        </section>
      </div>
      <button class="btn btn-primary" @click="handleSubmitFormProducto">Guardar</button>
    </div>
  </div>
  <FormPiezaModal :open="showModalPieza" @close="togglePopup" @save-pieza="handleNewPieza" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

import LoadingComponent from '@common/components/LoadingComponent.vue';
import { BoxIcon } from '@common/components/icons';
import { CardPieza, FormPiezaModal } from '@productos/components/piezas';
import { CheckExtras } from '@productos/components/extras';

import { useFormProduct } from '@productos/composables/useFormProduct';
import { useExtrasStore } from '@extras/store/extrasStore';
import { useCategoriaStore } from '@categorias/store/categoriaStore';
import { useProductosStore } from '@productos/store/productosStore';

const categoriaStore = useCategoriaStore();
const extrasStore = useExtrasStore();
const productStore = useProductosStore();

const route = useRoute();

const {
  handleDeletePieza,
  handleNewPieza,
  handleSubmitFormProducto,
  togglePopup,
  setProductEdit,
  product,
  showModalPieza,
  isEditProduct,
  isLoadingForm,
} = useFormProduct();

onMounted(async () => {
  await categoriaStore.getCategories();
  await extrasStore.getExtras();

  const { query } = route;
  if (query.id) {
    isEditProduct.value = true;
    await setProductEdit(query.id.toString());
    return;
  }
});

onUnmounted(() => {
  productStore.clearProductState();
});
</script>
