export interface NuevoPedido {
  productos: Producto[];
  contacto: string;
  cliente: string;
}

export interface Producto {
  id: number;
  descripcion: string;
  categoria: number;
  preciounitario: number;
  observaciones: string;
  cantidad: number;
}
