import type { RouteRecordRaw } from 'vue-router';

import { authRoutes } from '@/modules/auth/routes';
import { pedidosRoutes } from '@/modules/pedidos/routes';
import { productosRoutes } from '@/modules/productos/routes';

import NotFound from '../NotFound.vue';

export const routes: RouteRecordRaw[] = [
  ...pedidosRoutes,
  ...authRoutes,
  ...productosRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];
