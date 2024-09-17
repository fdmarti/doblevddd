export const cleanInputFile = (idInput: string) => {
  const fileInput = document.getElementById(idInput) as HTMLInputElement;
  fileInput.value = '';
  return;
};
