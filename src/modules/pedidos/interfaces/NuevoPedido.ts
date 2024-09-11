export interface NuevoPedido {
  productos: Producto[];
  contacto: string;
  cliente: string;
  hash?: string;
}

export interface Producto {
  cantidad: number;
  categoria: number;
  descripcion: string;
  descuento?: number;
  descuentoAdicional: number;
  descuentoTotal?: number;
  id: number;
  itemId: string;
  observaciones: string;
  precioTotal?: number;
  precioUnitarioFinal?: number;
  preciounitario: number;
  sumarDescuento: boolean;
}

export interface PreVenta {
  preVenta: Hash;
  status: boolean;
}

export interface Hash {
  hash: string;
  productos: Producto[];
}
