<template>
  <dialog id="modal-delete-gasto" class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-blue-300 pb-5">
        <h2 class="text-xl font-bold">Seleccione el mes para realizar la busqueda</h2>
      </div>
      <form class="my-5" @submit.prevent="handleFiltroPagosSubmit">
        <section class="text-lg font-semibold text-center pb-5">
          <label class="input input-bordered flex items-center gap-2">
            <CalendarStatsIcon />
            <input
              type="month"
              class="grow"
              placeholder="yyyy/mm"
              id="date-pagos"
              name="date-pagos"
              v-model="monthFilter"
            />
          </label>
        </section>
        <div class="border-t border-t-blue-300 pt-5 flex items-center justify-between">
          <button @click="emits('close')" class="btn btn-error" type="button">Cancelar</button>
          <button class="btn btn-success" type="submit">Confirmar</button>
        </div>
      </form>
    </div>
  </dialog>
  <BackgroundModal v-if="open" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import BackgroundModal from '@common/components/content/BackgroundModal.vue';
import { CalendarStatsIcon } from '@common/components/icons';
import { usePagosStore } from '@pagos/store/pagosStore';
import { Toast } from '@/utils';

const pagosStore = usePagosStore();

interface Props {
  open: boolean;
}
defineProps<Props>();
const emits = defineEmits(['close']);

const monthFilter = ref();

const handleFiltroPagosSubmit = async () => {
  const result = await pagosStore.getPagos(monthFilter.value);
  if (result) {
    Toast.success('Filtro generado');
    monthFilter.value = null;
    emits('close');
  }
};
</script>
