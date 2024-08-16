export interface Pedido {
  cliente: string;
  contacto: string;
  estado: Estado;
  fechacreacion: Date;
  id: number;
  preciototal: number;
  productos: Producto[];
  senia: number;
}

export interface Estado {
  actual: Actual;
  anterior: any[];
  siguientes: Actual[];
}

export interface Actual {
  estado: string;
  icono: string;
  id: number;
  saltear?: string;
}

export interface Producto {
  cantidad: number;
  descripcion: string;
  detalle: Detalle;
  idproducto: number;
  itemid: string;
  observaciones: string;
}

export interface Detalle {
  cancelados: number;
  errores: number;
  imprimiendo: number;
  listo: number;
  pendiente: number;
}
