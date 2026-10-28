import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function BotaoAdmin() {
  const sessao = await auth.api.getSession({ headers: await headers() });

  if (sessao?.user.role !== "admin") return null;

  return (
    <Link
      href="/admin"
      style={{
        position: "fixed",
        right: 16,
        bottom: 64,
        zIndex: 80,
        padding: "12px 18px",
        borderRadius: 12,
        background: "#49613c",
        color: "#fff",
        fontSize: 13,
        fontWeight: 800,
        textDecoration: "none",
        boxShadow: "0 10px 30px rgba(0,0,0,.18)",
      }}
    >
      Painel do administrador →
    </Link>
  );
}