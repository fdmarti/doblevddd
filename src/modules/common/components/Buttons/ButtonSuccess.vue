<template>
  <button class="btn btn-success" :disabled="disabled" :type="type">
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
});
</script>
