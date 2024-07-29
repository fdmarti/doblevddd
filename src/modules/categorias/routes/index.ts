import type { RouteRecordRaw } from 'vue-router';
import { IsAuthenticated } from '@auth/guards/is-authenticated.guard';
import CategoriaLayout from '@categorias/layouts/CategoriaLayout.vue';

export const categoriasRoutes: RouteRecordRaw[] = [
  {
    path: '/categorias',
    name: 'categories',
    beforeEnter: [IsAuthenticated],
    component: CategoriaLayout,
    children: [
      {
        path: '',
        name: 'list-categories',
        component: () => import('@categorias/views/CategoriasView.vue'),
      },
    ],
  },
];
