
import Link from "next/link";
import { exigirAdmin } from "@/lib/sessao";
import { cadastrarAnimal } from "../actions";
import "./novo-animal.css";
import AnimalFotoInput from "../AnimalFotoInput";
import AnimalCadastroForm from "../AnimalCadastroForm";

export default async function NovoAnimalPage() {
  await exigirAdmin();

  return (
    <main className="novo-animal-page">
      <header className="novo-animal-hero">
        <div className="novo-animal-container novo-animal-cabecalho">
          <p className="novo-animal-etapa">
            PAINEL DA ONG · CADASTRO DE ANIMAL
          </p>

          <h1>Vamos encontrar um lar para ele.</h1>

          <p>
            Preencha as informações do animal para apresentá-lo
            às pessoas que procuram uma adoção responsável.
          </p>
        </div>
      </header>

      <section className="novo-animal-conteudo">
        <div className="novo-animal-container">
          <section className="novo-animal-card">
            <p className="novo-animal-subtitulo">DADOS DO ANIMAL</p>

            <h2 className="novo-animal-titulo-secao">
              Cadastro de animal
            </h2>

            <AnimalCadastroForm
              action={cadastrarAnimal}
              className="novo-animal-formulario"
            >
              <div className="novo-animal-campo">
                <label htmlFor="nome">Nome do animal</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Ex.: Mel"
                  minLength={2}
                  required
                />
              </div>

              <div className="novo-animal-campo">
                <label htmlFor="especie">Espécie</label>
                <select
                  id="especie"
                  name="especie"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className="novo-animal-campo">
                <label htmlFor="idade">Idade (em anos)</label>
                <input
                  id="idade"
                  name="idade"
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  placeholder="Ex.: 2"
                  required
                />
              </div>

              <div className="novo-animal-campo">
                <label htmlFor="sexo">Sexo</label>
                <select
                  id="sexo"
                  name="sexo"
                  defaultValue="Não informado"
                  required
                >
                  <option value="Não informado">Não informado</option>
                  <option value="Macho">Macho</option>
                  <option value="Fêmea">Fêmea</option>
                </select>
              </div>

              <div className="novo-animal-campo">
                <label htmlFor="porte">Porte</label>
                <select
                  id="porte"
                  name="porte"
                  defaultValue="Médio"
                  required
                >
                  <option value="Pequeno">Pequeno</option>
                  <option value="Médio">Médio</option>
                  <option value="Grande">Grande</option>
                </select>
              </div>

              <div className="novo-animal-campo">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  defaultValue="disponivel"
                  required
                >
                  <option value="disponivel">Disponível</option>
                  <option value="adotado">Adotado</option>
                </select>
              </div>

              <div className="novo-animal-campo novo-animal-campo-largo">
                <AnimalFotoInput />
                <p className="novo-animal-ajuda">
                  Selecione uma imagem de até 2 MB ou informe uma URL pública.
                </p>
              </div>

              <div className="novo-animal-campo novo-animal-campo-largo">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  placeholder="Conte um pouco sobre a personalidade e a história do animal..."
                  minLength={10}
                  required
                />
              </div>

              <div className="novo-animal-acoes novo-animal-campo-largo">
                <Link
                  href="/admin"
                  className="novo-animal-botao novo-animal-botao-secundario"
                >
                  Cancelar
                </Link>

                <button
                  type="submit"
                  className="novo-animal-botao novo-animal-botao-principal"
                >
                  Cadastrar animal →
                </button>
              </div>
            </AnimalCadastroForm>
          </section>
        </div>
      </section>
    </main>
  );
}
