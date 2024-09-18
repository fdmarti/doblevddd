export const formatCurrency = (price: number | undefined | null) => {
  if (!price) return 0;
  let currentValue = price;

  if (typeof price === 'string') currentValue = Number(price);

  const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(currentValue);
};
