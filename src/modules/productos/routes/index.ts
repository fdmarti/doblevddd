import type { RouteRecordRaw } from 'vue-router';
import { IsAuthenticated } from '@auth/guards/is-authenticated.guard';
import ProductoLayout from '@productos/layouts/productoLayout.vue';

export const productosRoutes: RouteRecordRaw[] = [
  {
    path: '/productos',
    name: 'productos',
    beforeEnter: [IsAuthenticated],
    component: ProductoLayout,
    children: [
      {
        path: '',
        name: 'list-products',
        component: () => import('@productos/views/ProductosView.vue'),
      },
      {
        path: 'producto',
        name: 'form-product',
        component: () => import('@productos/views/FormProducto.vue'),
      },
      {
        path: 'producto/:id',
        name: 'product',
        component: () => import('@productos/views/ProductoView.vue'),
      },
    ],
  },
];
