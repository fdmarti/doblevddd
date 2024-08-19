const token = localStorage.getItem(import.meta.env.VITE_TOKEN_LOCALSTORAGE_NAME);

export const headers = {
  'Content-Type': 'application/json',
  'x-access-token': token,
};

export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'x-access-token': token,
  };
};
