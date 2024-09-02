import { ref } from 'vue';

export const useGastosPopups = () => {
  const showModalGasto = ref(false);
  const showModalDeleteGasto = ref(false);
  const showFiltroGastos = ref(false);

  const deletedGasto = ref();

  const onToggleGastoPopup = () => {
    showModalGasto.value = !showModalGasto.value;
  };

  const onToggleDeleteGastoPopup = (gastoId: number = 0) => {
    if (gastoId) {
      deletedGasto.value = gastoId;
    }
    showModalDeleteGasto.value = !showModalDeleteGasto.value;
  };

  const toggleFiltroGastosPopup = () => {
    showFiltroGastos.value = !showFiltroGastos.value;
  };

  return {
    deletedGasto,
    showModalGasto,
    showModalDeleteGasto,
    showFiltroGastos,

    onToggleGastoPopup,
    onToggleDeleteGastoPopup,
    toggleFiltroGastosPopup,
  };
};
