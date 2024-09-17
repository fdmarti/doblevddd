<template>
  <div class="flex justify-between items-center">
    <h1 class="text-xl font-bold">{{ text }}</h1>
    <slot name="action"> </slot>
  </div>
  <DividerComponent />
</template>

<script lang="ts" setup>
import { DividerComponent } from '@common/components/content';

interface Props {
  text?: string;
}

withDefaults(defineProps<Props>(), {
  text: 'Default Title',
});
</script>
