export const navBarRoutes = [
  {
    name: 'Formularios',
    routes: [
      {
        text: 'Categorias',
        routeName: 'list-categories',
      },
      {
        text: 'Extras',
        routeName: 'list-extras',
      },
      {
        text: 'Productos',
        routeName: 'list-products',
      },
    ],
  },
  {
    name: 'Finanzas',
    routes: [
      {
        text: 'Gastos',
        routeName: 'list-gastos',
      },
      {
        text: 'Pagos',
        routeName: 'list-pagos',
      },
    ],
  },
  {
    name: 'Historial',
    routes: [
      {
        text: 'Pedidos',
        routeName: 'list-pedidos-historial',
      },
    ],
  },
  {
    name: 'Configuración',
    routes: [
      {
        text: 'Cotización',
        routeName: 'cotizacion-view',
      },
    ],
  },
];
