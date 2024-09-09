<template>
  <PopupComponent
    id="modal-form-filtro-pagos"
    :open="open"
    title="Seleccione el mes para realizar la busqueda"
  >
    <template #body>
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
          <ButtonError @click="emits('close')">Cancelar</ButtonError>
          <DButton type="submit">Confirmar</DButton>
        </div>
      </form>
    </template>
  </PopupComponent>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { PopupComponent } from '@common/components/Popup';
import { ButtonError, DButton } from '@common/components/Buttons';
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
