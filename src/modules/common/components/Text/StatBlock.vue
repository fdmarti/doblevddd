<template>
  <div class="stat cursor-pointer hover:shadow-2xl">
    <div class="stat-title font-bold">{{ text }}</div>
    <div :class="`stat-value text-center ${textColor} text-[2rem]`">{{ value }}</div>
    <div class="stat-desc"><slot name="desc"></slot></div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  text: string;
  value: number | string;
}

const props = defineProps<Props>();

const textColor = computed(() => {
  switch (props.text) {
    case 'Listos':
      return 'text-success';
    case 'Imprimiendo':
      return 'text-info';
    case 'Errores':
      return 'text-error';
    case 'Cancelados':
      return 'text-warning';

    default:
      return 'text-neutral';
  }
});
</script>
