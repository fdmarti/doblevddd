import type { RouteRecordRaw } from 'vue-router';
import HistorialLayout from '@historial/layouts/historialLayout.vue';
import { IsAuthenticated } from '@auth/guards/is-authenticated.guard';

export const historialRoutes: RouteRecordRaw[] = [
  {
    path: '/historial',
    name: 'historial',
    beforeEnter: [IsAuthenticated],
    component: HistorialLayout,
    children: [
      {
        path: '',
        name: 'list-pedidos-historial',
        component: () => import('@historial/views/ListPedidosHistorial.vue'),
      },
    ],
  },
];
