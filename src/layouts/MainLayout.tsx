import {
  LayoutDashboard,
  ClipboardList,
  Truck,
  CheckCircle2,
  Users,
  Building2,
} from "lucide-react";

import {
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();

  const menus = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/",
    },

    {
      icon: ClipboardList,
      label: "Pedidos",
      path: "/pedidos",
    },

    {
      icon: Truck,
      label: "Entregas",
      path: "/entregas",
    },

    {
      icon: CheckCircle2,
      label: "Concluídos",
      path: "/concluidos",
    },

    {
      icon: Users,
      label: "Clientes",
      path: "/clientes",
    },

    {
      icon: Building2,
      label: "Empresa",
      path: "/empresa",
    },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside
        className="
          w-72
          bg-zinc-950
          border-r
          border-zinc-800
          p-6
        "
      >
        {/* Logo */}
        <div className="mb-10">
          <h1
            className="
              text-3xl
              font-black
              text-[#F4C542]
            "
          >
            VIMAZI
          </h1>

          <p className="text-zinc-500 text-sm mt-1">
            Gestão de Entregas
          </p>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;

            const active =
              location.pathname === menu.path;

            return (
              <Link
                key={menu.path}
                to={menu.path}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition
                  ${
                    active
                      ? "bg-[#C7A6FF] text-black font-bold"
                      : "hover:bg-zinc-900 text-zinc-300"
                  }
                `}
              >
                <Icon size={20} />

                {menu.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-8">
        {/* Topbar */}
        <div
          className="
            flex
            justify-between
            items-center
            mb-8
          "
        >
          <div>
            <h2 className="text-2xl font-bold">
              GESTÃO VIMAZI
            </h2>

            <p className="text-zinc-500">
              Sistema de entregas
            </p>
          </div>

          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              px-5
              py-3
              rounded-2xl
            "
          >
            EDUARDO
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}