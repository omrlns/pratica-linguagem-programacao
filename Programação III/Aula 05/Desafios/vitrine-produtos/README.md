# Desafio Aula 05 - Vitrine de Produtos com Next.js, Axios, Tailwind CSS e Jest

Projeto desenvolvido como parte das atividades práticas da disciplina **Programação III** (Prática de Linguagem de Programação).

> 🌐 **Deploy na Vercel:** [https://vitrine-produtos-chi.vercel.app/](https://vitrine-produtos-chi.vercel.app/)

Aplicação web moderna desenvolvida com **Next.js 16 (App Router)** para consolidar na prática os fundamentos de desenvolvimento front-end corporativo: consumo de APIs RESTful externas com **Axios**, tipagem estática com **TypeScript**, estilização utilitária moderna com **Tailwind CSS v4**, otimizações nativas de imagens (`next/image`) e tipografia (`next/font`), gerenciamento de estados reativos (`useState`, `useEffect`, `useMemo`), e implementação de suítes de testes unitários automatizados com **Jest** e **Testing Library**.

---

## 📁 Estrutura de Arquivos

```text
vitrine-produtos/
├── __tests__/                          # Suíte de testes automatizados com Jest
│   └── formatters.test.ts              # Testes unitários para cálculo de desconto e formatação de moedas
├── app/                                # Estrutura de rotas baseada em diretórios (App Router)
│   ├── sobre/                          # Rota '/sobre'
│   │   └── page.tsx                    # Página estática com apresentação técnica e stack do projeto
│   ├── globals.css                     # Configuração global do Tailwind CSS v4 e temas base
│   ├── layout.tsx                      # Layout raiz (RootLayout), metadados, fontes e shell da aplicação
│   └── page.tsx                        # Página inicial '/' (Catálogo interativo com busca, filtros e modal)
├── components/                         # Componentes modulares e reutilizáveis
│   └── NavBar.tsx                      # Barra de navegação com detecção de rota ativa e glassmorphism
├── utils/                              # Funções utilitárias puras e lógica de negócio desacoplada
│   └── formatters.ts                   # Formatação de moeda em Real (BRL) e cálculo de descontos
├── eslint.config.mjs                   # Configuração de linting e regras de qualidade com ESLint 9
├── jest.config.ts                      # Configuração do Jest integrada ao compilador do Next.js
├── jest.setup.ts                       # Extensões de matchers do DOM (@testing-library/jest-dom)
├── next-env.d.ts                       # Declarações de tipos de ambiente providas pelo Next.js
├── next.config.ts                      # Configurações do Next.js (whitelist de domínios remotos para imagens)
├── package.json                        # Manifesto do projeto, scripts executáveis e dependências
├── package-lock.json                   # Trava determinística das versões exatas das dependências
├── postcss.config.mjs                  # Configuração do compilador PostCSS para Tailwind CSS v4
├── README.md                           # Documentação detalhada da aplicação
└── tsconfig.json                       # Configurações do compilador TypeScript e aliases de import (@/*)
```

---

## 🌊 Entrando em Águas Profundas: Da SPA Tradicional ao Framework de Produção

Dando continuidade à jornada iniciada no React com Vite (Aula 04), a **Aula 05** aborda a evolução para um framework *full-featured* de nível corporativo:

### 1. A Evolução Arquitetural: De React SPA (Vite) para Next.js 16 (App Router)
* **React Tradicional (Vite):** Todo o processamento de roteamento e renderização inicial ocorre exclusivamente no navegador do usuário a partir de um `index.html` vazio.
* **Next.js 16 com App Router:**
  * Roteamento nativo baseado no sistema de arquivos: pastas contendo `page.tsx` tornam-se rotas automáticas (`app/page.tsx` ➔ `/`, `app/sobre/page.tsx` ➔ `/sobre`).
  * O arquivo `layout.tsx` atua como casca persistente da aplicação: a `<NavBar />` e o rodapé não são remontados durante a navegação entre páginas.
  * Separação clara entre **Server Components** (renderizados eficientemente no servidor) e **Client Components** (`"use client"` no topo), acionados quando há necessidade de interatividade via hooks (`useState`, `useEffect`, `useMemo`), eventos do DOM ou APIs como `usePathname`.

### 2. TypeScript: Segurança de Tipos e Autodocumentação
* **Interfaces Estritas:** Criação do contrato `interface Produto`, mapeando os campos da API (`id`, `title`, `price`, `description`, `category`, `image`, `rating`).
* **Validação em Tempo de Compilação:** Previne acessos a propriedades inexistentes, argumentos incorretos em funções de cálculo e inconsistências entre componentes.

### 3. Consumo de APIs RESTful com Axios e o Ciclo Assíncrono
* **Axios vs. `fetch` Nativo:** O Axios realiza transformação automática de JSON, oferece tipagem genérica imediata (`axios.get<Produto[]>`), e rejeita a Promise diretamente em códigos HTTP de erro (fora de 2xx).
* **Prevenção de Race Conditions e Memory Leaks:** Uso do padrão de limpeza (*cleanup*) no `useEffect` com flag de controle (`let ativo = true; return () => { ativo = false; }`), impedindo que respostas assíncronas atrasadas tentem atualizar estados de componentes já desmontados.

### 4. Tratamento de Estados Assíncronos da Interface (O Triângulo de Estados)
1. **Carregando (*Loading State*):** Grid de **Skeletons Shimmer** com classe `animate-pulse`, preservando a harmonia visual e impedindo Cumulative Layout Shift (CLS).
2. **Sucesso (*Success State*):** Renderização limpa do catálogo dinâmico com contagem em tempo real e filtros ativos.
3. **Erro / Contingência (*Error Handling*):** Card de alerta amigável com botão de retry que executa `recarregarProdutos()` sem demandar recarregamento completo da página.

### 5. Tailwind CSS v4 & Design System Clean
* Motor moderno `@tailwindcss/postcss` com diretiva `@import "tailwindcss";` no `globals.css`.
* Paleta leve com fundo suave em tons de ardósia (`slate-50/70`), cartões brancos com bordas `border-slate-200/80` e acentos em índigo (`indigo-600`).
* Efeitos de profundidade e glassmorphism: `backdrop-blur-md`, superfícies translúcidas e sombras sutis.
* Grid responsivo progressivo: 1 coluna em mobile (`grid-cols-1`) até 4 colunas em desktops amplos (`lg:grid-cols-4`).

### 6. Otimizações Nativas do Next.js: Imagens e Tipografia
* **Componente `<Image />` (`next/image`):** Redimensionamento sob demanda, conversão para WebP/AVIF, lazy loading e controle de densidade via atributo `sizes`.
* **Whitelist em `next.config.ts`:** Segurança contra imagens remotas arbitrárias via `remotePatterns: [{ hostname: "fakestoreapi.com" }]`.
* **Tipografia Otimizada (`next/font/google`):** A fonte `Inter` é processada e auto-hospedada no build, eliminando requisições externas em tempo de execução.

### 7. Testes Automatizados com Jest e Testing Library
* Configuração do **Jest** integrado ao Next.js através de `next/jest.js` e ambiente `jsdom`.
* Validação rigorosa de funções de negócio desacopladas em [`formatters.test.ts`](./__tests__/formatters.test.ts) (formatação monetária e cálculos de desconto).

---

## 📋 Funcionalidades e Conceitos Implementados

### 1. Catálogo Dinâmico da FakeStore API
* **Arquivo:** [`app/page.tsx`](./app/page.tsx)
* Consumo assíncrono de 20 produtos da rota pública `https://fakestoreapi.com/products`.
* Cards informativos com nota média dos consumidores (`rating.rate`), quantidade de reviews e cálculo dinâmico de 10% de desconto à vista no Pix: `calcularDesconto(produto.price, 10)`.

---

### 2. Filtros Dinâmicos e Busca em Tempo Real
* **Arquivo:** [`app/page.tsx`](./app/page.tsx)
* Busca textual instantânea por título ou categoria com botão de limpeza rápida.
* Extração automática de categorias únicas a partir dos dados da API utilizando `useMemo` e `new Set(produtos.map(p => p.category))`.
* Tradução das categorias para português e tratamento de estado vazio (*Empty State*) quando nenhum produto satisfaz a busca.

---

### 3. Ordenação Multicritério com Otimização de Performance
* **Arquivo:** [`app/page.tsx`](./app/page.tsx)
* Cinco critérios de ordenação: Menor Preço, Maior Preço, Melhor Avaliação, Nome (A - Z) e Destaques (padrão).
* Processamento unificado de busca, filtro e ordenação protegido pelo Hook `useMemo`.

---

### 4. Modal Imersivo de Detalhes do Produto
* **Arquivo:** [`app/page.tsx`](./app/page.tsx)
* Ficha técnica completa aberta sobre a tela com animação fade-in e desfoque no fundo (`backdrop-blur-xs`).
* Renderização procedural de 5 estrelas baseada na nota do item, descrição com scroll dedicado e condições de parcelamento em até 3x sem juros.
* Fechamento ergonômico por clique fora do modal (`stopPropagation`) e suporte ao pressionamento da tecla **`Escape`**.

---

### 5. Barra de Navegação Global (`NavBar`)
* **Arquivo:** [`components/NavBar.tsx`](./components/NavBar.tsx)
* Fixação no topo (`sticky top-0`) com efeito glassmorphism translúcido.
* Detecção da rota ativa em tempo real via hook `usePathname()` com estilização condicional.
* Navegação instantânea client-side com `<Link href="...">`.

---

### 6. Página Institucional e Detalhamento da Stack (`/sobre`)
* **Arquivo:** [`app/sobre/page.tsx`](./app/sobre/page.tsx)
* Apresentação da arquitetura e cartões modulares das tecnologias empregadas (Next.js 16, Tailwind CSS v4, Axios, Jest, FakeStore API e Vercel).

---

### 7. Funções de Negócio Puras e Testes Unitários
* **Arquivos:** [`utils/formatters.ts`](./utils/formatters.ts) | [`__tests__/formatters.test.ts`](./__tests__/formatters.test.ts)
* `formatarPreco`: formatação estrita no padrão monetário brasileiro (`R$ 109,95`) via `Intl.NumberFormat` (`pt-BR`, `BRL`).
* `calcularDesconto`: cálculo de percentual com arredondamento seguro em 2 casas decimais e tratamento para descontos >= 100%.
* Testes cobrindo formatação, descontos padrão e cenários de borda.

---

## 🧠 Síntese dos Conceitos Praticados

| Conceito / Recurso | Sintaxe / Contexto | Papel Arquitetural no Projeto |
| :--- | :--- | :--- |
| **App Router** | `app/layout.tsx`, `app/page.tsx` | Roteamento baseado em pastas e layouts persistentes sem necessidade de bibliotecas externas. |
| **Client Component** | `"use client"` no topo do arquivo | Sinaliza ao compilador que o componente requer hidratação no navegador para estados e eventos. |
| **Interfaces TypeScript** | `interface Produto { id: number; ... }` | Contrato rígido de dados que valida propriedades da API e viabiliza autocompletação na IDE. |
| **Cliente HTTP Axios** | `axios.get<Produto[]>(url)` | Realiza requisições assíncronas com conversão automática de JSON e tipagem genérica. |
| **Prevenção de Memory Leaks** | `let ativo = true; return () => { ativo = false; }` | Função de cleanup no `useEffect` que cancela mutações de estado caso o componente seja desmontado. |
| **Skeletons Shimmer** | `animate-pulse bg-slate-100` | Feedback visual que preserva a estrutura espacial durante o carregamento de dados. |
| **Memoização (`useMemo`)** | `useMemo(() => produtos.filter(...), [...])` | Otimiza performance evitando recalcular buscas, categorias e ordenações a cada renderização. |
| **Manipulação com `Set`** | `Array.from(new Set(produtos.map(...)))` | Extrai categorias únicas dinamicamente sem duplicatas a partir da resposta da API. |
| **Componente `<Image />`** | `<Image src={...} alt={...} fill />` | Componente nativo do Next.js com otimização automática de formato, lazy loading e prevenção de CLS. |
| **Next.js Navigation** | `const pathname = usePathname()` | Identifica a rota atual para estilização do link ativo na barra de navegação global. |
| **Eventos de Teclado** | `window.addEventListener("keydown", handleKey)` | Captura o pressionamento da tecla `Escape` para fechar modais com alta usabilidade. |
| **Tailwind CSS v4** | `@import "tailwindcss";` | Estilização declarativa utility-first de alta performance diretamente nos elementos JSX/TSX. |
| **Funções Puras Utilitárias** | `formatarPreco`, `calcularDesconto` | Regras de formatação monetária e matemática desacopladas da camada de renderização visual. |
| **Testes Unitários com Jest** | `describe()`, `test()`, `expect().toBe()` | Suíte automatizada de validação que previne quebras nas regras de negócio da aplicação. |

---

## 🛠️ Tecnologias Utilizadas

- **[Next.js 16 (App Router)](https://nextjs.org/)** & **[React 19](https://react.dev/)**
- **[TypeScript 5](https://www.typescriptlang.org/)**
- **[Axios 1.20](https://axios-http.com/)**
- **[Tailwind CSS v4](https://tailwindcss.com/)** & **[@tailwindcss/postcss](https://www.npmjs.com/package/@tailwindcss/postcss)**
- **[Jest 30](https://jestjs.io/)** & **[@testing-library/jest-dom](https://testing-library.com/)**
- **[FakeStore API](https://fakestoreapi.com/)**
- **[ESLint 9](https://eslint.org/)**
- **[Vercel](https://vercel.com/)** (Deploy & Hospedagem Serverless)

---

## 🚀 Como Executar o Projeto Passo a Passo

> [!TIP]
> **Acesso Rápido Online:** Caso prefira testar a aplicação em produção sem necessidade de instalação local, acesse o link: [https://vitrine-produtos-chi.vercel.app/](https://vitrine-produtos-chi.vercel.app/)

### Pré-requisitos
Ter o **[Node.js](https://nodejs.org/)** (versão 18 ou superior) e o **npm** instalados:
```bash
node -v
npm -v
```

---

### Passo 1: Instale as dependências
```bash
npm install
```

---

### Passo 2: Inicie o servidor de desenvolvimento
```bash
npm run dev
```

---

### Passo 3: Abra no seu navegador
Acesse:
```text
http://localhost:3000
```

---

### Passo 4: Execute os testes unitários
```bash
npm test
```
*Para execução em modo contínuo ou CI:*
```bash
npm test -- --ci
```

---

### 💻 Scripts Disponíveis no `package.json`

- `npm run dev`: Inicia o servidor local de desenvolvimento na porta `3000`.
- `npm run build`: Compila a aplicação otimizada para produção.
- `npm start`: Roda o servidor de produção do Next.js.
- `npm test`: Executa os testes unitários com Jest.
- `npm run lint`: Executa a verificação estática de código com o ESLint.

---

## 👨‍💻 Autor

Desenvolvido por **Marlon da Silva**  
*Disciplina de Prática de Linguagem de Programação (Programação III).*  
🔗 [LinkedIn](https://www.linkedin.com/in/marlonds/)
