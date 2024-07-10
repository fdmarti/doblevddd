export interface Productos {
  productos: Producto[];
}

export interface Producto {
  categoria: string;
  descripcion: string;
  estado: boolean;
  fechacreacion: Date;
  id: number;
  idcategoria: number;
  imagen: null | string;
  precioUnitarioVencido: boolean;
  preciounitario: number;
  ventas: number;
}
