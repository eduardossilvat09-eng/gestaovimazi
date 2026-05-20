import { supabase } from "../lib/supabase";

import type { Pedido } from "../types/Pedido";

export async function getPedidos() {
  const { data, error } =
    await supabase
      .from("pedidos")
      .select("*")
      .order("data_pedido", {
        ascending: false,
      });

  if (error) {
    console.log(error);

    return [];
  }

  return (
    data.map((item) => ({
      id: item.id,

      cliente: item.cliente,

      cidade: item.cidade,

      dataPedido:
        item.data_pedido,

      dataEmail:
        item.data_email,

      quantidadePneus:
        item.quantidade_pneus,

      faturado:
        item.faturado,

      dataFaturamento:
        item.data_faturamento,

      entregueFinalizado:
        item.entregue_finalizado,
    })) || []
  );
}

export async function criarPedido(
  pedido: Pedido
) {
  const { error } =
    await supabase
      .from("pedidos")
      .insert({
        id: pedido.id,

        cliente: pedido.cliente,

        cidade: pedido.cidade,

        data_pedido:
          pedido.dataPedido,

        data_email:
          pedido.dataEmail,

        quantidade_pneus:
          pedido.quantidadePneus,

        faturado:
          pedido.faturado,

        data_faturamento:
          pedido.dataFaturamento,

        entregue_finalizado:
          pedido.entregueFinalizado,
      });

  if (error) {
    console.log(error);
  }
}

export async function atualizarPedido(
  pedido: Pedido
) {
  const { error } =
    await supabase
      .from("pedidos")
      .update({
        cliente: pedido.cliente,

        cidade: pedido.cidade,

        data_pedido:
          pedido.dataPedido,

        data_email:
          pedido.dataEmail,

        quantidade_pneus:
          pedido.quantidadePneus,

        faturado:
          pedido.faturado,

        data_faturamento:
          pedido.dataFaturamento,

        entregue_finalizado:
          pedido.entregueFinalizado,
      })
      .eq("id", pedido.id);

  if (error) {
    console.log(error);
  }
}

export async function excluirPedido(
  id: string
) {
  const { error } =
    await supabase
      .from("pedidos")
      .delete()
      .eq("id", id);

  if (error) {
    console.log(error);
  }
}

export async function savePedidos() {
  return;
}