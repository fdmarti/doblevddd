<template>
  <div :class="styleProgressByValue" :style="styleValueRadialProgress" role="progressbar">
    {{ value.toFixed(0) }}%
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  value: number;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
});

const styleValueRadialProgress = computed(() => {
  return `--value: ${props.value}; --size: 4rem`;
});

const styleProgressByValue = computed(() => {
  let defautColorText = '';

  switch (true) {
    case props.value === 0:
      defautColorText = '';
      break;
    case props.value <= 25:
      defautColorText = 'text-error';
      break;
    case props.value <= 50:
      defautColorText = 'text-warning';
      break;
    case props.value <= 75:
      defautColorText = 'text-info';
      break;
    case props.value === 100:
      defautColorText = 'text-success';
      break;

    default:
      defautColorText = '';
      break;
  }

  return `radial-progress font-semibold ${defautColorText} text-sm`;
});
</script>
