import type { RouteRecordRaw } from 'vue-router';
import { IsAuthenticated } from '@auth/guards/is-authenticated.guard';
import GastoLayout from '@gastos/layouts/GastoLayout.vue';

export const gastosRoutes: RouteRecordRaw[] = [
  {
    path: '/gastos',
    name: 'gastos',
    beforeEnter: [IsAuthenticated],
    component: GastoLayout,
    children: [
      {
        path: '',
        name: 'list-gastos',
        component: () => import('@gastos/views/GastosList.vue'),
      },
    ],
  },
];
