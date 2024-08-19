<template>
  <div class="flex flex-col">
    <span class="text-gray-400 uppercase text-xs mb-1 font-semibold">{{ title }}</span>
    <span class="font-bold text-xl">{{ text }}</span>
  </div>
  <component :is="componentIcon" v-if="componentIcon" />
</template>
<script lang="ts" setup>
import type { Component } from 'vue';

interface Props {
  title: string;
  text: string;
  componentIcon: Component;
}

defineProps<Props>();
</script>
