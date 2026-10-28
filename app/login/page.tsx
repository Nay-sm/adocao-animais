
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password: senha,
      });

      if (error) {
        setMensagem(
          error.message || "Não foi possível entrar. Confira seus dados.",
        );
        return;
      }

      setMensagem("Login realizado com sucesso!");
    } catch {
      setMensagem("Não foi possível entrar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main>
      <h1>Entrar na conta</h1>
      <p>Entre para cadastrar animais e solicitar adoções.</p>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            name="password"
            type="password"
            autoComplete="current-password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>

        {mensagem && <p role="status">{mensagem}</p>}
      </form>
    </main>
  );
}
