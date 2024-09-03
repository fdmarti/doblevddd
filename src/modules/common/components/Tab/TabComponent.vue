<template>
  <RadioInputTab :aria-label="label" :checked="checked" :id="`tab-${label.replace(/ /g, '')}`" />
  <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import RadioInputTab from '@common/components/Inputs/RadioInputTab.vue';

interface Props {
  label: string;
  checked?: boolean;
}

withDefaults(defineProps<Props>(), {
  checked: false,
});
</script>
