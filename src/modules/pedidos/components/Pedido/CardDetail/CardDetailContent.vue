<template>
  <div class="flex flex-col">
    <span class="text-gray-400 uppercase text-xs mb-1 font-semibold">{{ primaryText }}</span>
    <span class="font-bold text-xl">
      {{ typeof primaryValue === 'number' ? `$ ${primaryValue}` : primaryValue }}
    </span>
  </div>

  <div class="flex flex-col" v-if="secondaryTitle">
    <span class="text-gray-400 uppercase text-xs mb-1 font-semibold">{{ secondaryTitle }}</span>
    <span :class="`font-bold text-xl`"> $ {{ secondaryValue }}</span>
  </div>
  <component :is="componentIcon" v-if="componentIcon" />
</template>
<script lang="ts" setup>
import { type Component } from 'vue';

interface Props {
  primaryText: string;
  primaryValue?: string | number;
  secondaryTitle?: string;
  secondaryValue?: string | number;
  componentIcon: Component;
}

defineProps<Props>();
</script>
