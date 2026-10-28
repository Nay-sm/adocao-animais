import Link from "next/link";
import "./admin.css";

type Props = {
  ativo?: "geral" | "pedidos" | "novo";
};

export default function AdminNav({ ativo }: Props) {
  return (
    <header className="adm-topbar">
      <div className="adm-topbar-inner">
        <Link href="/" className="adm-brand" aria-label="Voltar ao site">
          <span>♥</span>
          adote um focinho
        </Link>

        <nav className="adm-nav" aria-label="Navegação do painel">
          <Link href="/admin" className={ativo === "geral" ? "ativo" : undefined}>
            Visão geral
          </Link>
          <Link
            href="/admin/pedidos"
            className={ativo === "pedidos" ? "ativo" : undefined}
          >
            Pedidos
          </Link>
          <Link
            href="/admin/novo"
            className={ativo === "novo" ? "ativo" : undefined}
          >
            Cadastrar animal
          </Link>
          <Link href="/">Ver o site</Link>
        </nav>
      </div>
    </header>
  );
}