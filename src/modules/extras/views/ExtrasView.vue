<template>
  <div>
    <ExtrasList @edit="onHandleEditExtra" />
    <ExtrasForm :open="showModalExtra" @close="onToggleExtraPopup" :extra="editExtra" />
    <FabButton @click="onToggleExtraPopup">
      <ExtraIcon :size="26" />
    </FabButton>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

import { ExtrasList, ExtrasForm } from '@extras/components';
import { FabButton } from '@common/components';
import { ExtraIcon } from '@common/components/icons';
import type { Extra } from '@extras/interface/extras.response';
import { extrasInitialState } from '@extras/utils/ExtraInit';

const showModalExtra = ref(false);
const editExtra = reactive({
  extra: { ...extrasInitialState },
  isEditing: false,
});

const onToggleExtraPopup = () => {
  showModalExtra.value = !showModalExtra.value;

  if (!showModalExtra.value) {
    editExtra.isEditing = false;
    Object.assign(editExtra.extra, extrasInitialState);
  }
};

const onHandleEditExtra = (extra: Extra) => {
  Object.assign(editExtra.extra, extra);
  editExtra.isEditing = true;
  onToggleExtraPopup();
};
</script>
