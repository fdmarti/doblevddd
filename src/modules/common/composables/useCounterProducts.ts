import { ref } from 'vue';

export const useCounterProducts = (minValue: number = 1) => {
  const amountProducts = ref(minValue);

  const onHandleIncreaseAmount = (callback?: () => void) => {
    amountProducts.value++;

    if (callback) callback();
  };

  const onHandleDecreaseAmount = (callback?: () => void) => {
    if (amountProducts.value - 1 === 0) return;
    amountProducts.value--;

    if (callback) callback();
  };

  const resetAmountProducts = () => {
    amountProducts.value = minValue;
  };

  return {
    amountProducts,

    onHandleDecreaseAmount,
    onHandleIncreaseAmount,
    resetAmountProducts,
  };
};
