import { useEffect, useState } from "react";

import {
  Trash2,
  Pencil,
} from "lucide-react";

import type { Pedido } from "../types/Pedido";

import {
  getPedidos,
  criarPedido,
  atualizarPedido,
  excluirPedido as excluirPedidoStorage,
} from "../services/pedidosStorage";

export default function Pedidos() {
  const [pedidos, setPedidos] =
    useState<Pedido[]>([]);

  const [cliente, setCliente] =
    useState("");

  const [cidade, setCidade] =
    useState("");

  const [
    dataPedido,
    setDataPedido,
  ] = useState<string>("");

  const [
    dataEmail,
    setDataEmail,
  ] = useState<string>("");

  const [
    quantidadePneus,
    setQuantidadePneus,
  ] = useState("");

  const [
    observacao,
    setObservacao,
  ] = useState("");

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function carregarPedidos() {
    const pedidosStorage =
      await getPedidos();

    const pedidosFormatados: Pedido[] =
      pedidosStorage.map(
        (pedido: any) => ({
          id: pedido.id,

          cliente:
            pedido.cliente || "",

          cidade:
            pedido.cidade || "",

          dataPedido:
            pedido.dataPedido || "",

          dataEmail:
            pedido.dataEmail || "",

          quantidadePneus:
            Number(
              pedido.quantidadePneus || 0
            ),

          faturado:
            pedido.faturado || false,

          prioridade:
            pedido.prioridade || false,

          observacao:
            pedido.observacao || "",

          dataFaturamento:
            pedido.dataFaturamento || "",

          entregueFinalizado:
            pedido.entregueFinalizado ||
            false,
        })
      );

    setPedidos(
      pedidosFormatados
    );
  }

  async function handleCriarPedido() {
    if (!cliente || !cidade) {
      alert(
        "Preencha os campos obrigatórios"
      );

      return;
    }

    const novoPedido: Pedido = {
      id: crypto.randomUUID(),

      cliente,
      cidade,

      dataPedido,
      dataEmail,

      quantidadePneus: Number(
        quantidadePneus
      ),

      faturado: false,

      prioridade: false,

      observacao,

      dataFaturamento: "",

      entregueFinalizado: false,
    };

    await criarPedido(
      novoPedido
    );

    await carregarPedidos();

    limparFormulario();
  }

  function limparFormulario() {
    setCliente("");

    setCidade("");

    setDataPedido("");

    setDataEmail("");

    setQuantidadePneus("");

    setObservacao("");
  }

  async function excluirPedido(
    id: string
  ) {
    await excluirPedidoStorage(
      id
    );

    await carregarPedidos();
  }

  async function togglePrioridade(
    pedido: Pedido
  ) {
    const pedidoAtualizado = {
      ...pedido,

      prioridade:
        !pedido.prioridade,
    };

    await atualizarPedido(
      pedidoAtualizado
    );

    setPedidos((prev) =>
      prev.map((item) =>
        item.id === pedido.id
          ? pedidoAtualizado
          : item
      )
    );
  }

  async function toggleFaturado(
    pedido: Pedido
  ) {
    if (
      !pedido.dataFaturamento
    ) {
      alert(
        "Preencha a data de faturamento"
      );

      return;
    }

    const pedidoAtualizado = {
      ...pedido,

      faturado:
        !pedido.faturado,
    };

    await atualizarPedido(
      pedidoAtualizado
    );

    setPedidos((prev) =>
      prev.map((item) =>
        item.id === pedido.id
          ? pedidoAtualizado
          : item
      )
    );
  }

  async function atualizarDataFaturamento(
    pedido: Pedido,
    valor: string
  ) {
    const pedidoAtualizado = {
      ...pedido,

      dataFaturamento:
        valor,
    };

    setPedidos((prev) =>
      prev.map((item) =>
        item.id === pedido.id
          ? pedidoAtualizado
          : item
      )
    );

    await atualizarPedido(
      pedidoAtualizado
    );
  }

  async function atualizarObservacao(
    pedido: Pedido,
    valor: string
  ) {
    const pedidoAtualizado = {
      ...pedido,

      observacao: valor,
    };

    setPedidos((prev) =>
      prev.map((item) =>
        item.id === pedido.id
          ? pedidoAtualizado
          : item
      )
    );

    await atualizarPedido(
      pedidoAtualizado
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          Pedidos
        </h1>

        <p className="text-zinc-400 mt-1">
          Gestão de pedidos de pneus
        </p>
      </div>

      {/* Formulário */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="grid grid-cols-2 gap-5">
          {/* Cliente */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">
              Cliente
            </label>

            <input
              type="text"
              value={cliente}
              onChange={(e) =>
                setCliente(
                  e.target.value
                )
              }
              className="
                bg-black
                border
                border-zinc-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-[#C7A6FF]
              "
            />
          </div>

          {/* Cidade */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">
              Cidade
            </label>

            <input
              type="text"
              value={cidade}
              onChange={(e) =>
                setCidade(
                  e.target.value
                )
              }
              className="
                bg-black
                border
                border-zinc-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-[#C7A6FF]
              "
            />
          </div>

          {/* Data Pedido */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">
              Data/Hora do Pedido
            </label>

            <input
              type="datetime-local"
              value={dataPedido}
              onChange={(e) =>
                setDataPedido(
                  e.target.value
                )
              }
              className="
                bg-black
                border
                border-zinc-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-[#C7A6FF]
              "
            />
          </div>

          {/* Data Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">
              Data/Hora do Email
            </label>

            <input
              type="datetime-local"
              value={dataEmail}
              onChange={(e) =>
                setDataEmail(
                  e.target.value
                )
              }
              className="
                bg-black
                border
                border-zinc-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-[#C7A6FF]
              "
            />
          </div>

          {/* Quantidade */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">
              Quantidade de Pneus
            </label>

            <input
              type="number"
              value={quantidadePneus}
              onChange={(e) =>
                setQuantidadePneus(
                  e.target.value
                )
              }
              className="
                bg-black
                border
                border-zinc-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-[#C7A6FF]
              "
            />
          </div>

          {/* Observação */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">
              Observação
            </label>

            <textarea
              value={observacao}
              onChange={(e) =>
                setObservacao(
                  e.target.value
                )
              }
              className="
                bg-black
                border
                border-zinc-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-[#C7A6FF]
              "
            />
          </div>
        </div>

        {/* Botão */}
        <button
          onClick={
            handleCriarPedido
          }
          className="
            mt-6
            bg-[#F4C542]
            hover:opacity-80
            text-black
            font-bold
            px-6
            py-3
            rounded-xl
            transition
          "
        >
          Criar Pedido
        </button>
      </div>

      {/* Lista */}
      <div className="space-y-5">
        {pedidos
          .filter(
            (pedido) =>
              !pedido.faturado
          )
          .map((pedido) => (
            <div
              key={pedido.id}
              className="
                bg-zinc-900
                border
                border-zinc-800
                rounded-2xl
                p-6
              "
            >
              {/* Topo */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">
                      {
                        pedido.cliente
                      }
                    </h2>

                    {pedido.prioridade && (
                      <span
                        className="
                          bg-red-500/20
                          text-red-400
                          text-xs
                          px-3
                          py-1
                          rounded-full
                        "
                      >
                        PRIORIDADE
                      </span>
                    )}
                  </div>

                  <p className="text-zinc-400 mt-1">
                    {pedido.cidade}
                  </p>
                </div>

                {/* Botões */}
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      excluirPedido(
                        pedido.id
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

                  <button
                    className="
                      bg-[#C7A6FF]/20
                      hover:bg-[#C7A6FF]/40
                      transition
                      p-3
                      rounded-xl
                    "
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              </div>

              {/* Dados */}
              <div className="grid grid-cols-3 gap-5 mt-6">
                <div>
                  <p className="text-zinc-500 text-sm">
                    Data Pedido
                  </p>

                  <p className="mt-1">
                    {pedido.dataPedido ||
                      "-"}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">
                    Data Email
                  </p>

                  <p className="mt-1">
                    {pedido.dataEmail ||
                      "-"}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">
                    Quantidade
                  </p>

                  <p className="mt-1">
                    {
                      pedido.quantidadePneus
                    }
                  </p>
                </div>
              </div>

              {/* Observação */}
              <div className="mt-6 space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-zinc-400">
                    Observação
                  </label>

                  <textarea
                    value={
                      pedido.observacao
                    }
                    onChange={(e) =>
                      atualizarObservacao(
                        pedido,
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
                </div>

                {/* Checkboxes */}
                <div className="flex gap-10">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={
                        pedido.prioridade
                      }
                      onChange={() =>
                        togglePrioridade(
                          pedido
                        )
                      }
                    />

                    Prioridade
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={
                        pedido.faturado
                      }
                      onChange={() =>
                        toggleFaturado(
                          pedido
                        )
                      }
                    />

                    Faturado
                  </label>
                </div>

                {/* Data Faturamento */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-zinc-400">
                    Data/Hora
                    Faturamento
                  </label>

                  <input
                    type="datetime-local"
                    value={
                      pedido.dataFaturamento
                    }
                    onChange={(e) =>
                      atualizarDataFaturamento(
                        pedido,
                        e.target.value
                      )
                    }
                    className="
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
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}