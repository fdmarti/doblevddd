<template>
  <div class="flex flex-col">
    <span class="text-gray-400 uppercase text-xs mb-1 font-semibold">{{ title }}</span>
    <span class="font-bold text-xl">{{ text }}</span>
  </div>
  <component :is="componentIcon" v-if="componentIcon" />
</template>
<script lang="ts" setup>
import type { DefineComponent } from 'vue';

interface Props {
  title?: string;
  text?: string;
  componentIcon?: DefineComponent;
}

withDefaults(defineProps<Props>(), {
  text: 'Content Default',
  title: 'Title default',
});
</script>
