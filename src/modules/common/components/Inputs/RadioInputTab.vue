<template>
  <input
    type="radio"
    name="tab-detalle"
    :id="id"
    role="tab"
    class="tab"
    :aria-label="ariaLabel"
    :checked="checked"
  />
</template>
<script lang="ts" setup>
interface Props {
  id: string;
  ariaLabel: string;
  checked?: boolean;
}

withDefaults(defineProps<Props>(), {
  id: 'tab-detalle-default',
  ariaLabel: 'Default',
  checked: false,
});
</script>
