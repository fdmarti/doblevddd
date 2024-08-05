const token = localStorage.getItem(import.meta.env.VITE_TOKEN_LOCALSTORAGE_NAME);

export const headers = {
  'Content-Type': 'application/json',
  'x-access-token': token,
};

export const getHeaders = () => {
  console.log(token);
  return {
    'Content-Type': 'application/json',
    'x-access-token': token,
  };
};
