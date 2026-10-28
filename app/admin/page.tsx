import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { exigirAdmin } from "@/lib/sessao";
import { excluirAnimal } from "./actions";
import AdminNav from "./AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await exigirAdmin();

  const [animais, totalPedidos, pedidosPendentes] = await Promise.all([
    prisma.animal.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { pedidos: true } } },
    }),
    prisma.pedidoAdocao.count(),
    prisma.pedidoAdocao.count({ where: { status: "pendente" } }),
  ]);

  return (
    <div className="adm">
      <AdminNav ativo="geral" />

      <main className="adm-container">
        <section className="adm-welcome">
          <div>
            <p className="adm-eyebrow">Painel da ONG · Administração</p>
            <h1 className="adm-title">Olá, {session.user.name}!</h1>
            <p className="adm-sub">
              Cadastre os animais, edite as informações e analise os pedidos de
              adoção.
            </p>
          </div>

          <div className="adm-welcome-acoes">
            <Link href="/admin/pedidos" className="adm-btn adm-btn-primario">
              Gerenciar pedidos
            </Link>
            <Link href="/admin/novo" className="adm-btn adm-btn-contorno">
              + Cadastrar animal
            </Link>
          </div>
        </section>

        <section aria-label="Resumo" className="adm-stats">
          <div className="adm-stat">
            <p>Animais cadastrados</p>
            <strong>{animais.length}</strong>
          </div>
          <div className="adm-stat">
            <p>Pedidos recebidos</p>
            <strong>{totalPedidos}</strong>
          </div>
          <div className="adm-stat">
            <p>Pedidos pendentes</p>
            <strong>{pedidosPendentes}</strong>
          </div>
        </section>

        <section>
          <div className="adm-secao-cab">
            <div>
              <h2 className="adm-h2">Animais da ONG</h2>
              <p>Edite, exclua ou veja quantos pedidos cada animal recebeu.</p>
            </div>
            <Link href="/admin/novo" className="adm-btn adm-btn-primario">
              + Cadastrar animal
            </Link>
          </div>

          {animais.length === 0 ? (
            <div className="adm-vazio">
              <strong>Nenhum animal cadastrado ainda.</strong>
              Use o botão acima para cadastrar o primeiro animal.
            </div>
          ) : (
            <ul className="adm-grid-animais">
              {animais.map((animal) => (
                <li key={animal.id} className="adm-card">
                  <div className="adm-card-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={animal.fotoUrl} alt={`Foto de ${animal.nome}`} />
                  </div>

                  <div className="adm-card-corpo">
                    <div className="adm-card-titulo">
                      <h3>{animal.nome}</h3>
                      <span
                        className={`adm-badge ${
                          animal.status === "adotado" ? "adotado" : ""
                        }`}
                      >
                        {animal.status === "adotado" ? "Adotado" : "Disponível"}
                      </span>
                    </div>

                    <p className="adm-meta">
                      {animal.especie} · {animal.sexo} · {animal.porte}
                    </p>
                    <p className="adm-meta">
                      {animal._count.pedidos} pedido(s) de adoção
                    </p>

                    <div className="adm-card-acoes">
                      <Link
                        href={`/admin/editar/${animal.id}`}
                        className="adm-btn adm-btn-contorno"
                      >
                        Editar
                      </Link>

                      <details className="adm-excluir">
                        <summary>Excluir</summary>
                        <form action={excluirAnimal}>
                          <input type="hidden" name="id" value={animal.id} />
                          <p>
                            Excluir também apaga os pedidos deste animal.
                            Deseja continuar?
                          </p>
                          <button
                            type="submit"
                            className="adm-btn adm-btn-perigo adm-btn-cheio"
                          >
                            Sim, excluir {animal.nome}
                          </button>
                        </form>
                      </details>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}