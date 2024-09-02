<template>
  <div class="divider mt-10">
    <h2 class="font-semibold text-2xl mb-3">Total</h2>
  </div>
  <section
    class="w-full max-w-6xl text-center mt-5 flex justify-around md:flex-row flex-col gap-4 md:gap-0 bg-base-300 rounded-md p-5 shadow mx-auto"
  >
    <p class="text-lg font-semibold">Costo Total : $ {{ precio.costototal }}</p>
    <p class="text-lg font-semibold">Ganancia : $ {{ precio.ganancia }}</p>
    <p class="text-lg font-semibold">Precio unitario : $ {{ precio.preciounitario }}</p>
    <p class="text-lg font-semibold">Precio sugerido : $ {{ precio.preciosugerido }}</p>
  </section>
</template>

<script setup lang="ts">
import type { Precio } from '@productos/interfaces/producto.response';

interface Props {
  precio: Precio;
}

defineProps<Props>();
</script>
