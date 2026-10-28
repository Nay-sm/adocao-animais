import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { exigirAdmin } from "@/lib/sessao";
import { editarAnimal } from "../../actions";
import AnimalFotoInput from "../../AnimalFotoInput";
import AdminNav from "../../AdminNav";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditarAnimalPage({ params }: Props) {
  await exigirAdmin();

  const { id } = await params;

  const animal = await prisma.animal.findUnique({
    where: { id },
  });

  if (!animal) {
    notFound();
  }

  return (
    <div className="adm">
      <AdminNav />

      <main className="adm-container adm-container-estreito">
        <div style={{ marginBottom: 24 }}>
          <p className="adm-eyebrow">Painel da ONG · Edição de animal</p>
          <h1 className="adm-title">Editar {animal.nome}</h1>
          <p className="adm-sub">
            Atualize as informações do animal. As mudanças aparecem na página
            pública assim que você salvar.
          </p>
        </div>

        <div className="adm-form-card">
          <form action={editarAnimal} className="adm-form-grid">
            <input type="hidden" name="id" value={animal.id} />

            <div className="adm-campo">
              <label htmlFor="nome" className="adm-rotulo">Nome do animal</label>
              <input
                id="nome"
                name="nome"
                defaultValue={animal.nome}
                required
                minLength={2}
                className="adm-input"
              />
            </div>

            <div className="adm-campo">
              <label htmlFor="especie" className="adm-rotulo">Espécie</label>
              <select
                id="especie"
                name="especie"
                defaultValue={animal.especie}
                required
                className="adm-input"
              >
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className="adm-campo">
              <label htmlFor="idade" className="adm-rotulo">Idade (em anos)</label>
              <input
                id="idade"
                name="idade"
                type="number"
                min={0}
                max={100}
                step={1}
                defaultValue={animal.idade}
                required
                className="adm-input"
              />
            </div>

            <div className="adm-campo">
              <label htmlFor="sexo" className="adm-rotulo">Sexo</label>
              <select
                id="sexo"
                name="sexo"
                defaultValue={animal.sexo}
                required
                className="adm-input"
              >
                <option value="Não informado">Não informado</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
            </div>

            <div className="adm-campo">
              <label htmlFor="porte" className="adm-rotulo">Porte</label>
              <select
                id="porte"
                name="porte"
                defaultValue={animal.porte}
                required
                className="adm-input"
              >
                <option value="Pequeno">Pequeno</option>
                <option value="Médio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </div>

            <div className="adm-campo">
              <label htmlFor="status" className="adm-rotulo">Status</label>
              <select
                id="status"
                name="status"
                defaultValue={animal.status}
                required
                className="adm-input"
              >
                <option value="disponivel">Disponível</option>
                <option value="adotado">Adotado</option>
              </select>
            </div>

            <div className="adm-campo adm-full">
              <AnimalFotoInput fotoInicial={animal.fotoUrl} />
            </div>

            <div className="adm-campo adm-full">
              <label htmlFor="descricao" className="adm-rotulo">Descrição</label>
              <textarea
                id="descricao"
                name="descricao"
                defaultValue={animal.descricao}
                required
                minLength={10}
                rows={5}
                className="adm-input"
              />
            </div>

            <div className="adm-form-acoes adm-full">
              <Link href="/admin" className="adm-btn adm-btn-contorno">
                Cancelar
              </Link>
              <button type="submit" className="adm-btn adm-btn-primario">
                Salvar alterações
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}