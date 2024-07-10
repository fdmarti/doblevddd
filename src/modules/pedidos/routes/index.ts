import type { RouteRecordRaw } from 'vue-router';

import PedidosLayout from '../layouts/pedidosLayout.vue';
import { IsAuthenticated } from '@auth/guards/is-authenticated.guard';

export const pedidosRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'pedidos',
    component: PedidosLayout,
    beforeEnter: [IsAuthenticated],
    redirect: { name: 'list-pedidos' },
    children: [
      {
        path: 'pedidos',
        name: 'list-pedidos',
        component: () => import('@/modules/pedidos/views/PedidosView.vue'),
      },
      {
        path: 'pedidos/:id',
        name: 'pedido',
        props: true,
        component: () => import('@/modules/pedidos/views/PedidoView.vue'),
      },
      {
        path: 'nuevo-pedido',
        name: 'nuevo-pedido',
        component: () => import('@/modules/pedidos/views/NuevoPedido.vue'),
      },
    ],
  },
];
