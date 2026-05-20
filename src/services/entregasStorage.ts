import { supabase } from "../lib/supabase";

import type { Entrega } from "../types/Entrega";

export async function getEntregas(): Promise<
  Entrega[]
> {
  const { data, error } =
    await supabase
      .from("entregas")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.log(error);

    return [];
  }

  return (
    data.map((item: any) => ({
      id: item.id,

      pedidoId: item.pedido_id,

      cliente: item.cliente,

      cidade: item.cidade,

      quantidadePneus:
        item.quantidade_pneus,

      dataPedido:
        item.data_pedido,

      dataEmail:
        item.data_email,

      dataFaturamento:
        item.data_faturamento,

      motorista:
        item.motorista,

      veiculo: item.veiculo,

      dataCarregamento:
        item.data_carregamento,

      dataEntrega:
        item.data_entrega,

      entregue:
        item.entregue,

      concluida:
        item.concluida,

      observacao:
        item.observacao,
    })) || []
  );
}

export async function criarEntrega(
  entrega: Entrega
) {
  const { error } =
    await supabase
      .from("entregas")
      .insert([
        {
          id: entrega.id,

          pedido_id:
            entrega.pedidoId,

          cliente:
            entrega.cliente,

          cidade: entrega.cidade,

          quantidade_pneus:
            entrega.quantidadePneus,

          data_pedido:
            entrega.dataPedido,

          data_email:
            entrega.dataEmail,

          data_faturamento:
            entrega.dataFaturamento,

          motorista:
            entrega.motorista,

          veiculo:
            entrega.veiculo,

          data_carregamento:
            entrega.dataCarregamento,

          data_entrega:
            entrega.dataEntrega,

          entregue:
            entrega.entregue,

          concluida:
            entrega.concluida,

          observacao:
            entrega.observacao,
        },
      ]);

  if (error) {
    console.log(error);
  }
}

export async function atualizarEntrega(
  entrega: Entrega
) {
  const { error } =
    await supabase
      .from("entregas")
      .update({
        data_entrega:
          entrega.dataEntrega,

        entregue:
          entrega.entregue,

        concluida:
          entrega.concluida,

        observacao:
          entrega.observacao,
      })
      .eq("id", entrega.id);

  if (error) {
    console.log(error);
  }
}

export async function excluirEntrega(
  id: string
) {
  const { error } =
    await supabase
      .from("entregas")
      .delete()
      .eq("id", id);

  if (error) {
    console.log(error);
  }
}