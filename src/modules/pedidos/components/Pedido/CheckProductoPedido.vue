<template>
  <div class="form-control">
    <label class="label cursor-pointer gap-2">
      <section class="flex items-center gap-2 w-[150px]">
        <input
          type="number"
          step="1"
          placeholder="Cantidad"
          class="input w-full h-[20px] text-right"
          :id="`${producto.id}-producto`"
          v-model.number="amountProducts"
          @change="onValidatePositiveNumber"
        />

        <button class="btn btn-xs" @click="onHandleAddProductToPedido">
          <CartPlusIcon :size="20" />
        </button>
      </section>
    </label>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { Producto } from '@productos/interfaces/productos.response';
import { usePedidosStore } from '@pedidos/store/pedidosStore';
import { CartPlusIcon } from '@common/components/icons';
import { Uuid, Toast } from '@/utils';

const pedidosStore = usePedidosStore();

interface Props {
  producto: Producto;
}

const props = defineProps<Props>();

const amountProducts = ref(1);

const onHandleAddProductToPedido = () => {
  pedidosStore.newPedido.productos.push({
    cantidad: amountProducts.value,
    categoria: props.producto.idcategoria,
    descripcion: props.producto.descripcion,
    id: props.producto.id,
    itemId: Uuid.generate(),
    observaciones: '',
    preciounitario: props.producto.preciounitario,
  });

  amountProducts.value = 1;

  Toast.success('Producto agregado al pedido');
};

const onValidatePositiveNumber = () => {
  if (amountProducts.value < 1) amountProducts.value = 1;
};
</script>
