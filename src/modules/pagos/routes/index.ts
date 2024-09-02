import type { RouteRecordRaw } from 'vue-router';
import { IsAuthenticated } from '@auth/guards/is-authenticated.guard';
import PagosLayout from '@pagos/layouts/PagosLayout.vue';

export const pagosRoutes: RouteRecordRaw[] = [
  {
    path: '/pagos',
    name: 'pagos',
    beforeEnter: [IsAuthenticated],
    component: PagosLayout,
    children: [
      {
        path: '',
        name: 'list-pagos',
        component: () => import('@pagos/views/PagosList.vue'),
      },
    ],
  },
];
