import { useEffect, useState } from "react";

import {
  CheckCircle2,
  Truck,
  Trash2,
} from "lucide-react";

import type { Entrega } from "../types/Entrega";

import {
  getEntregas,
  excluirEntrega,
} from "../services/entregasStorage";

export default function Concluidos() {
  const [entregas, setEntregas] =
    useState<Entrega[]>([]);

  useEffect(() => {
    carregarEntregas();

    window.addEventListener(
      "focus",
      carregarEntregas
    );

    return () => {
      window.removeEventListener(
        "focus",
        carregarEntregas
      );
    };
  }, []);

  async function carregarEntregas() {
    const entregasStorage =
      await getEntregas();

    const concluidas =
      entregasStorage.filter(
        (entrega) =>
          entrega.concluida === true
      );

    setEntregas(concluidas);
  }

  async function handleExcluir(
    id: string
  ) {
    await excluirEntrega(id);

    await carregarEntregas();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <CheckCircle2 className="text-green-400" />

          Concluídos
        </h1>

        <p className="text-zinc-400 mt-1">
          Entregas finalizadas
        </p>
      </div>

      {/* Lista */}
      <div className="space-y-5">
        {entregas.length === 0 && (
          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-10
              text-center
            "
          >
            <Truck
              className="
                mx-auto
                mb-4
                text-zinc-600
              "
              size={40}
            />

            <p className="text-zinc-400">
              Nenhuma entrega concluída
            </p>
          </div>
        )}

        {entregas.map((entrega) => (
          <div
            key={entrega.id}
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-6
            "
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">
                  {entrega.cliente}
                </h2>

                <p className="text-zinc-400 mt-1">
                  {entrega.cidade}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    bg-green-500/20
                    text-green-400
                    px-4
                    py-2
                    rounded-full
                  "
                >
                  <CheckCircle2
                    size={18}
                  />

                  Concluído
                </div>

                <button
                  onClick={() =>
                    handleExcluir(
                      entrega.id
                    )
                  }
                  className="
                    bg-red-500/20
                    hover:bg-red-500/40
                    transition
                    p-3
                    rounded-xl
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-5 mt-6">
              <div>
                <p className="text-zinc-500 text-sm">
                  Motorista
                </p>

                <p>{entrega.motorista}</p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">
                  Veículo
                </p>

                <p>{entrega.veiculo}</p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">
                  Data Entrega
                </p>

                <p>
                  {entrega.dataEntrega}
                </p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">
                  Quantidade
                </p>

                <p>
                  {
                    entrega.quantidadePneus
                  }
                </p>
              </div>
            </div>

            {entrega.observacao && (
              <div className="mt-5">
                <p className="text-zinc-500 text-sm mb-2">
                  Observação
                </p>

                <div
                  className="
                    bg-black
                    border
                    border-zinc-800
                    rounded-xl
                    p-4
                  "
                >
                  {entrega.observacao}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}