import axios from 'axios';

const doblevApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export { doblevApi };
