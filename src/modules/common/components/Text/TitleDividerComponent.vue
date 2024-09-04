<template>
  <div class="divider mt-10">
    <h2 class="font-semibold text-2xl mb-3">{{ title }}</h2>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Default',
});
</script>
