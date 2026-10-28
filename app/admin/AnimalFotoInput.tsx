
"use client";

import { useState, useEffect } from "react";

type AnimalFotoInputProps = {
  fotoInicial?: string;
  resetar?: boolean;
};

export default function AnimalFotoInput({
  fotoInicial = "",
  resetar = false,
}: AnimalFotoInputProps) {
  const [fotoUrl, setFotoUrl] = useState(fotoInicial);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (resetar) {
      setFotoUrl("");
      setErro("");
    }
  }, [resetar]);

  async function enviarFoto(arquivo: File) {
    setErro("");

    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];

    if (!tiposPermitidos.includes(arquivo.type)) {
      setErro("Escolha uma imagem JPG, PNG ou WebP.");
      return;
    }

    if (arquivo.size > 2 * 1024 * 1024) {
      setErro("A imagem deve ter no máximo 2 MB.");
      return;
    }

    const formulario = new FormData();
    formulario.append("arquivo", arquivo);
    setEnviando(true);

    try {
      const resposta = await fetch("/api/animais/upload", {
        method: "POST",
        body: formulario,
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro || "Não foi possível enviar a foto.");
      }

      setFotoUrl(dados.url);
    } catch (erroEnvio) {
      setErro(
        erroEnvio instanceof Error
          ? erroEnvio.message
          : "Erro ao enviar a foto.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="grid gap-3">
      <label htmlFor="arquivoFoto">Selecionar foto (JPG, PNG ou WebP)</label>

      <input
        id="arquivoFoto"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        disabled={enviando}
        onChange={(evento) => {
          const arquivo = evento.target.files?.[0];
          if (arquivo) void enviarFoto(arquivo);
          evento.target.value = "";
        }}
      />

      {enviando && <p>Enviando foto...</p>}
      {erro && <p role="alert">{erro}</p>}

      {fotoUrl && (
        <img
          src={fotoUrl}
          alt="Prévia da foto do animal"
          className="h-40 w-40 rounded-lg object-cover"
        />
      )}

      <label htmlFor="fotoUrl">URL da foto</label>
      <input
        id="fotoUrl"
        name="fotoUrl"
        type="url"
        value={fotoUrl}
        onChange={(evento) => setFotoUrl(evento.target.value)}
        placeholder="Selecione uma foto ou informe uma URL pública"
        required
        className="w-full rounded border p-2"
      />
    </div>
  );
}
