import type { Pieza } from './Pieza';

export interface Producto {
  productName: string;
  piezas: Pieza[];
  categoria: number;
  extras: string[];
}
