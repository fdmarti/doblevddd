import { computed, ref } from 'vue';

export const usePassword = () => {
  const inputType = ref('password');

  const onChangeInputType = () => {
    inputType.value = inputType.value === 'text' ? 'password' : 'text';
  };

  return {
    inputType,
    onChangeInputType,

    isPasswordType: computed(() => (inputType.value === 'password' ? true : false)),
  };
};
