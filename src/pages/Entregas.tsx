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
} from "../services/pedidosStorage";

import {
  getEntregas,
  saveEntregas,
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

    window.addEventListener(
      "storage",
      carregarTudo
    );

    window.addEventListener(
      "focus",
      carregarTudo
    );

    return () => {
      window.removeEventListener(
        "storage",
        carregarTudo
      );

      window.removeEventListener(
        "focus",
        carregarTudo
      );
    };
  }, []);

  function carregarTudo() {
    const entregasStorage =
      getEntregas();

    setEntregas(entregasStorage);

    carregarPedidos(entregasStorage);

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

  function carregarPedidos(
    entregasAtuais: Entrega[]
  ) {
    const pedidos = getPedidos();

    const pedidosComEntrega =
      entregasAtuais.map(
        (entrega) =>
          entrega.pedidoId
      );

    const faturados = pedidos.filter(
      (pedido: any) =>
        pedido.faturado &&
        !pedido.entregueFinalizado &&
        !pedidosComEntrega.includes(
          pedido.id
        )
    );

    setPedidosFaturados(faturados);
  }

  function criarEntrega() {
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

    const novasEntregas = [
      novaEntrega,
      ...entregas,
    ];

    setEntregas(novasEntregas);

    saveEntregas(novasEntregas);

    carregarPedidos(novasEntregas);

    limparFormulario();
  }

  function limparFormulario() {
    setPedidoSelecionado(null);

    setMotorista("");

    setVeiculo("");

    setDataCarregamento("");
  }

  function toggleEntregue(id: string) {
    const novasEntregas = entregas.map(
      (entrega) => {
        if (entrega.id === id) {
          if (!entrega.dataEntrega) {
            alert(
              "Preencha a data da entrega"
            );

            return entrega;
          }

          /* MARCA pedido permanentemente */
          const pedidos =
            getPedidos();

          const pedidosAtualizados =
            pedidos.map(
              (pedido: any) => {
                if (
                  pedido.id ===
                  entrega.pedidoId
                ) {
                  return {
                    ...pedido,

                    entregueFinalizado:
                      true,
                  };
                }

                return pedido;
              }
            );

          localStorage.setItem(
            "vimazi_pedidos",
            JSON.stringify(
              pedidosAtualizados
            )
          );

          return {
            ...entrega,

            entregue:
              !entrega.entregue,

            concluida:
              !entrega.entregue,
          };
        }

        return entrega;
      }
    );

    setEntregas(novasEntregas);

    saveEntregas(novasEntregas);

    carregarPedidos(novasEntregas);
  }

  function atualizarDataEntrega(
    id: string,
    valor: string
  ) {
    const novasEntregas = entregas.map(
      (entrega) => {
        if (entrega.id === id) {
          return {
            ...entrega,

            dataEntrega: valor,
          };
        }

        return entrega;
      }
    );

    setEntregas(novasEntregas);

    saveEntregas(novasEntregas);
  }

  function atualizarObservacao(
    id: string,
    valor: string
  ) {
    const novasEntregas = entregas.map(
      (entrega) => {
        if (entrega.id === id) {
          return {
            ...entrega,

            observacao: valor,
          };
        }

        return entrega;
      }
    );

    setEntregas(novasEntregas);

    saveEntregas(novasEntregas);
  }

  function excluirEntrega(id: string) {
    const novasEntregas =
      entregas.filter(
        (entrega) =>
          entrega.id !== id
      );

    setEntregas(novasEntregas);

    saveEntregas(novasEntregas);

    carregarPedidos(
      novasEntregas
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Truck className="text-[#F4C542]" />

          Entregas
        </h1>

        <p className="text-zinc-400 mt-1">
          Gestão de entregas faturadas
        </p>
      </div>

      {/* Formulário */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="grid grid-cols-2 gap-5">
          {/* Pedido */}
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

          {/* Motorista */}
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

          {/* Veículo */}
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

          {/* Data carregamento */}
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

        <button
          onClick={criarEntrega}
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
          Criar Entrega
        </button>
      </div>

      {/* Lista */}
      <div className="space-y-5">
        {entregas
          .filter(
            (entrega) =>
              !entrega.concluida
          )
          .map((entrega) => (
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
                  {entrega.entregue && (
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

                      Entregue
                    </div>
                  )}

                  <button
                    onClick={() =>
                      excluirEntrega(
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

              {/* Infos */}
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

              {/* Controles */}
              <div className="mt-6 space-y-5">
                {/* Data entrega */}
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
                      atualizarDataEntrega(
                        entrega.id,
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

                {/* Observação */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-zinc-400">
                    Observação
                  </label>

                  <textarea
                    value={
                      entrega.observacao
                    }
                    onChange={(e) =>
                      atualizarObservacao(
                        entrega.id,
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

                {/* Checkbox */}
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={
                      entrega.entregue
                    }
                    onChange={() =>
                      toggleEntregue(
                        entrega.id
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