<template>
  <TitleDividerComponent title="Imagen" />

  <div class="flex flex-row mt-6">
    <section class="flex-1 flex flex-col justify-center items-center gap-5">
      <h2 class="text-lg font-semibold">Imagen actual</h2>
      <LoadingSpinner size="w-[24rem]" v-if="isUpdatingImage" />
      <img
        :src="computedImageUrl"
        :alt="`product image ${productoId}`"
        class="max-w-sm rounded-lg shadow-2xl w-[24rem] h-[24rem]"
        v-else
      />
    </section>
    <div class="divider divider-horizontal"></div>
    <form class="flex-1 flex flex-col items-end gap-2 justify-center">
      <input
        type="file"
        class="file-input file-input-bordered file-input-primary w-full"
        capture
        id="productIdFile"
        @change="handleFormUploadImage"
        :disabled="isUpdatingImage"
        accept=".jpg,.jpeg,.png,.webp"
      />
    </form>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useProductosStore } from '@productos/store/productosStore';
import { LoadingSpinner } from '@common/components/Loading';
import { TitleDividerComponent } from '@common/components/Text';
import { timeStamp, Toast } from '@/utils';

const productStore = useProductosStore();

interface Props {
  productoId: number;
  image: string | null;
}

const props = defineProps<Props>();

const file = ref<File | null>();
const isUpdatingImage = ref(false);
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
</script>
