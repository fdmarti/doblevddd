<template>
  <thead>
    <tr class="bg-base-200">
      <th v-for="(the, index) in tableHeadArr" :key="index">{{ the }}</th>
    </tr>
  </thead>
</template>
<script lang="ts" setup>
interface Props {
  tableHeadArr: string[];
}

defineProps<Props>();
</script>
