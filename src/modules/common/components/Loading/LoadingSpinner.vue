<template>
  <span :class="`loading loading-spinner ${size}`"></span>
</template>
<script lang="ts" setup>
interface Props {
  size?: string;
}

withDefaults(defineProps<Props>(), {
  size: 'loading-md',
});
</script>
