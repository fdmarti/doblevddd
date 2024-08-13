<template>
  <div class="form-control">
    <label class="label cursor-pointer gap-2">
      <section class="flex items-center gap-2 w-[80px]">
        <template v-if="isChecked">
          <button class="btn btn-xs" @click="onHandleDecreaseAmount(updateCantidadPerProduct)">
            -
          </button>
          <span>{{ amountProducts }}</span>
          <button class="btn btn-xs" @click="onHandleIncreaseAmount(updateCantidadPerProduct)">
            +
          </button>
        </template>
      </section>

      <input
        type="checkbox"
        class="checkbox checkbox-primary"
        v-model="isChecked"
        @change="onHandleChangeCheckProducto"
      />
    </label>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { Producto } from '@productos/interfaces/productos.response';
import { useCounterProducts } from '@common/composables';
import { usePedidosStore } from '@pedidos/store/pedidosStore';

const pedidosStore = usePedidosStore();

interface Props {
  producto: Producto;
}

const props = defineProps<Props>();

const { amountProducts, onHandleDecreaseAmount, onHandleIncreaseAmount, resetAmountProducts } =
  useCounterProducts();

const isChecked = ref(false);

const onHandleChangeCheckProducto = (e: Event) => {
  const element = e.target as HTMLInputElement;
  if (element.checked) {
    pedidosStore.newPedido.productos.push({
      cantidad: amountProducts.value,
      categoria: props.producto.idcategoria,
      descripcion: props.producto.descripcion,
      id: props.producto.id,
      observaciones: '',
      preciounitario: props.producto.preciounitario,
    });
  } else {
    pedidosStore.newPedido.productos = pedidosStore.newPedido.productos.filter(
      (prod) => prod.id !== props.producto.id,
    );

    resetAmountProducts();
  }
};

const updateCantidadPerProduct = () => {
  const arrProductsPerPedido = pedidosStore.newPedido.productos;

  for (let i = 0; i < arrProductsPerPedido.length; i++) {
    if (props.producto.id === arrProductsPerPedido[i].id) {
      arrProductsPerPedido[i].cantidad = amountProducts.value;
      break;
    }
  }
};

onMounted(() => {
  const productFound = pedidosStore.newPedido.productos.find(
    (prod) => prod.id === props.producto.id,
  );

  if (productFound) {
    isChecked.value = true;
    amountProducts.value = productFound.cantidad;
  }
});
</script>
