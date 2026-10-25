
import { prisma } from "../lib/prisma";

const animaisDeTeste = [
  {
    nome: "Rex",
    especie: "Cachorro",
    descricao: "Animal fictício para testar a listagem da API.",
    idade: 3,
    fotoUrl: "https://placehold.co/600x400?text=Rex",
    status: "disponivel",
  },
  {
    nome: "Mimi",
    especie: "Gato",
    descricao: "Animal fictício para testar a listagem da API.",
    idade: 2,
    fotoUrl: "https://placehold.co/600x400?text=Mimi",
    status: "disponivel",
  },
  {
    nome: "Luna",
    especie: "Cachorro",
    descricao: "Animal fictício para testar a listagem da API.",
    idade: 1,
    fotoUrl: "https://placehold.co/600x400?text=Luna",
    status: "disponivel",
  },
];

async function main() {
  const responsavel = await prisma.user.findFirst({
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });

  if (!responsavel) {
    throw new Error(
      "Nenhum usuário encontrado. Cadastre um usuário antes de executar o seed.",
    );
  }

  for (const animal of animaisDeTeste) {
    const existente = await prisma.animal.findFirst({
      where: {
        nome: animal.nome,
        responsavelId: responsavel.id,
        descricao: animal.descricao,
      },
    });

    if (existente) {
      console.log(`Animal de teste já cadastrado: ${animal.nome}`);
      continue;
    }

    await prisma.animal.create({
      data: {
        ...animal,
        responsavelId: responsavel.id,
      },
    });

    console.log(`Animal cadastrado: ${animal.nome}`);
  }
}

main()
  .catch((erro) => {
    console.error("Erro ao cadastrar animais de teste:", erro);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
