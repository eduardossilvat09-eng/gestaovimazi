import { useState } from "react";

import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  async function entrar() {
    const { error } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password: senha,
        }
      );

    if (error) {
      alert(error.message);

      return;
    }

    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-2xl w-[400px] space-y-5">
        <h1 className="text-3xl font-bold text-white">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) =>
            setSenha(e.target.value)
          }
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
        />

        <button
          onClick={entrar}
          className="w-full bg-[#F4C542] text-black font-bold py-3 rounded-xl"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}