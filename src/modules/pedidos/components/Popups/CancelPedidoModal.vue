<template>
  <dialog id="modal-cancelar-pedido" class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-blue-500 pb-5">
        <h2 class="text-xl font-bold">Cancelar Pedido</h2>
      </div>
      <div class="my-5">¿Estas seguro que queres borrar el pedido?</div>
      <div class="border-t border-t-blue-500 pt-5 flex items-center justify-between">
        <button @click="$emit('close')" class="btn btn-error">Cancelar</button>
        <button
          @click="handleDeletePedido"
          class="btn btn-success"
          :disabled="pedidoStore.isLoading"
        >
          <span v-if="pedidoStore.isLoading" class="loading loading-spinner"></span>
          <span v-else>Confirmar</span>
        </button>
      </div>
    </div>
  </dialog>
  <BackgroundModal v-if="open" />
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Toast } from '@utils/index';
import BackgroundModal from '@common/components/content/BackgroundModal.vue';
import { usePedidosStore } from '@pedidos/store/pedidosStore';

const pedidoStore = usePedidosStore();
const router = useRouter();

interface Props {
  open: boolean;
}

defineProps<Props>();
const emits = defineEmits<{
  close: [void];
}>();

const handleDeletePedido = async () => {
  const result = await pedidoStore.deletePedido();
  if (result) {
    emits('close');
    router.replace({ name: 'pedidos' });
    Toast.success('Venta cancelada');
  }
};
</script>
