import { prisma } from "@/lib/prisma";
import HomeClient, { type Animal } from "./HomeClient";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import BotaoAdmin from "./BotaoAdmin";

// A página lê o banco a cada visita (sem isso ela "congelaria" no build).
export const dynamic = "force-dynamic";

function formatarIdade(anos: number) {
  if (anos === 0) return "Menos de 1 ano";
  if (anos === 1) return "1 ano";
  return `${anos} anos`;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ busca?: string | string[] }>;
}) {
  // No Next 16, searchParams é uma Promise: precisa do await.
  const params = await searchParams;
  const buscaBruta = Array.isArray(params.busca) ? params.busca[0] : params.busca;
  const busca = (buscaBruta ?? "").trim().slice(0, 60);

  const registros = await prisma.animal.findMany({
    where: {
      status: "disponivel",
      ...(busca
        ? {
            OR: [
              { nome: { contains: busca, mode: "insensitive" } },
              { especie: { contains: busca, mode: "insensitive" } },
              { descricao: { contains: busca, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  // Converte o formato do banco para o formato que a interface da Sulamita usa.
  const animais: Animal[] = registros.map((a) => ({
    id: a.id,
    nome: a.nome,
    tipo: a.especie,
    idade: formatarIdade(a.idade),
    sexo: a.sexo,
    imagem: a.fotoUrl,
    alt: `Foto de ${a.nome}`,
    descricao: a.descricao,
  }));

  const session = await auth.api.getSession({ headers: await headers() });
  const usuario = session
    ? { nome: session.user.name, email: session.user.email }
    : null;

    return (
  <>
    <HomeClient animais={animais} busca={busca} usuarioInicial={usuario} />
    <BotaoAdmin />
  </>
);
}