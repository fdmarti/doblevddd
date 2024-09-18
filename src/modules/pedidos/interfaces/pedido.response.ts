export interface Pedido {
  cliente: string;
  contacto: string;
  estado: string;
  fechacreacion: Date;
  id: number;
  preciototal: number;
  productos: Producto[];
  senia: number;
}

export interface Producto {
  cantidad: number;
  descripcion: string;
  detalle: Detalle;
  idproducto: number;
  itemid: string;
  observaciones: string;
  preciounidad: number;
  total: number;
}

export interface Detalle {
  cancelados: number;
  errores: number;
  imprimiendo: number;
  listo: number;
  estado: string;
  pendiente: number;
}
