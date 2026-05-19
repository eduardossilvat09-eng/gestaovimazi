export type Entrega = {
  id: string;

  pedidoId: string;

  cliente: string;

  cidade: string;

  quantidadePneus: number;

  dataPedido: string;

  dataEmail: string;

  dataFaturamento: string;

  motorista: string;

  veiculo: string;

  dataCarregamento: string;

  dataEntrega: string;

  entregue: boolean;

  concluida: boolean;

  observacao: string;
};