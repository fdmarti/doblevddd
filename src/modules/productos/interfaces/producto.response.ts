export interface ProductoDetail {
  cotizacionTotal: CotizacionTotal;
  extras: Extra[];
  piezas: Pieza[];
  precio: Precio;
  producto: ProductoClass;
  totalExtras: number;
  ventas: boolean;
}

export interface CotizacionTotal {
  costoAmortizacion: number;
  costoElaboracion: number;
  costoPieza: number;
  electricidad: number;
  plastico: number;
  tazaFallos: number;
  totalHoras: number;
  totalMinutos: number;
  totalPeso: number;
}

export interface Extra {
  descripcion: string;
  id: number;
  precio: number;
}

export interface Pieza {
  cotizacion: Cotizacion;
  descripcion: string;
  horas: number;
  minutos: number;
  peso: number;
}

export interface Cotizacion {
  costoAmortizacion: number;
  costoPieza: number;
  electricidad: number;
  plastico: number;
  tazaFallos: number;
}

export interface Precio {
  costototal: number;
  fechaactualizacion: string;
  ganancia: number;
  preciosugerido: null;
  preciounitario: number;
}

export interface ProductoClass {
  categoria: string;
  descripcion: string;
  estado: boolean;
  fechacreacion: Date;
  id: number;
  idcategoria: number;
}
