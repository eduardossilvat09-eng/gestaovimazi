import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState([
    {
      name: "Seg",
      pedidos: 0,
      entregas: 0,
    },
    {
      name: "Ter",
      pedidos: 0,
      entregas: 0,
    },
    {
      name: "Qua",
      pedidos: 0,
      entregas: 0,
    },
    {
      name: "Qui",
      pedidos: 0,
      entregas: 0,
    },
    {
      name: "Sex",
      pedidos: 0,
      entregas: 0,
    },
  ]);

  const [entregasMes, setEntregasMes] =
    useState(0);

  const [pneusVendidos, setPneusVendidos] =
    useState(0);

  const [topClientes, setTopClientes] =
    useState<string[]>([]);

  const [topMotoristas, setTopMotoristas] =
    useState<string[]>([]);

  const [tempoMedio, setTempoMedio] =
    useState("--");

  useEffect(() => {
    function carregarDashboard() {
      const pedidosStorage =
        localStorage.getItem(
          "vimazi_pedidos"
        );

      const entregasStorage =
        localStorage.getItem(
          "vimazi_entregas"
        );

      const pedidos = pedidosStorage
        ? JSON.parse(pedidosStorage)
        : [];

      const entregas = entregasStorage
        ? JSON.parse(entregasStorage)
        : [];

      /* Somente entregas concluídas */
      const entregasConcluidas =
        entregas.filter(
          (e: any) => e.concluida
        );

      /* Cards */
      setEntregasMes(
        entregasConcluidas.length
      );

      const totalPneus =
        entregasConcluidas.reduce(
          (
            total: number,
            entrega: any
          ) =>
            total +
            Number(
              entrega.quantidadePneus || 0
            ),
          0
        );

      setPneusVendidos(totalPneus);

      /* Tempo médio */
      const entregasFinalizadas =
        entregasConcluidas.filter(
          (entrega: any) =>
            entrega.dataEntrega &&
            entrega.dataPedido
        );

      const diferencas =
        entregasFinalizadas.map(
          (entrega: any) => {
            const pedidoData =
              new Date(
                entrega.dataPedido
              );

            const entregaData =
              new Date(
                entrega.dataEntrega
              );

            const diff =
              entregaData.getTime() -
              pedidoData.getTime();

            return (
              diff /
              (1000 *
                60 *
                60 *
                24)
            );
          }
        );

      const media =
        diferencas.length > 0
          ? diferencas.reduce(
              (
                acc: number,
                valor: number
              ) => acc + valor,
              0
            ) / diferencas.length
          : 0;

      setTempoMedio(
        media > 0
          ? `${media.toFixed(
              1
            )} dias`
          : "--"
      );

      /* Gráficos */
      const semana = [
        "Dom",
        "Seg",
        "Ter",
        "Qua",
        "Qui",
        "Sex",
        "Sáb",
      ];

      const novoData = [
        "Seg",
        "Ter",
        "Qua",
        "Qui",
        "Sex",
      ].map((dia) => {
        /* Pedidos apenas concluídos */
        const pedidosDia =
          entregasConcluidas.filter(
            (entrega: any) => {
              if (
                !entrega.dataPedido
              )
                return false;

              const dataPedido =
                new Date(
                  entrega.dataPedido
                );

              return (
                semana[
                  dataPedido.getDay()
                ] === dia
              );
            }
          ).length;

        /* Entregas apenas concluídas */
        const entregasDia =
          entregasConcluidas.filter(
            (entrega: any) => {
              if (
                !entrega.dataEntrega
              )
                return false;

              const dataEntrega =
                new Date(
                  entrega.dataEntrega
                );

              return (
                semana[
                  dataEntrega.getDay()
                ] === dia
              );
            }
          ).length;

        return {
          name: dia,

          pedidos: pedidosDia,

          entregas: entregasDia,
        };
      });

      setData(novoData);

      /* Top clientes */
      const clientesMap: Record<
        string,
        number
      > = {};

      entregasConcluidas.forEach(
        (entrega: any) => {
          clientesMap[
            entrega.cliente
          ] =
            (clientesMap[
              entrega.cliente
            ] || 0) + 1;
        }
      );

      const clientesOrdenados =
        Object.entries(
          clientesMap
        )
          .sort(
            (a, b) => b[1] - a[1]
          )
          .slice(0, 3)
          .map((item) => item[0]);

      setTopClientes(
        clientesOrdenados
      );

      /* Top motoristas */
      const motoristasMap: Record<
        string,
        number
      > = {};

      entregasConcluidas.forEach(
        (entrega: any) => {
          motoristasMap[
            entrega.motorista
          ] =
            (motoristasMap[
              entrega.motorista
            ] || 0) + 1;
        }
      );

      const motoristasOrdenados =
        Object.entries(
          motoristasMap
        )
          .sort(
            (a, b) => b[1] - a[1]
          )
          .slice(0, 3)
          .map((item) => item[0]);

      setTopMotoristas(
        motoristasOrdenados
      );
    }

    carregarDashboard();

    window.addEventListener(
      "storage",
      carregarDashboard
    );

    window.addEventListener(
      "focus",
      carregarDashboard
    );

    return () => {
      window.removeEventListener(
        "storage",
        carregarDashboard
      );

      window.removeEventListener(
        "focus",
        carregarDashboard
      );
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-zinc-400">
          Gestão e controle de entregas
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <p className="text-zinc-400">
            Entregas no mês
          </p>

          <h2 className="text-4xl font-bold mt-2 text-[#F4C542]">
            {entregasMes}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <p className="text-zinc-400">
            Tempo Faturamento x
            Entrega
          </p>

          <h2 className="text-4xl font-bold mt-2 text-[#C7A6FF]">
            {tempoMedio}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <p className="text-zinc-400">
            Pneus vendidos no mês
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {pneusVendidos}
          </h2>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="grid grid-cols-3 gap-6">
        {/* Gráficos */}
        <div className="col-span-2 space-y-6">
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-xl font-semibold mb-5">
              Pedidos x Entregas
              Semanal
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={data}>
                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="pedidos"
                  fill="#F4C542"
                />

                <Bar
                  dataKey="entregas"
                  fill="#C7A6FF"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-xl font-semibold mb-5">
              Pedidos x Entregas
              Mensal
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart data={data}>
                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="pedidos"
                  stroke="#F4C542"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="entregas"
                  stroke="#C7A6FF"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rankings */}
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-xl font-semibold mb-5">
              Top Clientes
            </h2>

            <div className="space-y-3">
              {topClientes.map(
                (
                  cliente,
                  index
                ) => (
                  <div
                    key={index}
                    className="bg-black p-4 rounded-xl"
                  >
                    {cliente}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-xl font-semibold mb-5">
              Top Motoristas
            </h2>

            <div className="space-y-3">
              {topMotoristas.map(
                (
                  motorista,
                  index
                ) => (
                  <div
                    key={index}
                    className="bg-black p-4 rounded-xl"
                  >
                    {motorista}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}