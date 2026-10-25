
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
