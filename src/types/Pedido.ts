export type Pedido = {
  id: string;
  cliente: string;
  cidade: string;
  dataPedido: string;
  dataEmail: string;
  quantidadePneus: number;

  faturado: boolean;
  prioridade: boolean;

  observacao: string;

  dataFaturamento: string;
};