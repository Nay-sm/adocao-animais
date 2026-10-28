"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { exigirAdmin, exigirLogin } from "@/lib/sessao";
import { redirect } from "next/navigation";

// Server action: roda no servidor quando o formulário é enviado.
// Faz o papel de um app.post('/admin/excluir') com middleware de admin.
export async function excluirAnimal(formData: FormData) {
  await exigirAdmin(); // 1º: confere sessão E papel, no servidor

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  // deleteMany não dá erro se o id não existir (ex.: id forjado)
  await prisma.animal.deleteMany({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/");
}


import { z } from "zod";

const animalSchema = z.object({
  nome: z.string().trim().min(2, "Informe o nome."),
  especie: z.string().trim().min(2, "Informe a espécie."),
  sexo: z.string().trim().min(1),
  porte: z.string().trim().min(1),
  idade: z.coerce.number().int().min(0).max(100),
  descricao: z.string().trim().min(10, "A descrição deve ter pelo menos 10 caracteres."),
  fotoUrl: z.string().trim().url("Informe uma URL válida para a foto."),
  status: z.enum(["disponivel", "adotado"]),
});

export async function cadastrarAnimal(formData: FormData) {
  const session = await exigirAdmin();

  const resultado = animalSchema.safeParse({
    nome: formData.get("nome"),
    especie: formData.get("especie"),
    sexo: formData.get("sexo"),
    porte: formData.get("porte"),
    idade: formData.get("idade"),
    descricao: formData.get("descricao"),
    fotoUrl: formData.get("fotoUrl"),
    status: formData.get("status"),
  });

  if (!resultado.success) {
    console.error(
      "Erros de validação do cadastro:",
      resultado.error.issues,
    );

    throw new Error("Dados inválidos. Confira os campos do animal.");
  }

  await prisma.animal.create({
    data: {
      ...resultado.data,
      responsavelId: session.user.id,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}


export async function editarAnimal(formData: FormData) {
  await exigirAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) {
    throw new Error("Animal não identificado.");
  }

  const resultado = animalSchema.safeParse({
    nome: formData.get("nome"),
    especie: formData.get("especie"),
    sexo: formData.get("sexo"),
    porte: formData.get("porte"),
    idade: formData.get("idade"),
    descricao: formData.get("descricao"),
    fotoUrl: formData.get("fotoUrl"),
    status: formData.get("status"),
  });

  if (!resultado.success) {
    throw new Error("Dados inválidos. Confira os campos do animal.");
  }

  const atualizacao = await prisma.animal.updateMany({
    where: { id },
    data: resultado.data,
  });

  if (atualizacao.count === 0) {
    throw new Error("Animal não encontrado.");
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function atualizarStatusPedido(formData: FormData) {
  await exigirAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !["aprovado", "rejeitado"].includes(status)) {
    throw new Error("Pedido ou status inválido.");
  }

  const pedido = await prisma.pedidoAdocao.findUnique({
    where: { id },
  });

  if (!pedido || pedido.status !== "pendente") {
    throw new Error("Pedido não encontrado ou já foi analisado.");
  }

  if (status === "aprovado") {
    await prisma.$transaction([
      prisma.pedidoAdocao.update({
        where: { id },
        data: { status: "aprovado" },
      }),
      prisma.animal.update({
        where: { id: pedido.animalId },
        data: { status: "adotado" },
      }),
      prisma.pedidoAdocao.updateMany({
        where: {
          animalId: pedido.animalId,
          id: { not: id },
          status: "pendente",
        },
        data: { status: "rejeitado" },
      }),
    ]);
  } else {
    await prisma.pedidoAdocao.update({
      where: { id },
      data: { status: "rejeitado" },
    });
  }

  revalidatePath("/admin/pedidos");
  revalidatePath("/admin");
  revalidatePath("/");
}

type ResultadoPedido =
  | { sucesso: true }
  | { sucesso: false; mensagem: string };

export async function criarPedidoAdocao(
  formData: FormData,
): Promise<ResultadoPedido> {
  const session = await exigirLogin();

  const animalId = String(formData.get("animalId") ?? "");
  const telefone = String(formData.get("telefone") ?? "").trim();
  const moradia = String(formData.get("moradia") ?? "");
  const experiencia = String(formData.get("experiencia") ?? "");
  const motivo = String(formData.get("motivo") ?? "").trim();

  if (!animalId || !telefone || !moradia || !experiencia || motivo.length < 10) {
    throw new Error("Preencha todos os campos corretamente.");
  }

  const animal = await prisma.animal.findUnique({
    where: { id: animalId },
    select: { id: true, status: true },
  });

  if (!animal || animal.status !== "disponivel") {
    throw new Error("Este animal não está mais disponível para adoção.");
  }

  const pedidoExistente = await prisma.pedidoAdocao.findUnique({
    where: {
      usuarioId_animalId: {
        usuarioId: session.user.id,
        animalId,
      },
    },
  });

  if (pedidoExistente) {
    return {
      sucesso: false,
      mensagem: "Você já enviou um pedido para este animal.",
    };
  }

  await prisma.pedidoAdocao.create({
    data: {
      usuarioId: session.user.id,
      animalId,
      telefone,
      moradia,
      experiencia,
      motivo,
    },
  });

  revalidatePath("/admin/pedidos");
  revalidatePath("/admin");
  revalidatePath("/");

  return { sucesso: true };
}