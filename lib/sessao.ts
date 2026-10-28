import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Devolve a sessão (ou null se for visitante). Roda só no servidor.
export async function obterSessao() {
  return auth.api.getSession({ headers: await headers() });
}

// Páginas protegidas: visitante vai para o login.
export async function exigirLogin() {
  const session = await obterSessao();
  if (!session) redirect("/login");
  return session;
}

// Páginas de gestão: só admin passa; adotante volta para a página inicial.
export async function exigirAdmin() {
  const session = await exigirLogin();
  if (session.user.role !== "admin") redirect("/");
  return session;
}