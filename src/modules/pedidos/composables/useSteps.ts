import { ref } from 'vue';

export const useSteps = (steps: number) => {
  const currentStep = ref(0);
  const maxSteps = steps;

  const nextStep = () => {
    if (currentStep.value + 1 <= maxSteps) {
      currentStep.value++;
    }
  };

  const prevStep = () => {
    if (currentStep.value - 1 >= 0) {
      currentStep.value--;
    }
  };

  return {
    currentStep,
    maxSteps,

    nextStep,
    prevStep,
  };
};
