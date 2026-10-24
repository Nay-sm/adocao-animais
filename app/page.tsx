
"use client";

import { useState } from "react";

const slides = [
  {
    etiqueta: "A amizade muda tudo",
    linhas: ["Adotar é dar", "uma nova chance", "ao amor."],
    descricao:
      "A adoção responsável transforma vidas. Mais do que acolher um animal, é oferecer segurança, carinho e um lar para chamar de seu.",
    mensagem: "Uma nova história começa aqui.",
    complemento: "Todo focinho merece amor.",
    imagem:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=85",
    alt: "Cachorro à espera de um lar",
    aviso: "Amor de verdade",
    detalhe: "Não se compra. Se encontra.",
  },
  {
    etiqueta: "Antes de adotar",
    linhas: ["Um novo amigo", "precisa de", "compromisso."],
    descricao:
      "Avalie sua rotina, seu espaço e os custos com alimentação, vacinas e cuidados veterinários. Adotar é uma decisão que envolve toda a família.",
    mensagem: "Prepare seu lar e seu coração.",
    complemento: "Responsabilidade também é amor.",
    imagem:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1000&q=85",
    alt: "Pessoa interagindo com um cachorro",
    aviso: "Adote com consciência",
    detalhe: "Um compromisso para a vida.",
  },
  {
    etiqueta: "Um novo começo",
    linhas: ["Cada adaptação", "acontece no", "seu tempo."],
    descricao:
      "Um novo ambiente pode causar insegurança. Ofereça paciência, rotina, um espaço seguro e carinho para que seu novo amigo aprenda a confiar.",
    mensagem: "Respeite o tempo dele.",
    complemento: "Confiança se constrói todos os dias.",
    imagem:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=85",
    alt: "Cachorro recebendo carinho",
    aviso: "Carinho e paciência",
    detalhe: "O amor também aprende.",
  },
  {
    etiqueta: "Para toda a vida",
    linhas: ["Não é só sobre", "encontrar um pet.", "É sobre família."],
    descricao:
      "Alimentação adequada, proteção, atenção e acompanhamento veterinário fazem parte de uma vida com bem-estar. Seu novo amigo dependerá de você por muitos anos.",
    mensagem: "Amor é cuidar todos os dias.",
    complemento: "A adoção é o começo da história.",
    imagem:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=85",
    alt: "Cachorro convivendo com uma pessoa",
    aviso: "Uma família para sempre",
    detalhe: "Cuidado, respeito e companheirismo.",
  },
];

const animais = [
  {
    nome: "Bento",
    tipo: "Cachorro",
    idade: "Idade a confirmar",
    sexo: "A confirmar",
    imagem:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=85",
    alt: "Foto ilustrativa de um cachorro caramelo",
    descricao:
      "Bento é um personagem fictício criado para demonstrar a plataforma. Em um cadastro real, aqui ficará sua história, personalidade e informações importantes.",
  },
  {
    nome: "Amora",
    tipo: "Gata",
    idade: "Idade a confirmar",
    sexo: "A confirmar",
    imagem:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=85",
    alt: "Foto ilustrativa de uma gata",
    descricao:
      "Amora é uma personagem fictícia criada para demonstrar a plataforma. Aqui serão apresentadas sua história, personalidade e necessidades de cuidado.",
  },
  {
    nome: "Pipoca",
    tipo: "Cachorro",
    idade: "Idade a confirmar",
    sexo: "A confirmar",
    imagem:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=85",
    alt: "Foto ilustrativa de um cachorro",
    descricao:
      "Pipoca é um personagem fictício criado para demonstrar a plataforma. Futuramente, seu perfil poderá conter informações reais fornecidas pelo responsável pelo animal.",
  },
];

export default function Home() {
  const [slideAtual, setSlideAtual] = useState(0);
  const [animalSelecionado, setAnimalSelecionado] =
    useState<(typeof animais)[number] | null>(null);

  const slide = slides[slideAtual];

  function mudarSlide(indice: number) {
    setSlideAtual((indice + slides.length) % slides.length);
  }

  return (
    <>
      <header className="header">
        <a href="#inicio" className="logo">
          <span className="logo-icon">♥</span>
          <span>
            adote <small>um focinho</small>
          </span>
        </a>

        <nav>
          <a href="#inicio">Início</a>
          <a href="#animais">Adote</a>
          <a href="#como-funciona">Como Adotar</a>
          <a href="#sobre">Sobre nós</a>
        </nav>

        <a href="#animais" className="botao botao-contorno">
          Quero adotar ↗
        </a>
      </header>

      <main>
        <section className="hero hero-carrossel" id="inicio">
          <div className="hero-slides">
            <article className="hero-slide ativo" key={slideAtual}>
              <div className="hero-texto">
                <span className="etiqueta">{slide.etiqueta}</span>

                <h1>
                  {slide.linhas.map((linha, indice) => (
                    <span
                      key={linha}
                     style={{
                      color: indice === 2 ? "#D88770" : "#33562bea",
                      }}
                    >
                      {linha}
                      {indice < slide.linhas.length - 1 && <br />}
                    </span>
                  ))}
                </h1>

                <p>{slide.descricao}</p>

                <div className="mensagem">
                  <span>🐶 🐱 🐾</span>
                  <p>
                    <strong>{slide.mensagem}</strong>
                    <br />
                    {slide.complemento}
                  </p>
                </div>
              </div>

              <div className="hero-imagem">
                <img src={slide.imagem} alt={slide.alt} />

                <div className="aviso">
                  <span>♡</span>
                  <div>
                    <strong>{slide.aviso}</strong>
                    <small>{slide.detalhe}</small>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="hero-controles">
            <button
              className="hero-seta"
              onClick={() => mudarSlide(slideAtual - 1)}
              aria-label="Informação anterior"
              type="button"
            >
              ←
            </button>

            <div className="hero-indicadores">
              {slides.map((item, indice) => (
                <button
                  key={item.etiqueta}
                  className={`hero-indicador ${
                    indice === slideAtual ? "ativo" : ""
                  }`}
                  onClick={() => mudarSlide(indice)}
                  aria-label={`Slide ${indice + 1}`}
                  aria-current={indice === slideAtual ? "true" : undefined}
                  type="button"
                />
              ))}
            </div>

            <span className="hero-contador">
              <span>{String(slideAtual + 1).padStart(2, "0")}</span> / 04
            </span>

            <button
              className="hero-seta"
              onClick={() => mudarSlide(slideAtual + 1)}
              aria-label="Próxima informação"
              type="button"
            >
              →
            </button>
          </div>
        </section>

        <section className="animais" id="animais">
          <div className="titulo-secao">
            <span className="etiqueta">Encontre seu companheiro</span>
            <h2>
              Um focinho, <span>uma nova história.</span>
            </h2>
            <p>
              Conheça nossos amigos e descubra quem pode fazer parte da sua
              família.
            </p>
          </div>

          <div className="grade-animais">
            {animais.map((animal) => (
              <article className="card-animal" key={animal.nome}>
                <img src={animal.imagem} alt={animal.alt} />

                <div className="card-conteudo">
                  <span className="status">{animal.tipo}</span>

                  <h3>{animal.nome}</h3>

                  <p>{animal.descricao.split(".")[0]}.</p>

                  <div className="detalhes">
                    <span>{animal.idade}</span>
                    <span>{animal.sexo}</span>
                  </div>

                  <button
                    className="botao botao-card"
                    type="button"
                    onClick={() => setAnimalSelecionado(animal)}
                  >
                    Conhecer {animal.nome}
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {animalSelecionado && (
          <div
            role="presentation"
            onClick={() => setAnimalSelecionado(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              display: "grid",
              placeItems: "center",
              padding: "20px",
              background: "rgba(23, 42, 18, 0.65)",
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="animal-titulo"
              onClick={(evento) => evento.stopPropagation()}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "520px",
                maxHeight: "90vh",
                overflowY: "auto",
                padding: "28px",
                borderRadius: "20px",
                background: "var(--branco)",
                color: "var(--marrom)",
              }}
            >
              <button
                type="button"
                onClick={() => setAnimalSelecionado(null)}
                aria-label="Fechar detalhes"
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "36px",
                  height: "36px",
                  border: "none",
                  borderRadius: "50%",
                  background: "var(--verde-claro)",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                ×
              </button>

              <img
                src={animalSelecionado.imagem}
                alt={animalSelecionado.alt}
                style={{
                  width: "100%",
                  height: "240px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  marginBottom: "20px",
                }}
              />

              <span className="etiqueta">Perfil demonstrativo</span>
              <h2
                id="animal-titulo"
                style={{
                  margin: "8px 0",
                  color: "var(--verde-escuro)",
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "30px",
                }}
              >
                {animalSelecionado.nome}
              </h2>

              <p style={{ marginBottom: "12px" }}>
                {animalSelecionado.descricao}
              </p>

              <div className="detalhes">
                <span>{animalSelecionado.tipo}</span>
                <span>{animalSelecionado.idade}</span>
                <span>{animalSelecionado.sexo}</span>
              </div>

              <p
                style={{
                  marginTop: "14px",
                  color: "var(--cinza)",
                  fontSize: "12px",
                }}
              >
                As informações são fictícias e servem apenas para demonstrar
                como os perfis dos animais poderão funcionar.
              </p>
            </section>
          </div>
        )}
      </main>
    </>
  );
}
