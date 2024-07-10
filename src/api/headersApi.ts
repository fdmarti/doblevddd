const token = localStorage.getItem(import.meta.env.VITE_TOKEN_LOCALSTORAGE_NAME);

export const getHeaders = () => ({
  'Content-Type': 'application/json',
  'x-access-token': token,
});
