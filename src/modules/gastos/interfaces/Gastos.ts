export interface Gastos {
  gastos: Gasto[];
}

export interface GastoForm {
  descripcion: string;
  monto: number;
  tipo: string;
}

export interface Gasto extends GastoForm {
  fechagasto: Date;
  id: number;
}
