import { ref } from 'vue';
import { doblevApi } from '@/api/doblevApi';
import { headers } from '@/api/headersApi';

interface Response {
  data: any | null;
  error: Error | null;
}

export const useFetch = async (url: string): Promise<Response> => {
  const dataFetch = ref(null);
  const err = ref(null);

  try {
    const { data } = await doblevApi.get(url, {
      headers,
    });

    dataFetch.value = data;
  } catch (error: any) {
    err.value = error;
  }

  return { data: dataFetch.value, error: err.value };
};
