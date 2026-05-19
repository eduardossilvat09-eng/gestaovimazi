import { useEffect, useState } from "react";

import {
  CheckCircle2,
  Trash2,
} from "lucide-react";

import type { Entrega } from "../types/Entrega";

import {
  getEntregas,
  saveEntregas,
} from "../services/entregasStorage";

export default function Concluidos() {
  const [concluidos, setConcluidos] =
    useState<Entrega[]>([]);

  useEffect(() => {
    carregarConcluidos();
  }, []);

  function carregarConcluidos() {
    const entregas = getEntregas();

    const lista = entregas.filter(
      (entrega) => entrega.concluida
    );

    setConcluidos(lista);
  }

  function excluirConclusao(id: string) {
    const entregas = getEntregas();

    const novaLista = entregas.filter(
      (entrega) => entrega.id !== id
    );

    saveEntregas(novaLista);

    carregarConcluidos();
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
          Histórico de entregas finalizadas
        </p>
      </div>

      {/* Lista */}
      <div className="space-y-5">
        {concluidos.map((entrega) => (
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
            {/* Topo */}
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
                    bg-green-500/20
                    text-green-400
                    px-4
                    py-2
                    rounded-full
                    flex
                    items-center
                    gap-2
                  "
                >
                  <CheckCircle2 size={18} />

                  Finalizado
                </div>

                <button
                  onClick={() =>
                    excluirConclusao(
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

            {/* Informações */}
            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-6
                gap-5
                mt-6
              "
            >
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
                  {entrega.dataEntrega ||
                    "-"}
                </p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">
                  Data Pedido
                </p>

                <p>
                  {entrega.dataPedido ||
                    "-"}
                </p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">
                  Data Email
                </p>

                <p>
                  {entrega.dataEmail ||
                    "-"}
                </p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">
                  Quantidade
                </p>

                <p>
                  {entrega.quantidadePneus}
                </p>
              </div>
            </div>

            {/* Observação */}
            <div className="mt-5">
              <p className="text-zinc-500 text-sm">
                Observação
              </p>

              <p className="mt-2">
                {entrega.observacao || "-"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}