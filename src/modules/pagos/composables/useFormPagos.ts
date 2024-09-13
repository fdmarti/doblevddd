import { onMounted, reactive } from 'vue';
import { pagosInitialState } from '@pagos/utils/pagosInitialState';
import { usePagosStore } from '@pagos/store/pagosStore';

import { Toast } from '@utils/index';

export const useFormPagos = (pedidoId: string) => {
  const pagosStore = usePagosStore();

  const formDatePago = reactive({ ...pagosInitialState });

  const onHandleSubmitFormPago = async () => {
    if (!formDatePago.idMedioPago) {
      Toast.error('Debe seleccionar un medio de pago');
      return;
    }

    if (!formDatePago.monto || formDatePago.monto <= 0) {
      Toast.error('Debe ingresar un monto');
      return;
    }

    const result = await pagosStore.savePago({ ...formDatePago, pedidoId });

    if (!result) {
      Toast.error('Ocurrio un error al querer guardar un nuevo pago');
      return;
    }

    Toast.success('Pago guardado');

    resetFormPagos();
  };

  const resetFormPagos = () => {
    Object.assign(formDatePago, pagosInitialState);
  };

  const onHandlePagarTotal = async () => {
    formDatePago.monto = pagosStore.precioRestanteAPagar;
    await onHandleSubmitFormPago();
  };

  onMounted(async () => {
    await pagosStore.getMediosPagos();
  });

  return {
    formDatePago,

    onHandleSubmitFormPago,
    onHandlePagarTotal,
  };
};
