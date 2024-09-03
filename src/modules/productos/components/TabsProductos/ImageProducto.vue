<template>
  <div>
    <div class="divider mt-10">
      <h2 class="font-semibold text-2xl mb-3">Imagen</h2>
    </div>

    <div class="flex flex-row mt-6">
      <section class="flex-1 flex flex-col justify-center items-center gap-5">
        <h2 class="text-lg font-semibold">Imagen actual</h2>
        <img
          :src="imageUrl"
          :alt="`product image ${productoId}`"
          class="max-w-sm rounded-lg shadow-2xl"
        />
      </section>
      <div class="divider divider-horizontal"></div>
      <form class="flex-1 flex flex-col items-end gap-2 justify-center">
        <input
          type="file"
          class="file-input file-input-bordered file-input-primary w-full"
          capture
          @change="handleFormUploadImage"
        />
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useProductosStore } from '@productos/store/productosStore';

const productStore = useProductosStore();

interface Props {
  productoId: number;
  image: string | null;
}

const props = defineProps<Props>();

const file = ref<File | null>();

const imageUrl = computed(() => {
  if (props.image) return props.image;

  return '/no-image.webp';
});

const handleFormUploadImage = async (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files) {
    file.value = target.files[0];

    const result = productStore.uploadProductImage(props.productoId, file.value);
  }
};
</script>
