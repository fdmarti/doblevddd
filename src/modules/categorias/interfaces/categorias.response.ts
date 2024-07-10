export interface Categorias {
  categorias: Categoria[];
}

export interface Categoria {
  catalogo: boolean;
  categoria: string;
  descripcion: string;
  id: number;
  margen: number;
  productos: number;
}
