import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Pedidos from "./pages/Pedidos";
import Entregas from "./pages/Entregas";
import Concluidos from "./pages/Concluidos";
import Clientes from "./pages/Clientes";
import Empresa from "./pages/Empresa";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
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
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);