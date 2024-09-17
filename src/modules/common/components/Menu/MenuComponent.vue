<template>
  <div class="navbar-center hidden lg:flex z-50">
    <ul class="menu menu-horizontal px-1" v-if="authStore.isAuth">
      <li>
        <RouterLink to="/">
          <HomeIcon />
        </RouterLink>
      </li>
      <li v-for="head in navBarRoutes" :key="head.name">
        <details>
          <summary>{{ head.name }}</summary>
          <ul class="p-2 bg-base-100">
            <LinkRouterLink
              v-for="link in head.routes"
              :key="link.text"
              @click="closeDropDown"
              :name-route="link.routeName"
              :text="link.text"
            />
          </ul>
        </details>
      </li>
    </ul>
    <DarkLightSection />
  </div>
</template>
<script setup lang="ts">
import { HomeIcon } from '@common/components/icons';
import DarkLightSection from './DarkLightSection.vue';
import LinkRouterLink from './LinkRouterLink.vue';
import { navBarRoutes } from '@/config/navbarModulesLinks';

import { useAuthStore } from '@/modules/auth/store/auth.store';
const authStore = useAuthStore();

const closeDropDown = () => {
  const elementDrop = document.querySelectorAll('details') as NodeListOf<HTMLDetailsElement>;
  elementDrop.forEach((el) => (el.open = false));
};
</script>
