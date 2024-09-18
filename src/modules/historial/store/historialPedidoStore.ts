import { defineStore } from 'pinia';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { usePedidosStore } from '@pedidos/store/pedidosStore';
import { checkValues } from '@historial/utils/pedido-filtro-utils';

export const useHistorialPedidoStore = defineStore('historial', () => {
  const pedidosStore = usePedidosStore();
  const filterOptions = ref<string[]>([...checkValues]);
  const filterFormDate = ref();

  onMounted(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month =
      currentDate.getMonth() < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;

    filterFormDate.value = `${year}-${month}`;
  });

  onUnmounted(() => {
    filterOptions.value = [...checkValues];
  });

  return {
    filterOptions,
    filterFormDate,
    pedidosHistorial: computed(() => {
      return pedidosStore.pedidosAll
        .filter((pedido) => {
          const isInArrayOptions = filterOptions.value.includes(pedido.estado);

          const date = pedido.fechacreacion.split('/');
          const pedidoDate = `${date[2]}-${date[1]}`;
          const isInThisMonth = pedidoDate === filterFormDate.value;

          if (isInArrayOptions && isInThisMonth) return pedido;
        })
        .sort((a, b) => b.id - a.id);
    }),
  };
});
