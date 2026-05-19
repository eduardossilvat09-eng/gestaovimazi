import type { Pedido } from "../types/Pedido";

const STORAGE_KEY = "vimazi_pedidos";

export function getPedidos(): Pedido[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function savePedidos(pedidos: Pedido[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(pedidos)
  );
}