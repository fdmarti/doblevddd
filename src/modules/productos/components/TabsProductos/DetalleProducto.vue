<template>
  <DividerComponent text="Cotización" />
  <div class="flex flex-col gap-2">
    <section class="grid md:grid-cols-2 gap-5 w-full mt-5 mb-7">
      <CardDetailLayout v-for="block in detailsBlocks" :key="block.primaryText">
        <CardDetailContent
          :component-icon="block.icon"
          :primary-text="block.primaryText"
          :primary-value="block.primaryValue"
        />
      </CardDetailLayout>
    </section>
    <section>
      <TotalPrecioProducto :precio="precio" />
    </section>
  </div>
</template>
<script lang="ts" setup>
import { TotalPrecioProducto } from '@productos/components';
import { TimeIcon, WeightIcon, DiamondIcon, MoneyBagIcon } from '@common/components/icons';
import { CardDetailContent, CardDetailLayout } from '@common/components/Card';
import type { CotizacionTotal, Precio } from '@productos/interfaces/producto.response';

interface Props {
  cotizacion: CotizacionTotal;
  precio: Precio;
}

const props = defineProps<Props>();

const detailsBlocks = [
  {
    icon: TimeIcon,
    primaryText: 'Tiempo',
    primaryValue: `${props.cotizacion.totalHoras}hrs ${props.cotizacion.totalMinutos}m`,
  },
  {
    icon: MoneyBagIcon,
    primaryText: 'Costo Elaboración',
    primaryValue: props.cotizacion.costoElaboracion,
  },
  {
    icon: WeightIcon,
    primaryText: 'Costo Peso',
    primaryValue: `${props.cotizacion.totalPeso}g`,
  },
  {
    icon: DiamondIcon,
    primaryText: 'Plastico',
    primaryValue: props.cotizacion.plastico,
  },
];
</script>
