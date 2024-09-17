<template>
  <ul
    tabindex="0"
    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
  >
    <li>
      <RouterLink to="/"> Home </RouterLink>
    </li>
    <li v-for="head in navBarRoutes" :key="head.name">
      <details>
        <summary>{{ head.name }}</summary>
        <ul class="p-2 bg-neutral">
          <LinkRouterLink
            v-for="link in head.routes"
            :key="link.text"
            :name-route="link.routeName"
            :text="link.text"
          />
        </ul>
      </details>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import LinkRouterLink from './LinkRouterLink.vue';
import { navBarRoutes } from '@/config/navbarModulesLinks';
</script>
