<template>
  <section class="flex items-center justify-between">
    <h1 class="mb-5 text-2xl font-bold">Cotizaciones</h1>
    <DButton color="primary" @click="cotizacionStore.saveCotizacion">Guardar Cotizaciones</DButton>
  </section>
  <DividerComponent />

  <form class="grid sm:grid-cols-2 gap-5" id="cotizacion-form" name="cotizacion-form">
    <label
      class="form-control w-full"
      v-for="(_, index) in cotizacionStore.cotizaciones"
      :key="index"
    >
      <div class="label">
        <span class="label-text font-semibold text-lg">{{ splitCamelCase(index) }}</span>
      </div>
      <input
        type="number"
        placeholder="0"
        step=".01"
        class="input input-bordered w-full"
        v-model="cotizacionStore.cotizaciones[index]"
      />
    </label>
  </form>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCotizacionStore } from '@cotizacion/store/cotizacionesStore';
import { splitCamelCase } from '@cotizacion/utils';
import { DividerComponent } from '@common/components/content';
import { DButton } from '@common/components/Buttons';

const cotizacionStore = useCotizacionStore();

onMounted(async () => {
  await cotizacionStore.getCotizaciones();
});
</script>
