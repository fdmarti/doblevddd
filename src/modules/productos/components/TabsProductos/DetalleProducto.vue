<template>
  <div class="divider mt-10">
    <h2 class="font-semibold text-2xl mb-3">Cotización</h2>
  </div>
  <section class="w-full max-w-4xl text-center mt-5 mx-auto">
    <div class="flex justify-between md:flex-row flex-col gap-4 md:gap-0">
      <p class="text-lg font-semibold">
        Tiempo <br />
        {{ cotizacion.totalHoras }}hrs {{ cotizacion.totalMinutos }}m
      </p>
      <p class="text-lg font-semibold">
        Costo Elaboración <br />
        $ {{ cotizacion.costoElaboracion }}
      </p>
      <p class="text-lg font-semibold">
        Costo Peso <br />
        {{ cotizacion.totalPeso }}g
      </p>
      <p class="text-lg font-semibold">
        Plastico <br />
        $ {{ cotizacion.plastico }}
      </p>
    </div>
  </section>
</template>
<script lang="ts" setup>
import type { CotizacionTotal } from '@productos/interfaces/producto.response';

interface Props {
  cotizacion: CotizacionTotal;
}

defineProps<Props>();
</script>
