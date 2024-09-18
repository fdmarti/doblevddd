<template>
  <TableComponent
    :arr-length="piezas.length"
    :is-loading="false"
    :table-head-arr="colsHeader"
    v-if="piezas"
  >
    <template #tbody>
      <tbody>
        <tr v-for="(pieza, index) in piezas" :key="pieza.descripcion" class="[&_td]:text-sm">
          <th>#{{ index + 1 }}</th>
          <td>{{ pieza.descripcion }}</td>
          <td>{{ formatCurrency(pieza.cotizacion.electricidad) }}</td>
          <td>{{ formatCurrency(pieza.cotizacion.plastico) }}</td>
          <td>{{ formatCurrency(pieza.cotizacion.costoAmortizacion) }}</td>
          <td>{{ formatCurrency(pieza.cotizacion.tazaFallos) }}</td>
          <td>{{ pieza.peso }}g</td>
          <td>{{ pieza.horas }}hr {{ pieza.minutos }}m</td>
          <td>{{ formatCurrency(pieza.cotizacion.costoPieza) }}</td>
        </tr>
      </tbody>
    </template>
  </TableComponent>
</template>

<script setup lang="ts">
import { formatCurrency } from '@/utils/numbers/format-currency';
import type { Pieza } from '@productos/interfaces/producto.response';

const colsHeader = [
  '',
  'Descripción',
  'Electricidad',
  'Plástico',
  'Amortización',
  'Taza fallos',
  'Peso',
  'Tiempo',
  'Costo total',
];

interface Props {
  piezas?: Pieza[];
}

defineProps<Props>();
</script>
