<template>
    <div class="navbar-center hidden lg:flex z-50">
        <ul class="menu menu-horizontal px-1" v-if="authStore.isAuth">
            <li>
                <RouterLink to="/">
                    <HomeIcon />
                </RouterLink>
            </li>
            <li>
                <details>
                    <summary>Formularios</summary>
                    <ul class="p-2 bg-base-100">
                        <li>
                            <RouterLink :to="{ name: 'list-categories' }">Categorias</RouterLink>
                        </li>
                        <li><a>Extras</a></li>
                        <li>
                            <RouterLink :to="{ name: 'list-products' }">Productos</RouterLink>
                        </li>
                    </ul>
                </details>
            </li>
            <li>
                <details>
                    <summary>Finanzas</summary>
                    <ul class="p-2 bg-base-100">
                        <li><a>Balance</a></li>
                        <li><a>Gastos</a></li>
                        <li><a>Pagos</a></li>
                    </ul>
                </details>
            </li>
            <li>
                <details>
                    <summary>Configuración</summary>
                    <ul class="p-2 bg-base-100">
                        <li><a>Cotización</a></li>
                    </ul>
                </details>
            </li>
        </ul>
        <DarkLightSection />
    </div>
</template>
<script setup lang="ts">
import { HomeIcon } from '../icons';

import DarkLightSection from './DarkLightSection.vue';

import { useAuthStore } from '@/modules/auth/store/auth.store';
const authStore = useAuthStore()


</script>