<template>
  <h1 class="mb-5 text-xl font-bold">{{ text }}</h1>
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
