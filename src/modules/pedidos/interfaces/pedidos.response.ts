export interface Pedidos {
  ventas: Venta[];
}

export interface Venta {
  cliente: string;
  contacto: string;
  estado: string;
  fechacreacion: string;
  id: number;
  idestado: number;
  preciototal: number;
  productos: number;
  senia: number;
  completion: number;
}
