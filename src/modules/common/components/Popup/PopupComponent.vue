<template>
  <dialog :id="id" class="modal" :open="open">
    <div class="modal-box">
      <TitleComponent :text="title" />
      <slot name="body"> </slot>
    </div>
  </dialog>
  <BackgroundModal v-if="open" />
</template>
<script lang="ts" setup>
import { BackgroundModal } from '@common/components/content';
import { TitleComponent } from '@common/components/Text';

interface Props {
  id: string;
  title: string;
  open: boolean;
}

defineProps<Props>();
</script>
