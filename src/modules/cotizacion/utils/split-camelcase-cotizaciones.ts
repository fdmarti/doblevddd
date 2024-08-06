export const splitCamelCase = (str: string) => {
  const split = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  const capitalize = split.charAt(0).toUpperCase() + split.slice(1);
  return capitalize;
};
