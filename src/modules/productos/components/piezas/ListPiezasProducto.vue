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
          <td>$ {{ pieza.cotizacion.electricidad }}</td>
          <td>$ {{ pieza.cotizacion.plastico }}</td>
          <td>$ {{ pieza.cotizacion.costoAmortizacion }}</td>
          <td>$ {{ pieza.cotizacion.tazaFallos }}</td>
          <td>{{ pieza.peso }}g</td>
          <td>{{ pieza.horas }}hr {{ pieza.minutos }}m</td>
          <td>$ {{ pieza.cotizacion.costoPieza }}</td>
        </tr>
      </tbody>
    </template>
  </TableComponent>
</template>

<script setup lang="ts">
import type { Pieza } from '@productos/interfaces/producto.response';
import { TableComponent } from '@common/components/Table';

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
