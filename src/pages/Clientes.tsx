import { useEffect, useState } from "react";

import {
  Users,
  Trash2,
  Pencil,
  Check,
  X,
} from "lucide-react";

import type { Pedido } from "../types/Pedido";

import {
  getPedidos,
  savePedidos,
} from "../services/pedidosStorage";

type Cliente = {
  cliente: string;
  cidade: string;
};

export default function Clientes() {
  const [clientes, setClientes] =
    useState<Cliente[]>([]);

  const [
    editandoCliente,
    setEditandoCliente,
  ] = useState<string | null>(null);

  const [novoNome, setNovoNome] =
    useState("");

  const [novaCidade, setNovaCidade] =
    useState("");

  useEffect(() => {
    carregarClientes();
  }, []);

  async function carregarClientes() {
    const pedidos: Pedido[] =
      await getPedidos();

    const clientesExcluidos =
      JSON.parse(
        localStorage.getItem(
          "vimazi_clientes_excluidos"
        ) || "[]"
      );

    const lista = pedidos
      .filter(
        (pedido) =>
          !clientesExcluidos.includes(
            pedido.cliente
              .trim()
              .toLowerCase()
          )
      )
      .map((pedido: Pedido) => ({
        cliente: pedido.cliente,
        cidade: pedido.cidade,
      }));

    const semDuplicados =
      lista.filter(
        (
          item: Cliente,
          index: number,
          self: Cliente[]
        ) =>
          index ===
          self.findIndex(
            (c: Cliente) =>
              c.cliente
                .trim()
                .toLowerCase() ===
              item.cliente
                .trim()
                .toLowerCase()
          )
      );

    setClientes(semDuplicados);
  }

  function iniciarEdicao(
    cliente: Cliente
  ) {
    setEditandoCliente(
      cliente.cliente
    );

    setNovoNome(cliente.cliente);

    setNovaCidade(cliente.cidade);
  }

  function cancelarEdicao() {
    setEditandoCliente(null);

    setNovoNome("");

    setNovaCidade("");
  }

  async function salvarEdicao(
    nomeAntigo: string
  ) {
    if (!novoNome || !novaCidade) {
      alert("Preencha os campos");

      return;
    }

    const clienteExistente =
      clientes.find(
        (c) =>
          c.cliente
            .trim()
            .toLowerCase() ===
            novoNome
              .trim()
              .toLowerCase() &&
          c.cliente !== nomeAntigo
      );

    if (clienteExistente) {
      alert(
        "Já existe um cliente com esse nome"
      );

      return;
    }

    const pedidos: Pedido[] =
      await getPedidos();

    const pedidosAtualizados =
      pedidos.map((pedido) => {
        if (
          pedido.cliente
            .trim()
            .toLowerCase() ===
          nomeAntigo
            .trim()
            .toLowerCase()
        ) {
          return {
            ...pedido,
            cliente: novoNome,
            cidade: novaCidade,
          };
        }

        return pedido;
      });

    await savePedidos(
      pedidosAtualizados
    );

    cancelarEdicao();

    await carregarClientes();
  }

  async function excluirCliente(
    nomeCliente: string
  ) {
    const confirmar = confirm(
      "Deseja realmente excluir este cliente?"
    );

    if (!confirmar) return;

    try {
      const nomeFormatado =
        nomeCliente
          .trim()
          .toLowerCase();

      /* SALVA CLIENTE COMO EXCLUÍDO */
      const clientesExcluidos =
        JSON.parse(
          localStorage.getItem(
            "vimazi_clientes_excluidos"
          ) || "[]"
        );

      if (
        !clientesExcluidos.includes(
          nomeFormatado
        )
      ) {
        clientesExcluidos.push(
          nomeFormatado
        );

        localStorage.setItem(
          "vimazi_clientes_excluidos",
          JSON.stringify(
            clientesExcluidos
          )
        );
      }

      /* REMOVE DA TELA */
      setClientes((prev) =>
        prev.filter(
          (cliente) =>
            cliente.cliente
              .trim()
              .toLowerCase() !==
            nomeFormatado
        )
      );
    } catch (error) {
      console.log(error);

      alert(
        "Erro ao excluir cliente"
      );
    }
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
          (
            cliente: Cliente,
            index: number
          ) => (
            <div
              key={index}
              className="
                bg-zinc-900
                border
                border-zinc-800
                rounded-2xl
                p-6
              "
            >
              {editandoCliente ===
              cliente.cliente ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={novoNome}
                    onChange={(e) =>
                      setNovoNome(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      bg-black
                      border
                      border-zinc-700
                      rounded-xl
                      px-4
                      py-3
                      text-white
                      outline-none
                      focus:border-[#C7A6FF]
                    "
                  />

                  <input
                    type="text"
                    value={novaCidade}
                    onChange={(e) =>
                      setNovaCidade(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      bg-black
                      border
                      border-zinc-700
                      rounded-xl
                      px-4
                      py-3
                      text-white
                      outline-none
                      focus:border-[#C7A6FF]
                    "
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        salvarEdicao(
                          cliente.cliente
                        )
                      }
                      className="
                        flex-1
                        bg-green-500/20
                        hover:bg-green-500/40
                        text-green-400
                        py-3
                        rounded-xl
                        transition
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Check size={18} />
                    </button>

                    <button
                      onClick={
                        cancelarEdicao
                      }
                      className="
                        flex-1
                        bg-zinc-700
                        hover:bg-zinc-600
                        text-white
                        py-3
                        rounded-xl
                        transition
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
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

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        iniciarEdicao(
                          cliente
                        )
                      }
                      className="
                        bg-blue-500/20
                        hover:bg-blue-500/40
                        text-blue-400
                        p-3
                        rounded-xl
                        transition
                      "
                    >
                      <Pencil
                        size={18}
                      />
                    </button>

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
                      <Trash2
                        size={18}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}