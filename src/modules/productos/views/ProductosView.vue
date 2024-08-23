<template>
  <div class="text-center">
    <ProductosList />
    <FabButton @click="handleNewProducto">
      <BoxIcon />
    </FabButton>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ProductosList } from '@productos/components';
import { FabButton } from '@common/components/Buttons';
import { BoxIcon } from '@/modules/common/components/icons';

const router = useRouter();

const handleNewProducto = () => {
  router.push({ name: 'form-product' });
};
</script>
