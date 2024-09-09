<template>
  <button class="btn btn-success" :disabled="disabled" :type="type">
    <LoadingSpinner v-if="isLoading" />
    <slot v-else></slot>
  </button>
</template>
<script setup lang="ts">
import { LoadingSpinner } from '@common/components/Loading';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  isLoading: false,
});
</script>
