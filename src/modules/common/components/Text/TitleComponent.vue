<template>
  <div class="flex justify-between items-center">
    <h1 class="text-xl font-bold">{{ text }}</h1>
    <slot name="action"> </slot>
  </div>
  <div class="divider"></div>
</template>

<script lang="ts" setup>
interface Props {
  text?: string;
}

withDefaults(defineProps<Props>(), {
  text: 'Default Title',
});
</script>
