import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Pedidos from "./pages/Pedidos";
import Entregas from "./pages/Entregas";
import Concluidos from "./pages/Concluidos";
import Clientes from "./pages/Clientes";
import Empresa from "./pages/Empresa";
import Login from "./pages/Login";

import { supabase } from "./lib/supabase";

function AppRoutes() {
  const [loading, setLoading] =
    useState(true);

  const [logado, setLogado] =
    useState(false);

  useEffect(() => {
    async function verificar() {
      const { data } =
        await supabase.auth.getSession();

      setLogado(
        !!data.session
      );

      setLoading(false);
    }

    verificar();

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          setLogado(!!session);
        }
      );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Carregando...
      </div>
    );
  }

  if (!logado) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/pedidos"
            element={<Pedidos />}
          />

          <Route
            path="/entregas"
            element={<Entregas />}
          />

          <Route
            path="/concluidos"
            element={<Concluidos />}
          />

          <Route
            path="/clientes"
            element={<Clientes />}
          />

          <Route
            path="/empresa"
            element={<Empresa />}
          />

          <Route
            path="*"
            element={
              <Navigate to="/" />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);