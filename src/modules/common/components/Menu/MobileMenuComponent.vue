<template>
    <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52">
        <li>
            <RouterLink to="/">
                Home
            </RouterLink>
        </li>
        <li>
            <details>
                <summary>Formularios</summary>
                <ul class="p-2 bg-neutral">
                    <li>
                        <RouterLink :to="{ name: 'list-categories' }">Categorias</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'list-extras' }">Extras</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'list-products' }">Productos</RouterLink>
                    </li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary>Finanzas</summary>
                <ul class="p-2 bg-neutral">
                    <li><a>Balance</a></li>
                    <li><a>Gastos</a></li>
                    <li><a>Pagos</a></li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary>Configuración</summary>
                <ul class="p-2 bg-neutral">
                    <li><a>Cotización</a></li>
                </ul>
            </details>
        </li>
    </ul>
</template>
<script lang="ts" setup>

</script>