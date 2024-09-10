<template>
  <TestMarkup v-if="checkEnvironment" />
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
import { LogoNavbar, TestMarkup } from '@common/components';
import { MenuComponent, MobileMenuComponent } from '@common/components/Menu';
import { BurgerIcon } from '@common/components/icons';

import { useAuthStore } from '@/modules/auth/store/auth.store';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const onHandleLogout = () => {
  authStore.logout();
  router.replace({ name: 'login' });
};

const checkEnvironment = computed(() => {
  return import.meta.env.VITE_ENV === 'prod' ? false : true;
});
</script>

<style scoped></style>
