<template>
  <div :class="styleProgressByValue" :style="styleValueRadialProgress" role="progressbar">
    {{ value }}%
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
  return `--value: ${props.value}; --size: 3rem`;
});

const styleProgressByValue = computed(() => {
  let defautColorText = '';

  const propsFixed = Number(props.value.toFixed(0));

  switch (true) {
    case propsFixed === 0:
      defautColorText = '';
      break;
    case propsFixed <= 25:
      defautColorText = 'text-error';
      break;
    case propsFixed <= 50:
      defautColorText = 'text-warning';
      break;
    case propsFixed > 50 && propsFixed < 100:
      defautColorText = 'text-info';
      break;
    case propsFixed === 100:
      defautColorText = 'text-success';
      break;

    default:
      defautColorText = '';
      break;
  }

  return `radial-progress font-semibold ${defautColorText} text-xs`;
});
</script>
