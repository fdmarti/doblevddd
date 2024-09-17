<template>
  <PopupComponent id="modal-cancelar-pedido" :open="open" title="Cancelar Pedido">
    <template #body>
      <div class="border-t border-t-blue-500 pt-5 flex items-center justify-between">
        <DButton @click="$emit('close')" color="error">Cancelar</DButton>
        <DButton
          @click="handleDeletePedido"
          color="success"
          :disabled="pedidoStore.isLoading"
          :isLoading="pedidoStore.isLoading"
        >
          Confirmar
        </DButton>
      </div>
    </template>
  </PopupComponent>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Toast } from '@utils/index';
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
