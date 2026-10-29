"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import "../auth.css";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleCadastro(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMensagem("");
    setSucesso(false);

    if (!nome.trim() || !email.trim() || !senha) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    if (senha.length < 8) {
      setMensagem("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setCarregando(true);

    try {
      const { error } = await authClient.signUp.email({
        name: nome.trim(),
        email: email.trim(),
        password: senha,
      });

      if (error) {
        setMensagem(
          error.message || "Não foi possível criar sua conta."
        );
        return;
      }

      setSucesso(true);
      setMensagem("Conta criada com sucesso! Você já pode entrar.");
      setNome("");
      setEmail("");
      setSenha("");
    } catch {
      setMensagem(
        "Não foi possível concluir o cadastro. Tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="aut">
      <div className="aut-card">
        <p className="aut-eyebrow">Adote um Focinho 🐾</p>
        <h1 className="aut-title">Crie sua conta</h1>
        <p className="aut-sub">
          Cadastre-se para solicitar a adoção de animais.
        </p>

        <form onSubmit={handleCadastro}>
          <div className="aut-campo">
            <label htmlFor="nome" className="aut-rotulo">Nome completo</label>
            <input
              id="nome"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Como podemos te chamar?"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required
              className="aut-input"
            />
          </div>

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
              autoComplete="new-password"
              placeholder="Mínimo de 8 caracteres"
              minLength={8}
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
              className="aut-input"
            />
          </div>

          <button type="submit" disabled={carregando} className="aut-btn">
            {carregando ? "Criando conta..." : "Criar conta"}
          </button>

          {mensagem && (
            <p role="status" className={`aut-msg ${sucesso ? "ok" : ""}`}>
              {mensagem}
            </p>
          )}
        </form>

        <div className="aut-links">
          <span>
            Já tem uma conta?{" "}
            <Link href="/login" className="aut-link">Fazer login</Link>
          </span>
          <Link href="/" className="aut-link">← Voltar ao site</Link>
        </div>
      </div>
    </main>
  );
}