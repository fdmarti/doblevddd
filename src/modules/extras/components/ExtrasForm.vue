<template>
  <PopupComponent
    id="modal-form-extra"
    :open="open"
    :title="props.extra?.isEditing ? 'Editar extra' : 'Nueva extra'"
  >
    <template #body>
      <div class="my-5">
        <form @submit.prevent="handleForm" class="flex flex-col gap-2">
          <label class="input input-bordered flex items-center gap-2">
            <input
              type="text"
              placeholder="Nombre del extra"
              class="grow"
              id="extra-description"
              name="extra-description"
              autocomplete="name"
              v-model="formData.descripcion"
            />
          </label>

          <label class="input input-bordered flex items-center gap-2">
            <input
              type="number"
              placeholder="0"
              class="grow"
              step=".01"
              id="extra-precio"
              name="extra-precio"
              v-model="formData.precio"
            />
            <DolarIcon />
          </label>

          <div class="border-t border-t-blue-300 pt-5 flex items-center justify-between">
            <DButton @click="emits('close')" color="error">Cancelar</DButton>
            <DButton type="submit">Guardar</DButton>
          </div>
        </form>
      </div>
    </template>
  </PopupComponent>
</template>
<script lang="ts" setup>
import { watch } from 'vue';
import { DolarIcon } from '@common/components/icons';
import type { Extra } from '@extras/interface/extras.response';
import { useExtraForm } from '@extras/composables/useExtraForm';

const { formData, handleEditExtra, handleExtraForm, resetExtraForm } = useExtraForm();

const handleForm = async () => {
  const result = await handleExtraForm();
  if (result) {
    emits('close');
  }
};

interface Props {
  extra?: {
    extra: Extra;
    isEditing: boolean;
  };
  open: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(['close']);

watch(props, (updProps) => {
  if (updProps.extra?.isEditing) {
    handleEditExtra(updProps.extra.extra);
  } else {
    resetExtraForm();
  }
});
</script>
