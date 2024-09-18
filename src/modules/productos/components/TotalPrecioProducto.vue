<template>
  <DividerComponent text="Total" />
  <section
    class="w-full max-w-6xl text-center mt-5 flex justify-around md:flex-row flex-col gap-4 md:gap-0 bg-base-300 rounded-md p-5 shadow mx-auto"
  >
    <span class="text-lg font-semibold">
      Costo Total : {{ formatCurrency(precio.costototal) ?? 0 }}
    </span>
    <span class="text-lg font-semibold">Ganancia : {{ formatCurrency(precio.ganancia) ?? 0 }}</span>
    <span class="text-lg font-semibold">
      Precio unitario : {{ formatCurrency(precio.preciounitario) ?? 0 }}
    </span>
    <span class="text-lg font-semibold"
      >Precio sugerido : {{ formatCurrency(precio.preciosugerido) ?? 0 }}</span
    >
  </section>
</template>

<script setup lang="ts">
import { formatCurrency } from '@/utils/numbers/format-currency';
import type { Precio } from '@productos/interfaces/producto.response';

interface Props {
  precio: Precio;
}

defineProps<Props>();
</script>
