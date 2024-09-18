<template>
  <LoadingComponent v-if="isLoading" />
  <div v-else>
    <div class="form-control w-52" v-for="extra in extras" :key="extra.id">
      <label class="label cursor-pointer">
        <span class="label-text">{{ extra.descripcion }}</span>
        <input
          type="checkbox"
          class="toggle toggle-info"
          :id="`checkbox-${extra.id}`"
          :value="extra.id"
          @input="$emit('update:modelValue', handleEditListExtras(extra.id))"
          :checked="modelValue.includes(extra.id)"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Extra } from '@extras/interface/extras.response';

interface Props {
  extras: Extra[];
  isLoading: boolean;
  modelValue: number[];
}

const props = defineProps<Props>();

const handleEditListExtras = (extraId: number) => {
  let element = document.getElementById(`checkbox-${extraId}`) as HTMLInputElement;

  if (element.checked) {
    return [...props.modelValue, extraId];
  } else {
    return [...props.modelValue].filter((e) => e != extraId);
  }
};
</script>
