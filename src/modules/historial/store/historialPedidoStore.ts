import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { usePedidosStore } from '@pedidos/store/pedidosStore';

const checkValues = ['PENDIENTE', 'EN PROCESO', 'TERMINADO', 'ENTREGADO', 'CANCELADO'];

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

  return {
    filterOptions,
    filterFormDate,
    pedidosHistorial: computed(() => {
      return pedidosStore.pedidosAll.filter((pedido) => {
        const isInArrayOptions = filterOptions.value.includes(pedido.estado);

        const date = pedido.fechacreacion.split('/');
        const pedidoDate = `${date[2]}-${date[1]}`;
        const isInThisMonth = pedidoDate === filterFormDate.value;

        if (isInArrayOptions && isInThisMonth) return pedido;
      });
    }),
  };
});
