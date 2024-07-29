export interface ProductEdit {
  piezas: Pieza[];
  producto: Producto;
}

export interface Pieza {
  descripcion: string;
  horas: number;
  minutos: number;
  peso: number;
}

export interface Producto {
  categoria: string;
  descripcion: string;
  estado: boolean;
  fechacreacion: Date;
  id: number;
  idcategoria: number;
}
