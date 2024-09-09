import { computed, ref } from 'vue';
import { useProductosStore } from '../store/productosStore';
import { timeStamp, Toast } from '@/utils';

interface Props {
  productoId: number;
  image: string | null;
}

export const useUploadImage = (props: Props) => {
  const productStore = useProductosStore();

  const file = ref<File | null>();
  const isUpdatingImage = ref(false);
  const isDeleting = ref(false);

  const imageUrl = ref(props.image ? props.image : '/no-image.webp');

  const computedImageUrl = computed(() => {
    return imageUrl.value + '?t=' + timeStamp();
  });

  const handleFormUploadImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (!target.files) {
      return false;
    }

    isUpdatingImage.value = true;

    file.value = target.files[0];

    const result = await productStore.uploadProductImage(props.productoId, file.value);

    if (result) {
      imageUrl.value = `${props.image}?t=${timeStamp()}`;
      file.value = null;
      const fileInput = document.getElementById('productIdFile') as HTMLInputElement;
      fileInput.value = '';
      Toast.success('Imagen subida');
    } else {
      Toast.error('Error al subir la imagen');
    }

    isUpdatingImage.value = false;
  };

  const handleDeleteImage = async () => {
    isDeleting.value = true;
    const result = await productStore.deleteImagen(props.productoId);

    if (result) {
      imageUrl.value = '/no-image.webp';
      Toast.success('Imagen eliminada');
    } else {
      Toast.error('Error al eliminar la imagen');
    }

    isDeleting.value = false;
  };

  return {
    computedImageUrl,
    isUpdatingImage,
    isDeleting,

    handleFormUploadImage,
    handleDeleteImage,
  };
};
