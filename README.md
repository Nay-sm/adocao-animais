# Adote um Focinho

**Nicho:** Adoção de animais (ONG protetora) · **Grupo:** <nº da planilha>
**Dupla:** <Nome Nayara de Souza Moraes> (@Nay-sm) · <Nome Sulamita dos Santos Nascimento> (@<usuario-github-da-sulamita>)
**Sistema no ar:** https://adocao-animais-jade.vercel.app

## O que o sistema faz

Plataforma web de uma ONG protetora de animais. Visitantes veem os animais disponíveis e buscam por nome ou espécie. Adotantes criam conta, entram e enviam pedidos de adoção. Administradores cadastram, editam e excluem animais (com foto) e aprovam ou rejeitam os pedidos.

## Páginas para testar

- Pública: `/`
- Busca (exemplo que encontra algo): `/?busca=Cachorro`
- Cadastro e login: `/cadastro` e `/login`
- Protegida (pede login de administrador): `/admin`
- Protegida (pedidos de adoção, só admin): `/admin/pedidos`
- Versão publicada: `/api/versao`

## Banco de dados

PostgreSQL no Neon, acessado pelo Prisma 7. Migrations em `prisma/migrations`.

- **User** (id, name, email, role `adotante`/`admin`, ...): criado pelo Better Auth. Tabelas auxiliares: Session, Account e Verification.
- **Animal** (id, nome, especie, sexo, porte, idade, descricao, fotoUrl, status `disponivel`/`adotado`, responsavelId): o animal é cadastrado por um admin.
- **PedidoAdocao** (id, usuarioId, animalId, telefone, moradia, experiencia, motivo, status `pendente`/`aprovado`/`rejeitado`): cada usuário só pode pedir o mesmo animal uma vez.

Relações 1 para N: User → Animal, User → PedidoAdocao e Animal → PedidoAdocao.

## Como rodar no computador

1. `git clone https://github.com/Nay-sm/adocao-animais.git` e `cd adocao-animais`
2. `npm install`
3. Copie `.env.example` para `.env` e preencha os valores.
4. `npx prisma migrate dev` e `npx prisma generate`
5. `npm run dev` e abra http://localhost:3000

## Como usamos a IA

- **IA usada:** Claude (Anthropic).
- **Os 3 pedidos (prompts) que mais ajudaram:**
  1. O prompt-mestre inicial, com a stack, as versões fixas e os fatos técnicos do Prisma 7 e do Better Auth, pedindo o planejamento antes de qualquer código.
  2. "Antes de criar o banco, analise conosco o modelo de dados", que gerou a modelagem de Animal e PedidoAdocao e os papéis adotante/admin.
  3. "Ligue a interface da página inicial ao banco e ao login real", que dividiu o `page.tsx` em Server Component e Client Component.
- **Um erro da IA que percebemos e como corrigimos:** a interface da página inicial (`app/page.tsx`) simulava login, cadastro e pedido de adoção com `localStorage`, então nada era gravado no banco. Percebemos quando a contagem de usuários no Neon não subia. Corrigimos movendo o código visual para `app/HomeClient.tsx` e criando um novo `app/page.tsx` (Server Component) que lê a sessão e os animais do banco com o Prisma. O `lib/auth.ts` também não declarava o campo `role`; acrescentamos `additionalFields.role` com `input: false` para ninguém se cadastrar como admin.
- **O que aprendemos:** que a autorização precisa ser conferida no servidor (`exigirAdmin`), que o Prisma 7 exige `prisma generate` depois da migration, que variáveis de ambiente só valem no deploy seguinte e que é preciso testar de ponta a ponta antes de aceitar o que a IA diz que funciona.