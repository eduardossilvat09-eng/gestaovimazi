import { useEffect, useState } from "react";

import {
  Truck,
  CheckCircle2,
  Trash2,
} from "lucide-react";

import type { Pedido } from "../types/Pedido";
import type { Entrega } from "../types/Entrega";

import {
  getPedidos,
  savePedidos,
} from "../services/pedidosStorage";

import {
  getEntregas,
  criarEntrega,
  atualizarEntrega,
  excluirEntrega,
} from "../services/entregasStorage";

type Motorista = {
  id: string;
  nome: string;
};

type Veiculo = {
  id: string;
  fabricante: string;
  modelo: string;
  capacidade: string;
  placa: string;
};

export default function Entregas() {
  const [
    pedidosFaturados,
    setPedidosFaturados,
  ] = useState<Pedido[]>([]);

  const [entregas, setEntregas] =
    useState<Entrega[]>([]);

  const [motoristas, setMotoristas] =
    useState<Motorista[]>([]);

  const [veiculos, setVeiculos] =
    useState<Veiculo[]>([]);

  const [
    pedidoSelecionado,
    setPedidoSelecionado,
  ] = useState<Pedido | null>(null);

  const [motorista, setMotorista] =
    useState("");

  const [veiculo, setVeiculo] =
    useState("");

  const [
    dataCarregamento,
    setDataCarregamento,
  ] = useState("");

  useEffect(() => {
    carregarTudo();
  }, []);

  async function carregarTudo() {
    const entregasStorage =
      await getEntregas();

    setEntregas(entregasStorage);

    await carregarPedidos(
      entregasStorage
    );

    const motoristasStorage =
      localStorage.getItem(
        "vimazi_motoristas"
      );

    const veiculosStorage =
      localStorage.getItem(
        "vimazi_veiculos"
      );

    if (motoristasStorage) {
      setMotoristas(
        JSON.parse(motoristasStorage)
      );
    }

    if (veiculosStorage) {
      setVeiculos(
        JSON.parse(veiculosStorage)
      );
    }
  }

  async function carregarPedidos(
    entregasAtuais: Entrega[]
  ) {
    const pedidos =
      await getPedidos();

    const pedidosComEntrega =
      entregasAtuais.map(
        (entrega) =>
          entrega.pedidoId
      );

    const faturados = pedidos.filter(
      (
        pedido: Pedido & {
          entregueFinalizado?: boolean;
        }
      ) =>
        pedido.faturado &&
        !pedido.entregueFinalizado &&
        !pedidosComEntrega.includes(
          pedido.id
        )
    );

    setPedidosFaturados(faturados);
  }

  async function handleCriarEntrega() {
    if (
      !pedidoSelecionado ||
      !motorista ||
      !veiculo ||
      !dataCarregamento
    ) {
      alert("Preencha os campos");

      return;
    }

    const novaEntrega: Entrega = {
      id: crypto.randomUUID(),

      pedidoId: pedidoSelecionado.id,

      cliente:
        pedidoSelecionado.cliente,

      cidade:
        pedidoSelecionado.cidade,

      quantidadePneus:
        pedidoSelecionado.quantidadePneus,

      dataPedido:
        pedidoSelecionado.dataPedido,

      dataEmail:
        pedidoSelecionado.dataEmail,

      dataFaturamento:
        pedidoSelecionado.dataFaturamento,

      motorista,

      veiculo,

      dataCarregamento,

      dataEntrega: "",

      entregue: false,

      concluida: false,

      observacao: "",
    };

    await criarEntrega(
      novaEntrega
    );

    await carregarTudo();

    setPedidoSelecionado(null);

    setMotorista("");

    setVeiculo("");

    setDataCarregamento("");
  }

  async function toggleEntregue(
    entrega: Entrega
  ) {
    if (!entrega.dataEntrega) {
      alert(
        "Preencha a data da entrega"
      );

      return;
    }

    const entregaAtualizada = {
      ...entrega,

      entregue: true,

      concluida: true,
    };

    await atualizarEntrega(
      entregaAtualizada
    );

    const pedidos =
      await getPedidos();

    const pedidosAtualizados =
      pedidos.map((pedido) => {
        if (
          pedido.id ===
          entrega.pedidoId
        ) {
          return {
            ...pedido,

            entregueFinalizado: true,
          };
        }

        return pedido;
      });

    await savePedidos(
      pedidosAtualizados
    );

    await carregarTudo();
  }

  function atualizarDataEntregaLocal(
    entrega: Entrega,
    valor: string
  ) {
    setEntregas((prev) =>
      prev.map((item) =>
        item.id === entrega.id
          ? {
              ...item,
              dataEntrega: valor,
            }
          : item
      )
    );
  }

  async function salvarDataEntrega(
    entrega: Entrega
  ) {
    await atualizarEntrega(entrega);
  }

  function atualizarObservacaoLocal(
    entrega: Entrega,
    valor: string
  ) {
    setEntregas((prev) =>
      prev.map((item) =>
        item.id === entrega.id
          ? {
              ...item,
              observacao: valor,
            }
          : item
      )
    );
  }

  async function salvarObservacao(
    entrega: Entrega
  ) {
    await atualizarEntrega(entrega);
  }

  async function handleExcluirEntrega(
    id: string
  ) {
    await excluirEntrega(id);

    await carregarTudo();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Truck className="text-[#F4C542]" />

          Entregas
        </h1>

        <p className="text-zinc-400 mt-1">
          Gestão de entregas faturadas
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">
              Pedido
            </label>

            <select
              value={
                pedidoSelecionado?.id ||
                ""
              }
              onChange={(e) => {
                const pedido =
                  pedidosFaturados.find(
                    (p) =>
                      p.id ===
                      e.target.value
                  );

                setPedidoSelecionado(
                  pedido || null
                );
              }}
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
            >
              <option value="">
                Selecione
              </option>

              {pedidosFaturados.map(
                (pedido) => (
                  <option
                    key={pedido.id}
                    value={pedido.id}
                  >
                    {pedido.cliente}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">
              Motorista
            </label>

            <select
              value={motorista}
              onChange={(e) =>
                setMotorista(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
            >
              <option value="">
                Selecione
              </option>

              {motoristas.map(
                (motorista) => (
                  <option
                    key={motorista.id}
                    value={motorista.nome}
                  >
                    {motorista.nome}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">
              Veículo
            </label>

            <select
              value={veiculo}
              onChange={(e) =>
                setVeiculo(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
            >
              <option value="">
                Selecione
              </option>

              {veiculos.map(
                (veiculo) => (
                  <option
                    key={veiculo.id}
                    value={`${veiculo.modelo} - ${veiculo.placa}`}
                  >
                    {veiculo.fabricante}{" "}
                    {veiculo.modelo} -{" "}
                    {veiculo.placa}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">
              Data/Hora Carregamento
            </label>

            <input
              type="datetime-local"
              value={dataCarregamento}
              onChange={(e) =>
                setDataCarregamento(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleCriarEntrega}
          className="mt-6 bg-[#F4C542] text-black font-bold px-6 py-3 rounded-xl"
        >
          Criar Entrega
        </button>
      </div>

      <div className="space-y-5">
        {entregas
          .filter(
            (entrega) =>
              entrega.concluida !== true
          )
          .map((entrega) => (
            <div
              key={entrega.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
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

                <button
                  onClick={() =>
                    handleExcluirEntrega(
                      entrega.id
                    )
                  }
                  className="bg-red-500/20 p-3 rounded-xl"
                >
                  <Trash2 size={18} />
                </button>
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
                    Data Pedido
                  </p>

                  <p>{entrega.dataPedido}</p>
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

              <div className="mt-6 space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-zinc-400">
                    Data/Hora Entrega
                  </label>

                  <input
                    type="datetime-local"
                    value={
                      entrega.dataEntrega
                    }
                    onChange={(e) =>
                      atualizarDataEntregaLocal(
                        entrega,
                        e.target.value
                      )
                    }
                    onBlur={() =>
                      salvarDataEntrega(
                        entrega
                      )
                    }
                    className="bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-zinc-400">
                    Observação
                  </label>

                  <textarea
                    value={
                      entrega.observacao
                    }
                    onChange={(e) =>
                      atualizarObservacaoLocal(
                        entrega,
                        e.target.value
                      )
                    }
                    onBlur={() =>
                      salvarObservacao(
                        entrega
                      )
                    }
                    className="bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={
                      entrega.entregue
                    }
                    onChange={() =>
                      toggleEntregue(
                        entrega
                      )
                    }
                  />

                  Entregue
                </label>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}