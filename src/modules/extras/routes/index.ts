import type { RouteRecordRaw } from 'vue-router';
import { IsAuthenticated } from '@auth/guards/is-authenticated.guard';
import ExtrasLayout from '@extras/layouts/ExtrasLayout.vue';

export const extrasRoutes: RouteRecordRaw[] = [
  {
    path: '/extras',
    name: 'extras',
    beforeEnter: [IsAuthenticated],
    component: ExtrasLayout,
    children: [
      {
        path: '',
        name: 'list-extras',
        component: () => import('@extras/views/ExtrasView.vue'),
      },
    ],
  },
];
