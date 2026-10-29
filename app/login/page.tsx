"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import "../auth.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setMensagem("");
    setSucesso(false);
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

      setSucesso(true);
      setMensagem("Login realizado com sucesso! Levando você ao site...");
      window.location.assign("/");
    } catch {
      setMensagem("Não foi possível entrar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="aut">
      <div className="aut-card">
        <p className="aut-eyebrow">Adote um Focinho 🐾</p>
        <h1 className="aut-title">Que bom ter você aqui!</h1>
        <p className="aut-sub">Entre para continuar o processo de adoção.</p>

        <form onSubmit={handleLogin}>
          <div className="aut-campo">
            <label htmlFor="email" className="aut-rotulo">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="aut-input"
            />
          </div>

          <div className="aut-campo">
            <label htmlFor="senha" className="aut-rotulo">Senha</label>
            <input
              id="senha"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
              className="aut-input"
            />
          </div>

          <button type="submit" disabled={carregando} className="aut-btn">
            {carregando ? "Entrando..." : "Entrar"}
          </button>

          {mensagem && (
            <p role="status" className={`aut-msg ${sucesso ? "ok" : ""}`}>
              {mensagem}
            </p>
          )}
        </form>

        <div className="aut-links">
          <span>
            Ainda não tem conta?{" "}
            <Link href="/cadastro" className="aut-link">Cadastre-se</Link>
          </span>
          <Link href="/" className="aut-link">← Voltar ao site</Link>
        </div>
      </div>
    </main>
  );
}