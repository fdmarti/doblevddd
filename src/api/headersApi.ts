const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem(import.meta.env.VITE_TOKEN_LOCALSTORAGE_NAME);

  if (token) return token;

  localStorage.removeItem(import.meta.env.VITE_TOKEN_LOCALSTORAGE_NAME);

  return null;
};

export const headers = {
  'Content-Type': 'application/json',
  'x-access-token': getTokenFromLocalStorage(),
};

export const headersFiles = {
  'Content-Type': 'multipart/form-data',
  'x-access-token': getTokenFromLocalStorage(),
};
