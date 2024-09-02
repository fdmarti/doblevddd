<template>
  <button class="btn btn-success" :type="type">
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset';
}

withDefaults(defineProps<Props>(), {
  type: 'button',
});
</script>
