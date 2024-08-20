<template>
  <div class="navbar mb-5 bg-base-100">
    <div class="navbar-start">
      <div class="dropdown" v-if="authStore.isAuth">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <BurgerIcon />
        </div>
        <MobileMenuComponent v-if="authStore.isAuth" />
      </div>
      <LogoNavbar />
    </div>
    <MenuComponent />
    <div class="navbar-end">
      <button v-if="authStore.isAuth" class="btn btn-outline" @click="onHandleLogout">Salir</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoNavbar from '@common/components/LogoNavbar.vue';
import MenuComponent from '@common/components/Menu/MenuComponent.vue';
import MobileMenuComponent from '@common/components/Menu/MobileMenuComponent.vue';
import BurgerIcon from '@common/components/icons/BurgerIcon.vue';

import { useAuthStore } from '@/modules/auth/store/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const onHandleLogout = () => {
  authStore.logout();
  router.replace({ name: 'login' });
};
</script>

<style scoped></style>
