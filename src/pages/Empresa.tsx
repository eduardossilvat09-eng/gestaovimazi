import { useEffect, useState } from "react";

import {
  Building2,
  Truck,
  User,
  Pencil,
  Trash2,
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

  function editarMotorista(
    id: string
  ) {
    const motorista =
      motoristas.find(
        (m) => m.id === id
      );

    if (!motorista) return;

    const novoNome = prompt(
      "Editar motorista",
      motorista.nome
    );

    if (!novoNome) return;

    const lista = motoristas.map(
      (m) =>
        m.id === id
          ? {
              ...m,
              nome: novoNome,
            }
          : m
    );

    setMotoristas(lista);

    salvarMotoristas(lista);
  }

  function excluirMotorista(
    id: string
  ) {
    const lista = motoristas.filter(
      (m) => m.id !== id
    );

    setMotoristas(lista);

    salvarMotoristas(lista);
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

  function editarVeiculo(
    id: string
  ) {
    const veiculo =
      veiculos.find(
        (v) => v.id === id
      );

    if (!veiculo) return;

    const novoModelo = prompt(
      "Editar modelo",
      veiculo.modelo
    );

    if (!novoModelo) return;

    const lista = veiculos.map(
      (v) =>
        v.id === id
          ? {
              ...v,
              modelo: novoModelo,
            }
          : v
    );

    setVeiculos(lista);

    salvarVeiculos(lista);
  }

  function excluirVeiculo(
    id: string
  ) {
    const lista = veiculos.filter(
      (v) => v.id !== id
    );

    setVeiculos(lista);

    salvarVeiculos(lista);
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
                flex
                items-center
                justify-between
              "
            >
              <p>{motorista.nome}</p>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    editarMotorista(
                      motorista.id
                    )
                  }
                  className="
                    bg-blue-500/20
                    hover:bg-blue-500/40
                    transition
                    p-2
                    rounded-lg
                  "
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() =>
                    excluirMotorista(
                      motorista.id
                    )
                  }
                  className="
                    bg-red-500/20
                    hover:bg-red-500/40
                    transition
                    p-2
                    rounded-lg
                  "
                >
                  <Trash2 size={16} />
                </button>
              </div>
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
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">
                    {veiculo.fabricante}
                  </h3>

                  <p className="text-zinc-400 mt-1">
                    {veiculo.modelo}
                  </p>

                  <p className="text-zinc-500 mt-2">
                    🚛 {veiculo.placa}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      editarVeiculo(
                        veiculo.id
                      )
                    }
                    className="
                      bg-blue-500/20
                      hover:bg-blue-500/40
                      transition
                      p-2
                      rounded-lg
                    "
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() =>
                      excluirVeiculo(
                        veiculo.id
                      )
                    }
                    className="
                      bg-red-500/20
                      hover:bg-red-500/40
                      transition
                      p-2
                      rounded-lg
                    "
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

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