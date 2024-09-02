<template>
  <dialog :id="id" class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-blue-300 pb-5">
        <h2 class="text-xl font-bold">{{ title }}</h2>
      </div>
      <slot name="body"> </slot>
    </div>
  </dialog>
  <BackgroundModal v-if="open" />
</template>
<script lang="ts" setup>
import BackgroundModal from '@common/components/content/BackgroundModal.vue';

interface Props {
  id: string;
  title: string;
  open: boolean;
}

defineProps<Props>();
</script>
