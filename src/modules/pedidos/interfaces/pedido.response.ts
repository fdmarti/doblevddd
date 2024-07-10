export interface Pedido {
  cliente: string;
  contacto: string;
  estado: Estado;
  fechacreacion: Date;
  id: number;
  preciototal: number;
  productos: Producto[];
  resumen: any[];
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
  adddata: string;
  costototal: number;
  descripcion: string;
  descuento: number;
  estado: Estado;
  ganancia: number;
  id: number;
  observaciones: string;
  piezas: Pieza[];
  preciounidad: number;
}

export interface Pieza {
  descripcion: string;
  horas: number;
  id: number;
  idproducto: number;
  minutos: number;
  peso: number;
}
