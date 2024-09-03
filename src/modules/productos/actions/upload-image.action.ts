import { doblevApi } from '@/api/doblevApi';
import { headersFiles } from '@/api/headersApi';

export const UploadImageProduct = async (productId: number, file: File) => {
  try {
    const { data } = await doblevApi.post(
      `/productos/${productId}/imagen`,
      {
        file,
      },
      { headers: headersFiles },
    );

    console.log(data);
  } catch (error) {
    return error;
  }
};
