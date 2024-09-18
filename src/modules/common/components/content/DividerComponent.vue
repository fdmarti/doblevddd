<template>
  <div :class="`divider ${direction}`">
    <h2 class="font-semibold text-2xl mb-3" v-if="text">{{ text }}</h2>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  text?: string;
  direction?: 'divider-vertical' | 'divider-horizontal';
}

withDefaults(defineProps<Props>(), {
  text: '',
  direction: 'divider-vertical',
});
</script>
