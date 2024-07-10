<template>
    <section>
        <button class="btn btn-error" @click="toggleCancelPedido">Cancelar pedido</button>
    </section>

    <CancelPedidoModal :open="cancelPedido" @close="cancelPedido = false" />

</template>

<script setup lang="ts">
import { ref } from 'vue';

import CancelPedidoModal from '@pedidos/components/Popups/CancelPedidoModal.vue'

const cancelPedido = ref(false)

const toggleCancelPedido = () => {
    cancelPedido.value = true
}

</script>