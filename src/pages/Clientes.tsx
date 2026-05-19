import { useEffect, useState } from "react";

import {
  Users,
  Trash2,
} from "lucide-react";

import { getPedidos } from "../services/pedidosStorage";

export default function Clientes() {
  const [clientes, setClientes] =
    useState<
      {
        cliente: string;
        cidade: string;
      }[]
    >([]);

  useEffect(() => {
    carregarClientes();
  }, []);

  function carregarClientes() {
    const pedidos = getPedidos();

    const lista = pedidos.map(
      (pedido) => ({
        cliente: pedido.cliente,
        cidade: pedido.cidade,
      })
    );

    const semDuplicados =
      lista.filter(
        (
          item,
          index,
          self
        ) =>
          index ===
          self.findIndex(
            (c) =>
              c.cliente ===
              item.cliente
          )
      );

    setClientes(semDuplicados);
  }

  function excluirCliente(
    nomeCliente: string
  ) {
    const confirmar = confirm(
      "Deseja realmente excluir este cliente?"
    );

    if (!confirmar) return;

    const pedidos = getPedidos();

    /*
      REMOVE todos os pedidos
      desse cliente
    */
    const novosPedidos =
      pedidos.filter(
        (pedido) =>
          pedido.cliente !==
          nomeCliente
      );

    localStorage.setItem(
      "vimazi_pedidos",
      JSON.stringify(
        novosPedidos
      )
    );

    carregarClientes();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Users className="text-[#C7A6FF]" />

          Clientes
        </h1>

        <p className="text-zinc-400 mt-1">
          Cadastro automático de clientes
        </p>
      </div>

      {/* Lista */}
      <div className="grid grid-cols-3 gap-5">
        {clientes.map(
          (cliente, index) => (
            <div
              key={index}
              className="
                bg-zinc-900
                border
                border-zinc-800
                rounded-2xl
                p-6
                flex
                items-start
                justify-between
              "
            >
              <div>
                <h2 className="text-2xl font-bold">
                  {
                    cliente.cliente
                  }
                </h2>

                <p className="text-zinc-400 mt-2">
                  {
                    cliente.cidade
                  }
                </p>
              </div>

              <button
                onClick={() =>
                  excluirCliente(
                    cliente.cliente
                  )
                }
                className="
                  bg-red-500/20
                  hover:bg-red-500/40
                  text-red-400
                  p-3
                  rounded-xl
                  transition
                "
              >
                <Trash2 size={18} />
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}