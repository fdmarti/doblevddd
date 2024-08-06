import type { RouteRecordRaw } from 'vue-router';
import CotizacionLayout from '@cotizacion/layout/CotizacionLayout.vue';
import { IsAuthenticated } from '@auth/guards/is-authenticated.guard';

export const cotizacionRoutes: RouteRecordRaw[] = [
  {
    path: '/cotizaciones',
    name: 'cotizaciones',
    beforeEnter: [IsAuthenticated],
    component: CotizacionLayout,
    children: [
      {
        path: '',
        name: 'cotizacion-view',
        component: () => import('@cotizacion/views/CotizacionView.vue'),
      },
    ],
  },
];
