<template>
  <div class="flex">
    <label class="cursor-pointer label gap-2">
      <span class="label-text text-base font-semibold" v-if="text">{{ text }}</span>
      <input
        type="checkbox"
        :checked="checked"
        :id="id"
        @input="updateCheckboxValue"
        :value="id"
        class="checkbox checkbox-primary"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string;
  id: string;
  checked: boolean;
  values: string[];
}

const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);

const updateCheckboxValue = (e: Event) => {
  const arrValues = props.values;
  const target = e.target as HTMLInputElement;

  if (arrValues.includes(target.value)) {
    arrValues.splice(arrValues.indexOf(props.id), 1);
  } else {
    arrValues.push(target.value);
  }

  emits('update:modelValue', arrValues);
};
</script>
