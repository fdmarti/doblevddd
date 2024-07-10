import type { RouteRecordRaw } from 'vue-router';

import AuthLayout from '../layouts/authLayout.vue';
import { IsNotAuthenticated } from '@auth/guards/is-not-authenticated.guard';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth',
    component: AuthLayout,
    beforeEnter: [IsNotAuthenticated],
    redirect: { name: 'login' },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@auth/views/LoginView.vue'),
      },
    ],
  },
];
