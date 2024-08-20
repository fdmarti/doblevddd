export const calcPercentage = (initialCant: number = 10, maxValue: number = 100): number => {
  return Number(((initialCant * 100) / maxValue).toFixed(0));
};
