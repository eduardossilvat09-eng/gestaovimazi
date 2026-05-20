import { supabase } from "../lib/supabase";

import type { Pedido } from "../types/Pedido";

const TABLE = "pedidos";

export async function getPedidos() {
  const { data, error } =
    await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.log(error);

    return [];
  }

  return data as Pedido[];
}

export async function savePedidos(
  pedidos: Pedido[]
) {
  const { error } =
    await supabase
      .from(TABLE)
      .upsert(pedidos);

  if (error) {
    console.log(error);
  }
}

export async function criarPedido(
  pedido: Pedido
) {
  const { error } =
    await supabase
      .from(TABLE)
      .insert(pedido);

  if (error) {
    console.log(error);
  }
}

export async function atualizarPedido(
  pedido: Pedido
) {
  const { error } =
    await supabase
      .from(TABLE)
      .update(pedido)
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
      .from(TABLE)
      .delete()
      .eq("id", id);

  if (error) {
    console.log(error);
  }
}