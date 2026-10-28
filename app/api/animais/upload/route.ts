
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { exigirAdmin } from "@/lib/sessao";

const TIPOS_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const TAMANHO_MAXIMO = 2 * 1024 * 1024; // 2 MB

export async function POST(request: Request) {
  try {
    try {
      await exigirAdmin();
    } catch {
      return NextResponse.json(
        { erro: "Apenas administradores podem enviar fotos." },
        { status: 403 },
      );
    }

    const formulario = await request.formData();
    const arquivo = formulario.get("arquivo");

    if (!(arquivo instanceof File) || arquivo.size === 0) {
      return NextResponse.json(
        { erro: "Selecione uma imagem para enviar." },
        { status: 400 },
      );
    }

    if (!TIPOS_PERMITIDOS.includes(arquivo.type)) {
      return NextResponse.json(
        { erro: "Formato inválido. Use JPG, PNG ou WebP." },
        { status: 400 },
      );
    }

    if (arquivo.size > TAMANHO_MAXIMO) {
      return NextResponse.json(
        { erro: "A imagem deve ter no máximo 2 MB." },
        { status: 400 },
      );
    }

    const extensao = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    }[arquivo.type];

    const blob = await put(
      `animais/${crypto.randomUUID()}.${extensao}`,
      arquivo,
      {
        access: "public",
        addRandomSuffix: true,
        contentType: arquivo.type,
      },
    );

    return NextResponse.json(
      { url: blob.url },
      { status: 201 },
    );
  } catch (erro) {
    console.error("Erro ao enviar foto do animal:", erro);

    return NextResponse.json(
      { erro: "Não foi possível enviar a foto. Tente novamente." },
      { status: 500 },
    );
  }
}
