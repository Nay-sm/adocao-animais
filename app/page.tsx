"use client";

import { FormEvent, type CSSProperties, useEffect, useState } from "react";

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

      "Pipoca é uma personagem fictícia criada para demonstrar a plataforma. Futuramente, seu perfil poderá conter informações reais fornecidas pelo responsável pelo animal.",

  },

];

type Animal = (typeof animais)[number];

type Usuario = { nome: string; email: string };

type TipoAcesso = "login" | "cadastro" | null;

const modalFundo: CSSProperties = {

  position: "fixed",

  inset: 0,

  zIndex: 200,

  display: "grid",

  placeItems: "center",

  padding: 16,

  background: "rgba(23, 42, 18, 0.68)",

};

const modalCaixa: CSSProperties = {

  position: "relative",

  width: "100%",

  maxWidth: 520,

  maxHeight: "90vh",

  overflowY: "auto",

  padding: 30,

  borderRadius: 22,

  background: "var(--branco, #fffefa)",

  color: "var(--marrom, #58483d)",

  boxShadow: "0 20px 70px rgba(0,0,0,.18)",

};

const campoEstilo: CSSProperties = {

  width: "100%",

  minHeight: 46,

  padding: "11px 13px",

  border: "1px solid #dcd8cc",

  borderRadius: 10,

  background: "white",

  color: "#58483d",

  font: "inherit",

};

const labelEstilo: CSSProperties = {

  display: "grid",

  gap: 6,

  marginBottom: 14,

  fontSize: 13,

  fontWeight: 700,

};

export default function Home() {

  const [slideAtual, setSlideAtual] = useState(0);

  const [mostrarHistoria, setMostrarHistoria] = useState(false);

  const [animalSelecionado, setAnimalSelecionado] = useState<Animal | null>(null);

  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [telaAcesso, setTelaAcesso] = useState<TipoAcesso>(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [aviso, setAviso] = useState("");

  useEffect(() => {

    try {

      const salvo = localStorage.getItem("adote-um-focinho-sessao-demo");

      if (salvo) setUsuario(JSON.parse(salvo) as Usuario);

    } catch {

      localStorage.removeItem("adote-um-focinho-sessao-demo");

    }

  }, []);

  const slide = slides[slideAtual];

  function mudarSlide(indice: number) {

    setSlideAtual((indice + slides.length) % slides.length);

  }

  function iniciarAdocao() {
    setAviso("");

    // Mantém o animal escolhido enquanto a pessoa faz login.
    if (!usuario) {
      setTelaAcesso("login");
      return;
    }

    setMostrarFormulario(true);
  }

  function entrar(evento: FormEvent<HTMLFormElement>) {

    evento.preventDefault();

    const dados = new FormData(evento.currentTarget);

    const email = String(dados.get("email") || "").trim();

    const senha = String(dados.get("senha") || "");

    const nomeDigitado = String(dados.get("nome") || "").trim();

    if (!email || !senha || (telaAcesso === "cadastro" && !nomeDigitado)) {

      setAviso("Preencha todos os campos para continuar.");

      return;

    }

    const novoUsuario = {

      nome: telaAcesso === "cadastro" ? nomeDigitado : email.split("@")[0],

      email,

    };

    setUsuario(novoUsuario);

    localStorage.setItem(

      "adote-um-focinho-sessao-demo",

      JSON.stringify(novoUsuario),

    );

    setTelaAcesso(null);
    setAviso("");

    // Depois do login/cadastro, continua automaticamente a adoção escolhida.
    if (animalSelecionado) {
      setMostrarFormulario(true);
    }
  }

  function sair() {

    localStorage.removeItem("adote-um-focinho-sessao-demo");

    setUsuario(null);

    setAviso("Você saiu da conta demonstrativa.");

  }

  function enviarRequerimento(evento: FormEvent<HTMLFormElement>) {

    evento.preventDefault();

    const dados = new FormData(evento.currentTarget);

    const requerimento = {

      animal: animalSelecionado?.nome,

      usuario,

      telefone: String(dados.get("telefone") || ""),

      moradia: String(dados.get("moradia") || ""),

      experiencia: String(dados.get("experiencia") || ""),

      motivo: String(dados.get("motivo") || ""),

      enviadoEm: new Date().toISOString(),

    };

    const anteriores = JSON.parse(

      localStorage.getItem("adote-um-focinho-requerimentos-demo") || "[]",

    ) as typeof requerimento[];

    localStorage.setItem(

      "adote-um-focinho-requerimentos-demo",

      JSON.stringify([...anteriores, requerimento]),

    );

    setMostrarFormulario(false);

    setAnimalSelecionado(null);

    setAviso(

      "Requerimento salvo nesta demonstração! Ele ainda não foi enviado ao ADM: isso depende da integração com o banco de dados e o backend.",

    );

  }

  if (mostrarFormulario && animalSelecionado) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#fffefa",
          color: "#58483d",
          fontFamily: "inherit",
        }}
      >
        <header
          style={{
            minHeight: 82,
            padding: "18px clamp(20px, 6vw, 80px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            borderBottom: "1px solid #e9e5db",
            background: "#fffefa",
          }}
        >
          <a
            href="#inicio"
            onClick={(evento) => {
              evento.preventDefault();
              setMostrarFormulario(false);
              setAnimalSelecionado(null);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#33562b",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: 20,
            }}
          >
            <span style={{ fontSize: 28, color: "#d88770" }}>♥</span>
            <span>adote <small style={{ display: "block", fontWeight: 500, fontSize: 12 }}>um focinho</small></span>
          </a>
          <button
            type="button"
            onClick={() => setMostrarFormulario(false)}
            style={{
              border: "1px solid #d8ddcf",
              borderRadius: 999,
              background: "transparent",
              color: "#33562b",
              padding: "11px 17px",
              cursor: "pointer",
              font: "inherit",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            ← Voltar
          </button>
        </header>

        <section
          style={{
            background: "#f3f0e8",
            padding: "clamp(32px, 6vw, 70px) 24px",
          }}
        >
          <div style={{ width: "min(100%, 850px)", margin: "0 auto" }}>
            <span className="etiqueta">ETAPA FINAL · PEDIDO DE ADOÇÃO</span>
            <h1
              style={{
                margin: "14px 0 12px",
                color: "#33562b",
                fontSize: "clamp(32px, 5vw, 48px)",
                lineHeight: 1.12,
                letterSpacing: "-1px",
              }}
            >
              Vamos conhecer você melhor.
            </h1>
            <p style={{ margin: 0, maxWidth: 650, lineHeight: 1.8, color: "#756b60" }}>
              Essas informações ajudam a entender seu ambiente e a preparar uma adoção responsável.
              Preencha tudo com sinceridade.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                marginTop: 26,
                padding: "10px 16px 10px 10px",
                borderRadius: 999,
                background: "#fffefa",
              }}
            >
              <img
                src={animalSelecionado.imagem}
                alt={animalSelecionado.alt}
                style={{ width: 54, height: 54, borderRadius: "50%", objectFit: "cover" }}
              />
              <span>
                <small style={{ display: "block", color: "#81786e", marginBottom: 3 }}>Você quer adotar</small>
                <strong style={{ color: "#33562b" }}>{animalSelecionado.nome}</strong>
                <span style={{ color: "#81786e" }}> · {animalSelecionado.tipo}</span>
              </span>
            </div>
          </div>
        </section>

        <section style={{ padding: "clamp(30px, 5vw, 58px) 24px 70px" }}>
          <div style={{ width: "min(100%, 850px)", margin: "0 auto" }}>
            <div style={{ marginBottom: 28 }}>
              <span className="etiqueta">SEUS DADOS</span>
              <h2 style={{ color: "#33562b", fontSize: 25, margin: "10px 0 8px" }}>
                Pedido de adoção
              </h2>
              <p style={{ color: "#81786e", fontSize: 14, margin: 0 }}>
                Conta: {usuario?.email}
              </p>
            </div>

            <form onSubmit={enviarRequerimento}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                  columnGap: 28,
                  rowGap: 8,
                }}
              >
                <label style={labelEstilo}>
                  Telefone para contato
                  <input
                    name="telefone"
                    type="tel"
                    autoComplete="tel"
                    required
                    style={campoEstilo}
                    placeholder="(00) 00000-0000"
                  />
                </label>

                <label style={labelEstilo}>
                  Como é sua moradia?
                  <select name="moradia" required defaultValue="" style={campoEstilo}>
                    <option value="" disabled>Selecione uma opção</option>
                    <option>Casa própria</option>
                    <option>Casa alugada</option>
                    <option>Apartamento</option>
                    <option>Outra situação</option>
                  </select>
                </label>

                <label style={labelEstilo}>
                  Você já cuidou de um animal antes?
                  <select name="experiencia" required defaultValue="" style={campoEstilo}>
                    <option value="" disabled>Selecione uma opção</option>
                    <option>Sim</option>
                    <option>Não, será minha primeira experiência</option>
                  </select>
                </label>
              </div>

              <label style={{ ...labelEstilo, marginTop: 10 }}>
                Por que deseja adotar este animal?
                <textarea
                  name="motivo"
                  required
                  minLength={10}
                  rows={5}
                  style={{ ...campoEstilo, resize: "vertical" }}
                  placeholder="Conte por que deseja adotar e como pretende cuidar dele."
                />
              </label>

              <div
                style={{
                  marginTop: 28,
                  paddingTop: 24,
                  borderTop: "1px solid #e9e5db",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 18,
                  flexWrap: "wrap",
                }}
              >
                <p style={{ margin: 0, maxWidth: 440, color: "#81786e", fontSize: 12, lineHeight: 1.6 }}>
                  Modo de demonstração escolar: o pedido ficará salvo somente neste navegador.
                </p>
                <button
                  type="submit"
                  className="botao botao-principal"
                  style={{ minWidth: 210 }}
                >
                  Enviar pedido →
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    );
  }

  return (
    <>

      <header className="header">

        <a href="#inicio" className="logo" aria-label="Adote um Focinho - início">

          <span className="logo-icon">♥</span>

          <span>adote <small>um focinho</small></span>

        </a>

        <nav>

          <a href="#inicio">Início</a>

          <a href="#animais">Adote</a>

          <a href="#como-funciona">Como Adotar</a>

          <a href="#sobre">Sobre nós</a>

        </nav>

        <button

          type="button"

          className="botao botao-contorno"

          onClick={() => {

            if (usuario) {

              document.getElementById("animais")?.scrollIntoView({ behavior: "smooth" });

            } else {

              setAviso("");

              setTelaAcesso("login");

            }

          }}

        >

          {usuario ? `Olá, ${usuario.nome}` : "Quero adotar ↗"}

        </button>

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

                      style={{ color: indice === 2 ? "#D88770" : "#33562bea" }}

                    >

                      {linha}

                      {indice < slide.linhas.length - 1 && <br />}

                    </span>

                  ))}

                </h1>

                <p>{slide.descricao}</p>

                <div className="mensagem">

                  <span>🐶 🐱 🐾</span>

                  <p><strong>{slide.mensagem}</strong><br />{slide.complemento}</p>

                </div>

              </div>

              <div className="hero-imagem">

                <img src={slide.imagem} alt={slide.alt} />

                <div className="aviso">

                  <span>♡</span>

                  <div><strong>{slide.aviso}</strong><small>{slide.detalhe}</small></div>

                </div>

              </div>

            </article>

          </div>

          <div className="hero-controles">

            <button className="hero-seta" onClick={() => mudarSlide(slideAtual - 1)} aria-label="Informação anterior" type="button">←</button>

            <div className="hero-indicadores">

              {slides.map((item, indice) => (

                <button

                  key={item.etiqueta}

                  className={`hero-indicador ${indice === slideAtual ? "ativo" : ""}`}

                  onClick={() => mudarSlide(indice)}

                  aria-label={`Slide ${indice + 1}`}

                  aria-current={indice === slideAtual ? "true" : undefined}

                  type="button"

                />

              ))}

            </div>

            <span className="hero-contador"><span>{String(slideAtual + 1).padStart(2, "0")}</span> / 04</span>

            <button className="hero-seta" onClick={() => mudarSlide(slideAtual + 1)} aria-label="Próxima informação" type="button">→</button>

          </div>

        </section>

        <section className="animais" id="animais">

          <div className="titulo-secao">

            <span className="etiqueta">Encontre seu companheiro</span>

            <h2>Um focinho, <span>uma nova história.</span></h2>

            <p>Conheça nossos amigos e descubra quem pode fazer parte da sua família.</p>

          </div>

          <div className="grade-animais">

            {animais.map((animal) => (

              <article className="card-animal" key={animal.nome}>

                <img src={animal.imagem} alt={animal.alt} />

                <div className="card-conteudo">

                  <span className="status">{animal.tipo}</span>

                  <h3>{animal.nome}</h3>

                  <p>{animal.descricao.split(".")[0]}.</p>

                  <div className="detalhes"><span>{animal.idade}</span><span>{animal.sexo}</span></div>

                  <button className="botao botao-card" type="button" onClick={() => { setAviso(""); setAnimalSelecionado(animal); }}>

                    Conhecer {animal.nome} <span aria-hidden="true">→</span>

                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>

        <section className="jornada-adocao" id="como-funciona">

          <div className="titulo-secao">

            <span className="etiqueta">Sua jornada começa aqui</span>

            <h2>Adotar é simples, <span>mas muda tudo.</span></h2>

            <p>Siga os passos e prepare-se para receber um novo amigo na sua vida.</p>

          </div>

          <div className="jornada-grade">

            <article className="jornada-card jornada-verde"><span className="jornada-numero">01</span><span className="jornada-icone">♡</span><h3>Faça seu login</h3><p>Crie sua conta na plataforma para iniciar sua jornada de adoção.</p></article>

            <article className="jornada-card jornada-bege"><span className="jornada-numero">02</span><span className="jornada-icone">🐾</span><h3>Encontre seu amigo</h3><p>Explore os perfis disponíveis e encontre um companheiro que combine com sua rotina.</p></article>

            <article className="jornada-card jornada-rosa"><span className="jornada-numero">03</span><span className="jornada-icone">📝</span><h3>Preencha seus dados</h3><p>Informe seus dados com sinceridade e responsabilidade para ajudar no processo.</p></article>

            <article className="jornada-card jornada-lilas"><span className="jornada-numero">04</span><span className="jornada-icone">✉</span><h3>Aguarde o contato</h3><p>A equipe responsável analisará sua solicitação e orientará sobre as próximas etapas.</p></article>

            <article className="jornada-card jornada-amarelo"><span className="jornada-numero">05</span><span className="jornada-icone">♥</span><h3>Comece uma história</h3><p>Prepare um espaço seguro e ofereça cuidado, paciência e carinho.</p></article>

          </div>

          <div className="jornada-final"><span>♡</span><p><strong>Adotar é um compromisso para a vida toda.</strong><br />Um novo amigo merece cuidado, respeito e amor todos os dias.</p></div>

        </section>

        <section className="sobre" id="sobre">

          <div className="sobre-imagem"><img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=85" alt="Pessoa fazendo carinho em um cachorro" /></div>

          <div className="sobre-texto">

            <span className="etiqueta">Mais que uma plataforma</span>

            <h2>Todo focinho merece um <span>final feliz.</span></h2>

            <p>O Adote um Focinho nasceu para aproximar animais que precisam de um lar de pessoas prontas para oferecer cuidado, respeito e amor.</p>

            <p>Cada adoção é uma nova chance. A mudança começa quando alguém decide abrir espaço no coração.</p>

            <button type="button" className="botao botao-claro" onClick={() => setMostrarHistoria(true)}>Conheça nossa missão →</button>

          </div>

        </section>

      </main>

      <footer id="contato">

        <a href="#inicio" className="logo"><span className="logo-icon">♥</span><span>adote <small>um focinho</small></span></a>

        <p>Conectando corações, transformando vidas.</p>

        <a href="mailto:contato@adoteumfocinho.com.br">Entre em contato ↗</a>

        <div className="rodape-final">© 2026 Adote um Focinho · Feito com carinho ♡</div>

      </footer>

      {aviso && (

        <div role="status" style={{ position: "fixed", zIndex: 250, bottom: 20, left: "50%", transform: "translateX(-50%)", width: "min(92%, 650px)", padding: "16px 20px", borderRadius: 14, background: "#fffefa", color: "#33562b", border: "1px solid #dce1d5", boxShadow: "0 10px 35px #0002", fontSize: 14 }}>

          {aviso}

          <button type="button" onClick={() => setAviso("")} aria-label="Fechar aviso" style={{ float: "right", marginLeft: 12, border: 0, background: "transparent", cursor: "pointer", fontSize: 20 }}>×</button>

        </div>

      )}

      {usuario && (

        <button type="button" onClick={sair} style={{ position: "fixed", right: 16, bottom: 16, zIndex: 80, border: "1px solid #dce1d5", borderRadius: 12, padding: "10px 14px", background: "#fffefa", color: "#33562b", cursor: "pointer", fontSize: 12 }}>

          Sair da conta demo

        </button>

      )}

      {telaAcesso && (

        <div style={modalFundo} onClick={() => setTelaAcesso(null)}>

          <section role="dialog" aria-modal="true" aria-labelledby="acesso-titulo" style={modalCaixa} onClick={(evento) => evento.stopPropagation()}>

            <button type="button" onClick={() => setTelaAcesso(null)} aria-label="Fechar" style={{ position: "absolute", top: 12, right: 14, border: 0, background: "transparent", color: "#58483d", cursor: "pointer", fontSize: 28 }}>×</button>

            <span className="etiqueta">Adote um Focinho 🐾</span>

            <h2 id="acesso-titulo" style={{ margin: "12px 0", color: "#33562b", fontSize: 29 }}>{telaAcesso === "login" ? "Que bom ter você aqui!" : "Crie sua conta"}</h2>

            <p style={{ marginBottom: 22, fontSize: 14, color: "#81786e" }}>{telaAcesso === "login" ? "Entre para continuar o processo de adoção." : "Preencha os dados para iniciar sua jornada."}</p>

            <form onSubmit={entrar}>

              {telaAcesso === "cadastro" && <label style={labelEstilo}>Nome completo<input name="nome" autoComplete="name" required style={campoEstilo} placeholder="Como podemos te chamar?" /></label>}

              <label style={labelEstilo}>E-mail<input name="email" type="email" autoComplete="email" required style={campoEstilo} placeholder="seuemail@exemplo.com" /></label>

              <label style={labelEstilo}>Senha<input name="senha" type="password" autoComplete={telaAcesso === "login" ? "current-password" : "new-password"} minLength={4} required style={campoEstilo} placeholder="Digite uma senha" /></label>

              <button type="submit" className="botao botao-principal" style={{ width: "100%", marginTop: 4 }}>{telaAcesso === "login" ? "Entrar" : "Criar conta"} →</button>

            </form>

            <p style={{ marginTop: 20, textAlign: "center", fontSize: 13 }}>

              {telaAcesso === "login" ? "Ainda não tem conta? " : "Já tem uma conta? "}

              <button type="button" onClick={() => setTelaAcesso(telaAcesso === "login" ? "cadastro" : "login")} style={{ border: 0, background: "transparent", color: "#49613c", fontWeight: 800, textDecoration: "underline", cursor: "pointer" }}>

                {telaAcesso === "login" ? "Cadastre-se" : "Fazer login"}

              </button>

            </p>

            <p style={{ marginTop: 16, padding: 12, borderRadius: 10, background: "#f3f0e8", color: "#81786e", fontSize: 11 }}>Modo de demonstração escolar: esta tela não valida contas reais. A autenticação real deve ser conectada ao backend.</p>

          </section>

        </div>

      )}

      {animalSelecionado && !mostrarFormulario && !telaAcesso && (

        <div style={modalFundo} onClick={() => setAnimalSelecionado(null)}>

          <section role="dialog" aria-modal="true" aria-labelledby="animal-titulo" style={modalCaixa} onClick={(evento) => evento.stopPropagation()}>

            <button type="button" onClick={() => setAnimalSelecionado(null)} aria-label="Fechar detalhes" style={{ position: "absolute", top: 12, right: 14, border: 0, background: "transparent", color: "#58483d", cursor: "pointer", fontSize: 28 }}>×</button>

            <img src={animalSelecionado.imagem} alt={animalSelecionado.alt} style={{ width: "100%", height: 230, objectFit: "cover", borderRadius: 15, marginBottom: 20 }} />

            <span className="status">{animalSelecionado.tipo}</span>

            <h2 id="animal-titulo" style={{ margin: "12px 0 6px", color: "#33562b", fontSize: 30 }}>{animalSelecionado.nome}</h2>

            <p style={{ marginBottom: 12, color: "#81786e", fontSize: 13 }}>{animalSelecionado.idade} · {animalSelecionado.sexo}</p>

            <p style={{ fontSize: 14, lineHeight: 1.7 }}>{animalSelecionado.descricao}</p>

            <button type="button" className="botao botao-principal" style={{ width: "100%" }} onClick={iniciarAdocao}>Quero adotar {animalSelecionado.nome} ♡</button>

            <p style={{ marginTop: 12, color: "#81786e", fontSize: 11 }}>Os perfis exibidos são ilustrativos para a apresentação do projeto.</p>

          </section>

        </div>

      )}

      {mostrarHistoria && (

        <div style={modalFundo} onClick={() => setMostrarHistoria(false)}>

          <section role="dialog" aria-modal="true" aria-labelledby="historia-titulo" style={modalCaixa} onClick={(evento) => evento.stopPropagation()}>

            <button type="button" onClick={() => setMostrarHistoria(false)} aria-label="Fechar história" style={{ position: "absolute", top: 12, right: 14, border: 0, background: "transparent", color: "#58483d", cursor: "pointer", fontSize: 28 }}>×</button>

            <span className="etiqueta">Nossa história — Adote um Focinho 🐾</span>

            <h2 id="historia-titulo" style={{ margin: "14px 0", color: "#33562b", fontSize: 29 }}>Todo focinho merece um lar ♡</h2>

            <p style={{ marginBottom: 14 }}>O Adote um Focinho nasceu como um projeto escolar desenvolvido por alunas do 3º ano do ensino médio integrado ao curso técnico do Instituto Federal do Espírito Santo (IFES) — Campus de Alegre. A proposta une os conhecimentos de programação a uma causa que merece atenção: a adoção responsável de animais.</p>

            <p style={{ marginBottom: 14 }}>Buscamos criar uma plataforma que facilite o contato entre pessoas interessadas em adotar e animais que precisam de um lar, oferecendo um espaço organizado para conhecer os animais e compreender as etapas do processo.</p>

            <p style={{ marginBottom: 22 }}>Mais do que desenvolver um site, queremos mostrar como a tecnologia pode incentivar atitudes positivas. A adoção deve ser uma decisão consciente, baseada em respeito, compromisso e cuidado durante toda a vida do animal.</p>

            <button type="button" className="botao botao-principal" onClick={() => { setMostrarHistoria(false); document.getElementById("animais")?.scrollIntoView({ behavior: "smooth" }); }}>Quero conhecer os animais ♡</button>

          </section>

        </div>

      )}

    </>

  );

}
