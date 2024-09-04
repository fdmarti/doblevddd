import { doblevApi } from '@/api/doblevApi';
import { headersFiles } from '@/api/headersApi';

interface UploadSuccess {
  imagen: string;
  status: true;
}

interface UploadError {
  status: false;
}

export const UploadImageProduct = async (
  productId: number,
  file: File,
): Promise<UploadSuccess | UploadError> => {
  try {
    const { data } = await doblevApi.post<UploadSuccess | UploadError>(
      `/productos/${productId}/imagen`,
      {
        file,
      },
      { headers: headersFiles },
    );

    if (data.status) {
      return {
        status: true,
        imagen: data.imagen,
      };
    }

    return {
      status: false,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};
