<template>
  <TitleDividerComponent title="Precio por mayor" />
  <div class="flex mt-14">
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
          v-model="amount"
        />
      </label>
      <ButtonSuccess type="submit" :disabled="false">
        <LoadingSpinner v-if="false" />
        <span v-else>Calcular</span>
      </ButtonSuccess>
    </form>
    <div class="divider divider-horizontal"></div>
    <section class="w-full flex-grow">
      <TitleComponent text="Resultado" />
      <div>
        <p>Cantidad : {{ amount }}</p>
        <p>Precio por unidad : $ 0</p>
        <p>Precio Total : $ 0</p>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { TitleDividerComponent, TitleComponent } from '@common/components/Text';
import { ButtonSuccess } from '@common/components/Buttons';
import { LoadingSpinner } from '@common/components/Loading';
import { useFormPrecioCantidad } from '@productos/composables/useFormPrecioCantidad';

const { amount, handleSubmitFormCantidad } = useFormPrecioCantidad();
</script>
