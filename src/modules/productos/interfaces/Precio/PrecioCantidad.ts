export interface PrecioCantidad {
  precio: Precio;
}

export interface Precio {
  total: number;
  unidad: number;
  unidades: number;
  descuento: number;
  precioReal: number;
}
