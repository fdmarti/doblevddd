import type { RouteRecordRaw } from 'vue-router';

import { authRoutes } from '@auth/routes';
import { pedidosRoutes } from '@pedidos/routes';
import { productosRoutes } from '@productos/routes';
import { categoriasRoutes } from '@categorias/routes';
import { extrasRoutes } from '@extras/routes';
import { cotizacionRoutes } from '@cotizacion/routes';
import { gastosRoutes } from '@gastos/routes';
import { pagosRoutes } from '@pagos/routes';
import { historialRoutes } from '@historial/routes';

import NotFound from '../NotFound.vue';

export const routes: RouteRecordRaw[] = [
  ...pedidosRoutes,
  ...authRoutes,
  ...productosRoutes,
  ...categoriasRoutes,
  ...extrasRoutes,
  ...cotizacionRoutes,
  ...gastosRoutes,
  ...pagosRoutes,
  ...historialRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];
