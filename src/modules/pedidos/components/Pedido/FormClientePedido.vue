<template>
  <TitleComponent text="Datos del cliente" />
  <section class="flex flex-col gap-2 max-w-xl mx-auto mt-5">
    <label class="input input-bordered flex items-center gap-2">
      <UserIcon />
      <input
        type="text"
        class="grow"
        placeholder="Nombre del cliente"
        v-model="pedidosStore.newPedido.cliente"
        id="name-client"
        name="name-client"
      />
    </label>
    <label class="input input-bordered flex items-center gap-2">
      <AddressIcon />
      <input
        type="text"
        class="grow"
        placeholder="Contacto"
        v-model="pedidosStore.newPedido.contacto"
        id="contact-client"
        name="contact-client"
      />
    </label>
  </section>
</template>
<script lang="ts" setup>
import { TitleComponent } from '@common/components';
import { UserIcon, AddressIcon } from '@common/components/icons';
import { usePedidosStore } from '@pedidos/store/pedidosStore';

const pedidosStore = usePedidosStore();
</script>
