
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const animalSchema = z.object({
  nome: z.string().trim().min(2, "O nome deve ter pelo menos 2 caracteres.").max(80),
  especie: z.string().trim().min(2, "Informe a espécie.").max(40),
  descricao: z.string().trim().min(10, "A descrição deve ter pelo menos 10 caracteres.").max(2000),
  idade: z.number().int("A idade deve ser um número inteiro.").min(0).max(100),
  fotoUrl: z.url("Informe uma URL válida para a foto."),
});

export async function GET() {
  try {
    const animais = await prisma.animal.findMany({
      where: {
        status: "disponivel",
      },
      select: {
        id: true,
        nome: true,
        especie: true,
        descricao: true,
        idade: true,
        fotoUrl: true,
        status: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(animais);
  } catch (error) {
    console.error("Erro ao consultar animais:", error);

    return NextResponse.json(
      { erro: "Não foi possível carregar os animais." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    // Confere se o usuário possui uma sessão válida.
    const sessao = await auth.api.getSession({
      headers: await headers(),
    });

    if (!sessao) {
      return NextResponse.json(
        { erro: "Você precisa entrar na sua conta para cadastrar um animal." },
        { status: 401 },
      );
    }

    // Lê e valida os dados enviados ao servidor.
    let corpo: unknown;

    try {
      corpo = await request.json();
    } catch {
      return NextResponse.json(
        { erro: "O corpo da requisição não contém um JSON válido." },
        { status: 400 },
      );
    }

    const resultado = animalSchema.safeParse(corpo);

    if (!resultado.success) {
      return NextResponse.json(
        {
          erro: "Confira os dados do animal.",
          detalhes: resultado.error.issues.map((problema) => ({
            campo: problema.path.join("."),
            mensagem: problema.message,
          })),
        },
        { status: 400 },
      );
    }

    const dados = resultado.data;

    // O responsável vem da sessão, nunca do formulário.
    const animal = await prisma.animal.create({
      data: {
        nome: dados.nome,
        especie: dados.especie,
        descricao: dados.descricao,
        idade: dados.idade,
        fotoUrl: dados.fotoUrl,
        responsavelId: sessao.user.id,
      },
      select: {
        id: true,
        nome: true,
        especie: true,
        descricao: true,
        idade: true,
        fotoUrl: true,
        status: true,
        responsavelId: true,
        createdAt: true,
      },
    });

    return NextResponse.json(animal, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar animal:", error);

    return NextResponse.json(
      { erro: "Não foi possível cadastrar o animal." },
      { status: 500 },
    );
  }
}
