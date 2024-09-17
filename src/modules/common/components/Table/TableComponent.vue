<template>
  <div class="overflow-x-auto mb-10">
    <table class="table bg-base-300">
      <TableHeader :tableHeadArr="tableHeadArr" />
      <tbody v-if="isLoading">
        <tr>
          <td :colspan="tableHeadArr.length">
            <LoadingComponent />
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="arrLength === 0">
        <tr>
          <td :colspan="tableHeadArr.length">No hay datos</td>
        </tr>
      </tbody>
      <slot name="tbody" v-else> </slot>
      <slot name="tfoot"> </slot>
    </table>
  </div>
</template>
<script setup lang="ts">
import { TableHeader } from '@common/components/Table';

interface Props {
  tableHeadArr: string[];
  isLoading: boolean;
  arrLength?: number;
}

withDefaults(defineProps<Props>(), {
  arrLength: 5,
});
</script>
