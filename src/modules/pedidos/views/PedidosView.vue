<template>
    <h1 class="mb-5 text-xl font-bold">Listado de Pedidos</h1>
    <div class="divider"></div>
    <div class="overflow-x-auto">
        <table class="table">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Cliente</th>
                    <th>Contacto</th>
                    <th>Fecha creación</th>
                    <th>Cantidad productos</th>
                    <th>Pago</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody v-if="pedidosStore.isLoading">
                <tr>
                    <td colspan="8">
                        <LoadingComponent />
                    </td>
                </tr>
            </tbody>
            <tbody v-else-if="pedidosStore.pedidos.length === 0">
                <tr>
                    <td colspan="8" class="font-bold">
                        No hay pedidos cargados
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr class="hover" v-for="pedido in pedidosStore.pedidos" :key="pedido.id">
                    <th>#{{ pedido.id }}</th>
                    <td>{{ pedido.cliente }}</td>
                    <td>{{ pedido.contacto }}</td>
                    <td>{{ pedido.fechacreacion }}</td>
                    <td>{{ pedido.productos }}</td>
                    <td>
                        <PaymentProgess :completion="pedido.completion" />
                    </td>

                    <td>{{ pedido.estado }}</td>
                    <td>
                        <RouterLink :to="{ name: 'pedido', params: { id: pedido.id } }" class="btn btn-outline">Detalle
                        </RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <FabButton @click="onHandleNewPedido">
        <PlusIcon />
    </FabButton>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { usePedidosStore } from '@pedidos/store/pedidosStore';
import LoadingComponent from '@common/components/LoadingComponent.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import { PlusIcon } from '@common/components/icons'
import PaymentProgess from '@pedidos/components/PaymentProgress.vue'


const pedidosStore = usePedidosStore()
const router = useRouter()

onMounted(async () => {
    const status = await pedidosStore.getPedidos()
    if (!status) router.replace({ name: 'login' })
})

const onHandleNewPedido = () => {
    router.push({ name: 'nuevo-pedido' })
}

</script>