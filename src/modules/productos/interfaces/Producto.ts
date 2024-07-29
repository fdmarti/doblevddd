import type { Pieza } from './Pieza';

export interface Producto {
  productId?: number;
  productName: string;
  piezas: Pieza[];
  categoria: number;
  extras: string[];
}
