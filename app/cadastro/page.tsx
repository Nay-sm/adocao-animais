
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleCadastro(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMensagem("");

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
    <main>
      <h1>Criar conta</h1>
      <p>Cadastre-se para solicitar a adoção de animais.</p>

      <form onSubmit={handleCadastro}>
        <div>
          <label htmlFor="nome">Nome completo</label>
          <input
            id="nome"
            name="name"
            type="text"
            autoComplete="name"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </div>

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
            autoComplete="new-password"
            minLength={8}
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={carregando}>
          {carregando ? "Criando conta..." : "Criar conta"}
        </button>

        {mensagem && <p role="status">{mensagem}</p>}
      </form>
    </main>
  );
}
