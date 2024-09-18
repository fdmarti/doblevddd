<template>
  <div>
    <DividerComponent text="Precio por mayor" />
    <div class="flex mt-10">
      <form
        @submit.prevent="handleSubmitFormCantidad"
        class="flex w-full gap-3 items-end flex-col flex-grow"
      >
        <label class="input input-bordered flex items-center gap-2 w-full">
          Cantidad
          <input
            type="number"
            step="1"
            placeholder="0"
            class="grow text-right"
            id="amountProductos"
            name="amountProductos"
            v-model="priceByAmount.unidades"
          />
        </label>
        <DButton type="submit" :disabled="isSearching" :is-loading="isSearching">
          Calcular
        </DButton>
      </form>
      <DividerComponent direction="divider-horizontal" />
      <section class="w-full flex-grow">
        <TitleComponent text="Resultado" />
        <div>
          <p class="text-lg font-semibold">Cantidad : {{ priceByAmount.unidades }}</p>
          <p class="text-lg font-semibold">
            Precio por unidad : {{ formatCurrency(priceByAmount.unidad) }}
          </p>
          <p class="text-lg font-semibold">
            Descuento : {{ priceByAmount.descuento.toFixed(2) }} %
          </p>
          <p class="text-lg font-semibold">
            Precio Total : {{ formatCurrency(priceByAmount.total) }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { formatCurrency } from '@/utils/numbers/format-currency';
import { useFormPrecioCantidad } from '@productos/composables';

const { priceByAmount, isSearching, handleSubmitFormCantidad } = useFormPrecioCantidad();
</script>
