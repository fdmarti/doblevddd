<template>
  <TopNavbar />
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { TopNavbar } from '@common/components/Navbar';
</script>
