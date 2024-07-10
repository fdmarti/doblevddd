<template>
    <h1 class="text-xl font-bold mb-5">Nuevo producto</h1>
    <div class="flex flex-col items-end h-full">
        <div class="w-full flex min-h-[600px] mb-5">
            <section class="basis-1/3">
                <div class="mt-5">
                    <label class="input input-bordered flex items-center gap-2 mb-2">
                        <input type="text" placeholder="Nombre del producto" class="grow" id="productName"
                            name="productName" autocomplete="name" v-model="productName">
                        <BoxIcon />
                    </label>
                    <select class="select select-bordered w-full max-w-xs" name="categoria" id="categoria"
                        v-model="categoria">
                        <option disabled selected value="0">Seleccionar una categoria</option>
                        <option v-for="categoria in categoriaStore.categoriasList" :key="categoria.id" class="text-base"
                            :value="categoria.id">
                            {{ categoria.descripcion }}
                        </option>
                    </select>
                </div>
            </section>
            <div class="divider divider-horizontal"></div>
            <section class="w-full">
                <h2>Listado de Piezas</h2>
                <div class="divider"></div>
                <div class="flex gap-2 flex-wrap">
                    <CardPieza v-for="(pieza, index) in piezas" :key="pieza.descripcion" :pieza="pieza"
                        @delete-pieza="handleDeletePieza(index)" />
                    <CardPieza @click="togglePopup" />
                </div>
            </section>
        </div>
        <button class="btn btn-primary" @click="handleSubmitFormProducto">Guardar</button>
    </div>
    <FormPiezaModal :open="showModalPieza" @close="togglePopup" @save-pieza="handleNewPieza" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Pieza } from '@productos/interfaces/Pieza';
import { BoxIcon } from '@common/components/icons'
import { CardPieza, FormPiezaModal } from '@productos/components/piezas'

import { useCategoriaStore } from '@categorias/store/categoriaStore';
const categoriaStore = useCategoriaStore()

import { useToast } from 'vue-toastification';
const toast = useToast()

import { useProductosStore } from '@productos/store/productosStore';
const productosStore = useProductosStore()

import { useRouter } from 'vue-router';
const router = useRouter()

const showModalPieza = ref(false)

const productName = ref('')
const piezas = ref<Pieza[]>([])
const categoria = ref<number>(0)
const extras = ref<string[]>([])

const togglePopup = () => {
    showModalPieza.value = !showModalPieza.value
}

const handleNewPieza = (newPieza: Pieza) => {
    piezas.value.push({ ...newPieza })
    togglePopup()
}

const handleDeletePieza = (piezaId: number) => {
    piezas.value = piezas.value.filter((_, i) => piezaId != i)
}

const handleSubmitFormProducto = async () => {
    if (!productName.value.trim()) {
        toast.error('Debe ingresar el nombre de producto')
        return
    }

    if (piezas.value.length === 0) {
        toast.error('Debe ingresar al menos 1 pieza')
        return
    }

    if (!categoria.value) {
        toast.error('Debe ingresar una categoria')
        return
    }

    const result = await productosStore.saveProducto(
        {
            productName: productName.value,
            piezas: piezas.value,
            categoria: categoria.value,
            extras: extras.value
        }
    )

    if (!result.status) {
        toast.error('Error al guardar el producto')
        return
    }

    toast.success('Producto creado')
    router.replace({ name: 'product', params: { id: result.idproducto } })

}

onMounted(() => {
    categoriaStore.getCategorias()
})
</script>