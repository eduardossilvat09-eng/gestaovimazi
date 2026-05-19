import { useEffect, useState } from "react";

import {
  Building2,
  Truck,
  User,
} from "lucide-react";

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

export default function Empresa() {
  const [motoristas, setMotoristas] =
    useState<Motorista[]>([]);

  const [veiculos, setVeiculos] =
    useState<Veiculo[]>([]);

  const [
    nomeMotorista,
    setNomeMotorista,
  ] = useState("");

  const [fabricante, setFabricante] =
    useState("");

  const [modelo, setModelo] =
    useState("");

  const [capacidade, setCapacidade] =
    useState("");

  const [placa, setPlaca] =
    useState("");

  useEffect(() => {
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
  }, []);

  function salvarMotoristas(
    lista: Motorista[]
  ) {
    localStorage.setItem(
      "vimazi_motoristas",
      JSON.stringify(lista)
    );
  }

  function salvarVeiculos(
    lista: Veiculo[]
  ) {
    localStorage.setItem(
      "vimazi_veiculos",
      JSON.stringify(lista)
    );
  }

  function adicionarMotorista() {
    if (!nomeMotorista) return;

    const novo: Motorista = {
      id: crypto.randomUUID(),

      nome: nomeMotorista,
    };

    const lista = [
      novo,
      ...motoristas,
    ];

    setMotoristas(lista);

    salvarMotoristas(lista);

    setNomeMotorista("");
  }

  function adicionarVeiculo() {
    if (
      !fabricante ||
      !modelo ||
      !capacidade ||
      !placa
    ) {
      alert("Preencha os campos");

      return;
    }

    const novo: Veiculo = {
      id: crypto.randomUUID(),

      fabricante,

      modelo,

      capacidade,

      placa,
    };

    const lista = [novo, ...veiculos];

    setVeiculos(lista);

    salvarVeiculos(lista);

    setFabricante("");

    setModelo("");

    setCapacidade("");

    setPlaca("");
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Building2 className="text-[#F4C542]" />

          Empresa
        </h1>

        <p className="text-zinc-400 mt-1">
          Gestão de motoristas e veículos
        </p>
      </div>

      {/* Motoristas */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="text-[#C7A6FF]" />

          <h2 className="text-2xl font-bold">
            Motoristas
          </h2>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Nome do motorista"
            value={nomeMotorista}
            onChange={(e) =>
              setNomeMotorista(
                e.target.value
              )
            }
            className="
              flex-1
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

          <button
            onClick={adicionarMotorista}
            className="
              bg-[#F4C542]
              hover:opacity-80
              text-black
              font-bold
              px-6
              rounded-xl
            "
          >
            Adicionar
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {motoristas.map((motorista) => (
            <div
              key={motorista.id}
              className="
                bg-black
                border
                border-zinc-800
                rounded-xl
                p-4
              "
            >
              {motorista.nome}
            </div>
          ))}
        </div>
      </div>

      {/* Veículos */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Truck className="text-[#F4C542]" />

          <h2 className="text-2xl font-bold">
            Veículos
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Fabricante */}
          <input
            type="text"
            placeholder="Fabricante"
            value={fabricante}
            onChange={(e) =>
              setFabricante(
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

          {/* Modelo */}
          <input
            type="text"
            placeholder="Modelo"
            value={modelo}
            onChange={(e) =>
              setModelo(
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

          {/* Placa */}
          <input
            type="text"
            placeholder="Placa"
            value={placa}
            onChange={(e) =>
              setPlaca(
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

          {/* Capacidade */}
          <select
            value={capacidade}
            onChange={(e) =>
              setCapacidade(
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
              Capacidade
            </option>

            <option value="Pequeno">
              Pequeno
            </option>

            <option value="Médio">
              Médio
            </option>

            <option value="Grande">
              Grande
            </option>
          </select>
        </div>

        <button
          onClick={adicionarVeiculo}
          className="
            mt-5
            bg-[#F4C542]
            hover:opacity-80
            text-black
            font-bold
            px-6
            py-3
            rounded-xl
          "
        >
          Adicionar Veículo
        </button>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {veiculos.map((veiculo) => (
            <div
              key={veiculo.id}
              className="
                bg-black
                border
                border-zinc-800
                rounded-xl
                p-5
              "
            >
              <h3 className="font-bold text-lg">
                {veiculo.fabricante}
              </h3>

              <p className="text-zinc-400 mt-1">
                {veiculo.modelo}
              </p>

              <p className="text-zinc-500 mt-2">
                🚛 {veiculo.placa}
              </p>

              <div
                className="
                  mt-4
                  inline-block
                  bg-[#C7A6FF]/20
                  text-[#C7A6FF]
                  px-3
                  py-1
                  rounded-full
                  text-sm
                "
              >
                {veiculo.capacidade}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}