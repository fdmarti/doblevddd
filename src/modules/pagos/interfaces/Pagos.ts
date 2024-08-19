export interface Pagos {
  descripcion: string;
  fechapago: Date;
  id: number;
  idmediopago: number;
  idventa: number;
  monto: number;
}

export interface FormPagos {
  monto: number;
  idMedioPago: number;
  pedidoId: string;
}
