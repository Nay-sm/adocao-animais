import { prisma } from "@/lib/prisma";
import { exigirAdmin } from "@/lib/sessao";
import { atualizarStatusPedido } from "../actions";
import AdminNav from "../AdminNav";

export const dynamic = "force-dynamic";

const TEXTO_STATUS: Record<string, string> = {
  pendente: "Pendente",
  aprovado: "Aprovado",
  rejeitado: "Rejeitado",
};

export default async function PedidosPage() {
  await exigirAdmin();

  const pedidos = await prisma.pedidoAdocao.findMany({
    include: {
      usuario: true,
      animal: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const contar = (status: string) =>
    pedidos.filter((pedido) => pedido.status === status).length;

  return (
    <div className="adm">
      <AdminNav ativo="pedidos" />

      <main className="adm-container">
        <section className="adm-welcome">
          <div>
            <p className="adm-eyebrow">Painel da ONG · Solicitações</p>
            <h1 className="adm-title">Pedidos de adoção</h1>
            <p className="adm-sub">
              Analise as solicitações enviadas pelos adotantes e decida se cada
              uma será aprovada ou rejeitada.
            </p>
          </div>
        </section>

        <section aria-label="Resumo dos pedidos" className="adm-stats">
          <div className="adm-stat">
            <p>Pendentes</p>
            <strong>{contar("pendente")}</strong>
          </div>
          <div className="adm-stat">
            <p>Aprovados</p>
            <strong>{contar("aprovado")}</strong>
          </div>
          <div className="adm-stat">
            <p>Rejeitados</p>
            <strong>{contar("rejeitado")}</strong>
          </div>
        </section>

        {pedidos.length === 0 ? (
          <div className="adm-vazio">
            <strong>Ainda não há pedidos de adoção.</strong>
            Quando um adotante pedir um animal, a solicitação aparece aqui.
          </div>
        ) : (
          <ul className="adm-lista">
            {pedidos.map((pedido) => (
              <li key={pedido.id} className="adm-pedido">
                <div className="adm-pedido-topo">
                  <div>
                    <p className="adm-meta">Quer adotar</p>
                    <h2>{pedido.animal.nome}</h2>
                    <p className="adm-meta">{pedido.usuario.name}</p>
                    <p className="adm-meta" style={{ overflowWrap: "anywhere" }}>
                      {pedido.usuario.email}
                    </p>
                  </div>

                  <div className="adm-pedido-acoes">
                    <span className={`adm-badge ${pedido.status}`}>
                      {TEXTO_STATUS[pedido.status] ?? pedido.status}
                    </span>

                    {pedido.status === "pendente" && (
                      <>
                        <form action={atualizarStatusPedido}>
                          <input type="hidden" name="id" value={pedido.id} />
                          <input type="hidden" name="status" value="aprovado" />
                          <button type="submit" className="adm-btn adm-btn-primario">
                            Aprovar
                          </button>
                        </form>

                        <form action={atualizarStatusPedido}>
                          <input type="hidden" name="id" value={pedido.id} />
                          <input type="hidden" name="status" value="rejeitado" />
                          <button type="submit" className="adm-btn adm-btn-perigo">
                            Rejeitar
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </div>

                <dl className="adm-dl">
                  <div>
                    <dt>Telefone</dt>
                    <dd>{pedido.telefone}</dd>
                  </div>
                  <div>
                    <dt>Moradia</dt>
                    <dd>{pedido.moradia}</dd>
                  </div>
                  <div>
                    <dt>Experiência com animais</dt>
                    <dd>{pedido.experiencia}</dd>
                  </div>
                  <div>
                    <dt>Enviado em</dt>
                    <dd>{pedido.createdAt.toLocaleDateString("pt-BR")}</dd>
                  </div>
                  <div className="adm-full">
                    <dt>Motivo da adoção</dt>
                    <dd>{pedido.motivo}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}