export interface NewItemState {
  estadoAnterior: string;
  estadoNuevo: string;
  cantidad: number;
}

export interface SavePedidoSuccess {
  id: number;
  status: true;
}

export interface SavePedidoError {
  status: false;
}
