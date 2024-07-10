<template>
    <div>
        <ul class="steps w-full steps-pedido">
            <li :class="['step', currentStep >= 0 && 'step-primary']">Elegir productos</li>
            <li :class="['step', currentStep >= 1 && 'step-primary']">Datos del cliente</li>
            <li :class="['step', currentStep >= 2 && 'step-primary']">Confirmar pedido</li>
        </ul>

        <div v-if="currentStep === 0" class="w-full text-center p-10">
            <ProductosList />
        </div>
        <div v-if="currentStep === 1" class="w-full text-center p-10">
            <h1>Datos del cliente</h1>
        </div>
        <div v-if="currentStep === 2" class="w-full text-center p-10">
            <h1>Confirmar pedido</h1>
        </div>

        <section class="flex justify-between">
            <button class="btn btn-outline" :disabled="currentStep === 0" @click="prevStep">Volver</button>

            <button class="btn btn-outline" @click="nextStep" v-if="currentStep !== maxSteps">Siguiente</button>
            <button class="btn btn-primary" @click="confirmarPedido" v-else>Confirmar Pedido</button>

        </section>
    </div>
</template>

<script setup lang="ts">
import { useSteps } from '@pedidos/composables/useSteps';
import ProductosList from '@productos/components/ProductosList.vue'

const { currentStep, maxSteps, nextStep, prevStep } = useSteps(2)

const confirmarPedido = () => {
    console.log("Confirmar Pedido")
}

</script>