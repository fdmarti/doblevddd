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
  id: number;
  itemId: string;
  observaciones: string;
  preciounitario: number;
  descuentoAdicional: number;
  sumarDescuento: boolean;
  precioTotal?: number;
  precioUnitarioFinal?: number;
}

export interface PreVenta {
  preVenta: Hash;
  status: boolean;
}

export interface Hash {
  hash: string;
  productos: Producto[];
}
