<template>
  <div class="flex flex-col">
    <span class="text-gray-400 uppercase text-xs mb-1 font-semibold">{{ primaryText }}</span>
    <span class="font-bold text-xl">
      {{ typeof primaryValue === 'number' ? `${formatCurrency(primaryValue)}` : primaryValue }}
    </span>
  </div>

  <div class="flex flex-col" v-if="secondaryTitle">
    <span class="text-gray-400 uppercase text-xs mb-1 font-semibold">{{ secondaryTitle }}</span>
    <span :class="`font-bold text-xl`"> {{ formatCurrency(secondaryValue) }}</span>
  </div>
  <component :is="componentIcon" v-if="componentIcon" />
</template>
<script lang="ts" setup>
import { type Component } from 'vue';
import { formatCurrency } from '@/utils/numbers/format-currency';

interface Props {
  primaryText: string;
  primaryValue?: string | number;
  secondaryTitle?: string;
  secondaryValue?: number;
  componentIcon: Component;
}

defineProps<Props>();
</script>
