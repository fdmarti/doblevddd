<template>
  <button :class="`${classBtn}`" :disabled="disabled" :type="type">
    <LoadingSpinner v-if="isLoading" />
    <slot v-else></slot>
  </button>
</template>
<script setup lang="ts">
import { LoadingSpinner } from '@common/components/Loading';
import { computed } from 'vue';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  isLoading: false,
  color: 'success',
});

const classBtn = computed<string>(() => {
  let colorBtn = 'btn-success';
  switch (props.color) {
    case 'success':
      colorBtn = 'btn-success';
      break;
    case 'warning':
      colorBtn = 'btn-warning';
      break;
    case 'primary':
      colorBtn = 'btn-primary';
      break;
    case 'error':
      colorBtn = 'btn-error';
      break;
    case 'info':
      colorBtn = 'btn-info';
      break;

    default:
      colorBtn = 'btn-neutral';
  }

  return `btn ${colorBtn}`;
});
</script>
