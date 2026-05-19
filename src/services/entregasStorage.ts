import type { Entrega } from "../types/Entrega";

const STORAGE_KEY = "vimazi_entregas";

export function getEntregas(): Entrega[] {
  const data =
    localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function saveEntregas(
  entregas: Entrega[]
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(entregas)
  );
}