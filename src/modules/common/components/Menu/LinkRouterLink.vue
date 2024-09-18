<template>
  <li>
    <RouterLink :to="{ name: nameRoute }">{{ text }}</RouterLink>
  </li>
</template>
<script lang="ts" setup>
interface Props {
  nameRoute: string;
  text: string;
}

defineProps<Props>();
</script>
