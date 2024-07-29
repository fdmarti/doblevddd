import type { RouteRecordRaw } from 'vue-router';

import { authRoutes } from '@auth/routes';
import { pedidosRoutes } from '@pedidos/routes';
import { productosRoutes } from '@productos/routes';
import { categoriasRoutes } from '@categorias/routes';

import NotFound from '../NotFound.vue';

export const routes: RouteRecordRaw[] = [
  ...pedidosRoutes,
  ...authRoutes,
  ...productosRoutes,
  ...categoriasRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];
