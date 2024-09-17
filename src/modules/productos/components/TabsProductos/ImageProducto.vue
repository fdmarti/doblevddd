<template>
  <div class="flex flex-col gap-3">
    <DividerComponent text="Imagen" />

    <div class="flex flex-row mt-6 w-full">
      <section class="flex-1 flex flex-col justify-center items-center gap-5">
        <h2 class="text-lg font-semibold">Imagen actual</h2>
        <LoadingSpinner size="w-[24rem]" v-if="isUpdatingImage" />
        <img
          :src="computedImageUrl"
          :alt="`product image ${productoId}`"
          class="max-w-md rounded-lg shadow-2xl w-full h-[24rem]"
          v-else
        />
      </section>
      <DividerComponent direction="divider-horizontal" />
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

    <DividerComponent text="Acciones" />

    <div class="flex justify-end">
      <DButton
        @click="handleDeleteImage"
        color="error"
        :is-loading="isDeleting"
        :disabled="isDeleting"
      >
        Eliminar imagen
      </DButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LoadingSpinner } from '@common/components/Loading';
import { DividerComponent } from '@common/components/content';
import { DButton } from '@common/components/Buttons';
import { useUploadImage } from '@productos/composables';

interface Props {
  productoId: number;
  image: string | null;
}

const props = defineProps<Props>();

const { computedImageUrl, isUpdatingImage, isDeleting, handleDeleteImage, handleFormUploadImage } =
  useUploadImage(props);
</script>
