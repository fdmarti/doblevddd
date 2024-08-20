import type { Pedido } from '@pedidos/interfaces';

export const pedidoInit: Pedido = {
  cliente: '',
  contacto: '',
  estado: '',
  fechacreacion: new Date(),
  id: 0,
  preciototal: 0,
  productos: [],
  senia: 0,
};
