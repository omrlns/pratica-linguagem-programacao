# Desafios - Aula 05 | Next.js (App Router), TypeScript, Consumo de APIs com Axios, Tailwind CSS e Testes Automatizados com Jest

Projeto desenvolvido como parte das atividades práticas da disciplina **Programação III** (Prática de Linguagem de Programação).

O objetivo principal desta aula foi consolidar e expandir os conhecimentos em ecossistemas modernos de desenvolvimento front-end corporativo, evoluindo de uma SPA client-side em React (como visto na Aula 04) para um framework de nível de produção: o **Next.js 16 (App Router)**. A atividade abrange a arquitetura moderna com **Server e Client Components**, o consumo assíncrono de APIs REST externas com o cliente HTTP **Axios**, tipagem estática e segura com **TypeScript**, estilização utilitária moderna com **Tailwind CSS v4**, otimização nativa de imagens (`next/image`) e tipografia (`next/font`), gerenciamento refinado de estados reativos (`useState`, `useEffect`, `useMemo`), além da implementação de suítes de testes unitários automatizados com **Jest** e **Testing Library** para validação de regras de negócio.

---

## 📁 Estrutura de Arquivos

```text
Aula 05/
└── Desafios/
    ├── README.md                               # Documentação principal e aprofundada da atividade
    └── vitrine-produtos/                       # Aplicação Next.js 16 com TypeScript e Tailwind CSS
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
        └── tsconfig.json                       # Configurações do compilador TypeScript e aliases de import (@/*)
```

---

## 🌊 Entrando em Águas Profundas: Da SPA Tradicional ao Framework de Produção

Nas aulas anteriores (especialmente na Aula 04), construímos uma Single Page Application client-side utilizando React puro, empacotada com Vite e roteada via React Router DOM. Na **Aula 05**, demos um salto qualitativo para o padrão adotado na indústria de tecnologia para aplicações em grande escala:

### 1. A Evolução Arquitetural: De React SPA (Vite) para Next.js 16 (App Router)
* **Na Aula 04 (React + Vite):** O servidor entrega um arquivo `index.html` praticamente vazio (`<div id="root"></div>`) com um script JavaScript compilado. O navegador do cliente é obrigado a fazer o download integral do bundle, parsear o JavaScript e só então renderizar os nós na tela. Se o JavaScript falhar ou demorar, o usuário enxerga uma tela branca.
* **Na Aula 05 (Next.js 16 App Router):** O Next.js unifica o desenvolvimento front-end e recursos de servidor. Ele adota o modelo de **App Router** baseado em convenção de diretórios:
  * Cada pasta contendo um arquivo `page.tsx` torna-se automaticamente uma rota pública na URL (`app/page.tsx` ➔ `/`, `app/sobre/page.tsx` ➔ `/sobre`), dispensando o mapeamento manual em listas de rotas.
  * O arquivo `layout.tsx` atua como casca persistente da aplicação: componentes estruturais como a `<NavBar />` e o `<footer>` são renderizados uma única vez e preservam seu estado entre transições de tela.
  * **Server Components (RSC) vs. Client Components (`"use client"`):** Por padrão, no App Router os componentes são executados no servidor gerando HTML estático otimizado. Quando necessitamos de interatividade com o usuário (Hooks como `useState`, `useEffect`, `useMemo`, manipuladores de eventos `onClick` ou APIs do navegador como `usePathname`), declaramos a diretiva `"use client"` explicitamente no topo do arquivo, garantindo a separação limpa entre renderização estática e comportamento reativo no cliente.

### 2. TypeScript: Segurança de Tipos e Autodocumentação
A transição do JavaScript convencional (`.jsx`) para o TypeScript (`.tsx` e `.ts`) eleva o nível de segurança do código-fonte:
* **Contratos de Dados via Interfaces:** Definimos estruturas estritas como `interface Produto`, mapeando com precisão os campos fornecidos pela API externa (`id`, `title`, `price`, `description`, `category`, `image`, `rating`).
* **Prevenção de Falhas em Tempo de Desenvolvimento:** O compilador (`tsc`) impede erros de digitação comuns (como tentar acessar `produto.preço` em vez de `produto.price`), valida parâmetros obrigatórios de componentes e garante que funções utilitárias matemáticas recebam apenas valores do tipo `number`.
* **Produtividade Aumentada:** O editor de código oferece autocompletação inteligente (*IntelliSense*) e refatoração segura em toda a aplicação.

### 3. Consumo de APIs RESTful com Axios e o Ciclo Assíncrono
Em aplicações corporativas, o consumo de APIs externas exige confiabilidade e tratamento sofisticado de erros:
* **Axios vs. `fetch` Nativo:**
  * O **Axios** serializa e desserializa dados JSON automaticamente, eliminando a chamada redundante a `response.json()`.
  * Suporta genéricos em TypeScript (`axios.get<Produto[]>('...')`), fornecendo tipagem imediata para o payload retornado.
  * Lança exceções automáticas no bloco `catch` para qualquer código de status HTTP fora da faixa 2xx (ao contrário do `fetch`, que requer verificação manual de `response.ok`).
* **Prevenção de Race Conditions e Vazamento de Memória (*Memory Leaks*):**
  Ao realizar requisições assíncronas dentro de um `useEffect`, existe o risco de a resposta da rede retornar após o componente ter sido desmontado pelo usuário (por exemplo, se o usuário navegar para `/sobre` enquanto os produtos ainda estavam carregando). Para neutralizar esse risco, foi implementado o padrão de variável de controle com função de limpeza (*cleanup function*):
  ```tsx
  useEffect(() => {
    let ativo = true;

    async function carregarInicial() {
      try {
        const resposta = await axios.get<Produto[]>("https://fakestoreapi.com/products");
        if (ativo) setProdutos(resposta.data);
      } catch {
        if (ativo) setErro("Mensagem de erro amigável...");
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarInicial();
    return () => { ativo = false; }; // Cleanup: descarta atualizações em componentes desmontados
  }, []);
  ```

### 4. Tratamento de Estados Assíncronos da Interface (O Triângulo de Estados)
Uma aplicação resiliente nunca deixa o usuário no escuro. A interface da vitrine contempla com elegância os três estados fundamentais do fluxo assíncrono:
1. **Carregando (*Loading State*):** Enquanto os dados trafegam pela rede, uma malha de **Skeletons Shimmer** com animação `animate-pulse` é exibida no formato exato dos cards finais, prevenindo saltos abruptos de layout (*Layout Shift*).
2. **Sucesso (*Success State*):** Renderização dos cards reais, contagem dinâmica de itens e liberação dos controles de filtragem e busca.
3. **Erro / Contingência (*Error Handling*):** Em caso de indisponibilidade da API ou falha de conectividade, um painel ilustrado informa a anomalia e disponibiliza o botão "Tentar Novamente", permitindo ao usuário disparar uma nova tentativa (`recarregarProdutos`) sem necessidade de recarregar a página no navegador.

### 5. Tailwind CSS v4 & Adoção de Design System Clean
* **Tailwind v4 Moderno:** Utiliza o novo motor `@tailwindcss/postcss` com sintaxe unificada `@import "tailwindcss";` no `globals.css`, eliminando arquivos de configuração legados e acelerando o tempo de compilação.
* **Paleta de Cores e Hierarquia Visual:** Foco em contrastes suaves com tons de ardósia (`slate-50/70` no fundo, `slate-200/80` em bordas de separação, `slate-800` na tipografia principal) combinados a acentos vibrantes em índigo (`indigo-600`) e esmeralda (`emerald-600` para destaque de descontos).
* **Efeitos de Profundidade e Glassmorphism:** Barra superior com fixação contínua (`sticky top-0`), transparência calibrada (`bg-white/85`) e desfoque de fundo (`backdrop-blur-md`).
* **Responsividade Mobile-First:** Grid dinâmico que se adapta progressivamente à resolução da viewport: 1 coluna em smartphones (`grid-cols-1`), 2 em tablets pequenos (`sm:grid-cols-2`), 3 em telas médias (`md:grid-cols-3`) e 4 em monitores amplos (`lg:grid-cols-4`).

### 6. Otimizações Nativas do Next.js: Imagens e Tipografia
* **O Componente `<Image />` (`next/image`):** Substitui a tag HTML `<img>` crua. Ele realiza dimensionamento automático sob demanda, serve formatos modernos ultracompactos (WebP/AVIF), aplica lazy loading por padrão e exige a especificação do atributo `sizes` para garantir que o navegador faça o download da imagem com a densidade de pixels ideal.
* **Whitelist de Segurança em `next.config.ts`:** Por diretriz de segurança, o Next.js bloqueia imagens de domínios remotos arbitrários. A configuração `remotePatterns` autorizou explicitamente o domínio `fakestoreapi.com`.
* **Fontes com Zero Cumulative Layout Shift via `next/font/google`:** A tipografia `Inter` é otimizada pelo Next.js no momento do build, sendo auto-hospedada localmente junto com os ativos da aplicação, sem dependência de requisições externas em tempo de execução para os servidores do Google Fonts.

### 7. Testes Automatizados com Jest e Testing Library
Uma base de código profissional necessita de garantias de que refatorações não introduzirão regressões em regras de negócio:
* **Integração Next.js + Jest:** Configurado via `next/jest.js`, suportando TypeScript nativamente, simulando o ambiente de navegador com `jest-environment-jsdom` e estendendo matchers com `@testing-library/jest-dom`.
* **Testes de Funções Puras:** A suíte [`formatters.test.ts`](./vitrine-produtos/__tests__/formatters.test.ts) valida a formatação de valores monetários no padrão do Real Brasileiro (`R$ 109,95`) e testa cálculos de desconto percentual, cobrindo inclusive cenários de borda (*edge cases*) como descontos de 100% ou valores negativos.

---

## 📋 Funcionalidades e Conceitos Implementados

A aplicação consiste em um **E-commerce Interativo Completo** conectado à FakeStore API em tempo real:

### 1. Catálogo Dinâmico e Consumo da FakeStore API
* **Arquivo:** [`app/page.tsx`](./vitrine-produtos/app/page.tsx)
* **Objetivo:** Renderizar a listagem completa de produtos disponibilizados pelo endpoint público `https://fakestoreapi.com/products`.
* **Implementação:**
  * Coleta dos 20 produtos contendo título, descrição, categoria, preço, imagem e avaliação.
  * Apresentação dos cartões com microinterações em `:hover` (elevação com `-translate-y-1` e sombra pronunciada `hover:shadow-xl`).
  * Selo visual com a nota média em estrelas (`rating.rate`) e contagem total de avaliações recebidas.
  * Cálculo dinâmico do preço promocional com 10% de desconto para pagamentos via Pix: `calcularDesconto(produto.price, 10)`.

---

### 2. Sistema Avançado de Filtragem e Busca em Tempo Real
* **Arquivo:** [`app/page.tsx`](./vitrine-produtos/app/page.tsx)
* **Objetivo:** Facilitar a localização de itens por termos textuais e categorização temático-comercial.
* **Implementação Técnica:**
  * **Busca Instantânea:** Input reativo com ícone de lupa, botão de limpeza rápida ('X') e filtragem simultânea por nome do produto ou nome da categoria.
  * **Pílulas de Categoria Geradas Dinamicamente:** A lista de categorias não é engessada no código; ela é extraída em tempo de execução a partir dos produtos recebidos da API utilizando `useMemo` e a estrutura `Set`:
    ```tsx
    const categorias = useMemo(() => {
      const lista = Array.from(new Set(produtos.map((p) => p.category)));
      return ["todas", ...lista];
    }, [produtos]);
    ```
  * **Internacionalização de Rótulos:** Tradução das categorias em inglês para termos amigáveis em português (`men's clothing` ➔ "Moda Masculina", `jewelery` ➔ "Joias & Acessórios", `electronics` ➔ "Eletrônicos").
  * **Estado Vazio (*Empty State*):** Quando uma busca não localiza produtos correspondentes, a interface exibe um card com mensagem explicativa e botão para restauração imediata de todos os filtros.

---

### 3. Ordenação Multicritério com Otimização de Performance
* **Arquivo:** [`app/page.tsx`](./vitrine-produtos/app/page.tsx)
* **Objetivo:** Permitir ao usuário reorganizar a listagem segundo suas preferências de compra.
* **Critérios Disponíveis:**
  * **Destaques (Padrão):** Ordem natural da FakeStore API por ID.
  * **Menor Preço:** Ordenação numérica crescente (`a.price - b.price`).
  * **Maior Preço:** Ordenação numérica decrescente (`b.price - a.price`).
  * **Melhor Avaliação:** Pela nota dos consumidores (`b.rating.rate - a.rating.rate`).
  * **Nome (A - Z):** Ordenação alfabética com suporte a acentuação via `localeCompare`.
* **Otimização com `useMemo`:** O encadeamento de filtro por texto, filtro por categoria e ordenação foi encapsulado em um único Hook `useMemo`, prevenindo processamentos matemáticos desnecessários a cada renderização da página.

---

### 4. Modal Imersivo de Detalhes do Produto
* **Arquivo:** [`app/page.tsx`](./vitrine-produtos/app/page.tsx)
* **Objetivo:** Apresentar a ficha técnica completa do produto selecionado sem redirecionar o usuário para outra tela.
* **Recursos de Usabilidade e Acessibilidade:**
  * **Abertura e Foco:** Acionado pelo botão "Ver detalhes" em cada card, armazenando o objeto no estado `produtoModal`.
  * **Backdrop com Desfoque:** Fundo escurecido semitransparente com `backdrop-blur-xs` e animação de entrada `fade-in`.
  * **Visualização Completa:** Exibição da imagem em grande escala, categoria estilizada, título integral, descrição detalhada com barra de rolagem dedicada, parcelamento em até 3x sem juros e botão de compra simulada.
  * **Avaliação em Estrelas Dinâmica:** Renderização procedural de 5 ícones SVG calculando estrelas cheias e apagadas a partir da nota média arredondada (`Math.round(rate)`).
  * **Fechamento Ergonômico:** Fechamento ao clicar fora do card (tratamento com `e.stopPropagation()` no corpo do modal) e escutador global do teclado para a tecla **`Escape`** (`window.addEventListener("keydown", ...)`).

---

### 5. Barra de Navegação Global com Detecção de Rota Ativa
* **Arquivo:** [`components/NavBar.tsx`](./vitrine-produtos/components/NavBar.tsx)
* **Objetivo:** Fornecer navegação fluida entre a vitrine comercial e as informações institucionais.
* **Implementação:**
  * Componente marcado com `"use client"`.
  * Leitura da rota atual via hook `usePathname()` do Next.js Navigation.
  * Aplicação condicional de classes de destaque visual (`bg-indigo-50 text-indigo-700 font-semibold`) para a rota em exibição.
  * Transições instantâneas entre `/` e `/sobre` utilizando o componente `<Link>` nativo do Next.js.

---

### 6. Página Institucional e Detalhamento da Stack (`/sobre`)
* **Arquivo:** [`app/sobre/page.tsx`](./vitrine-produtos/app/sobre/page.tsx)
* **Objetivo:** Documentar o propósito pedagógico do projeto e a pilha de tecnologias empregada.
* **Conteúdo Apresentado:**
  * Cartões modulares destacando o papel de cada tecnologia: Next.js 16, Tailwind CSS v4, Axios, Jest & Testing Library, FakeStore API e Vercel.
  * Seção detalhada com os diferenciais da implementação: design clean com paleta suave, busca inteligente, modal imersivo e feedback contínuo via skeletons.

---

### 7. Módulo Utilitário Puro e Testes Automatizados
* **Arquivos:** [`utils/formatters.ts`](./vitrine-produtos/utils/formatters.ts) | [`__tests__/formatters.test.ts`](./vitrine-produtos/__tests__/formatters.test.ts)
* **Funções Utilitárias:**
  * `formatarPreco(valor: number): string`: Utiliza `Intl.NumberFormat` nativo do JavaScript com a localização `pt-BR` e moeda `BRL` para gerar strings perfeitamente formatadas (ex: `R$ 109,95`), com fallback seguro para valores inválidos ou negativos.
  * `calcularDesconto(preco: number, percentual: number): number`: Calcula o valor abatido e retorna o preço final numérico com arredondamento estrito em 2 casas decimais, tratando descontos iguais ou superiores a 100%.
* **Suíte de Testes no Jest:**
  * Teste 1: Validação da formatação de valores com ponto flutuante para a máscara monetária em Real.
  * Teste 2: Cálculo correto de 10% de desconto comercial.
  * Teste 3: Tratamento de caso limite (*edge case*), garantindo que descontos de 100% resultem em valor zero.

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

## 🛠️ Tecnologias e Ferramentas Utilizadas

- **Framework & Core:**
  - **[Next.js 16 (App Router)](https://nextjs.org/):** Framework React corporativo com roteamento baseado em arquivos e otimizações nativas.
  - **[React 19](https://react.dev/):** Biblioteca fundamental baseada em componentes declarativos.
  - **[ReactDOM 19](https://react.dev/reference/react-dom):** Renderizador do React direcionado para navegadores.
  - **[TypeScript 5](https://www.typescriptlang.org/):** Superset tipado do JavaScript para alta segurança e prevenção de bugs.
- **Comunicação de Dados & API:**
  - **[Axios 1.20](https://axios-http.com/):** Cliente HTTP assíncrono baseado em Promises para comunicação RESTful.
  - **[FakeStore API](https://fakestoreapi.com/):** REST API pública fornecedora de catálogo simulado de e-commerce.
- **Estilização & Apresentação:**
  - **[Tailwind CSS v4](https://tailwindcss.com/):** Framework CSS utility-first de última geração.
  - **[@tailwindcss/postcss](https://www.npmjs.com/package/@tailwindcss/postcss):** Plugin de integração PostCSS para compilação ultrarrápida do Tailwind v4.
  - **[Google Fonts (Inter)](https://nextjs.org/docs/app/building-your-application/optimizing/fonts):** Tipografia moderna carregada com zero impacto de layout shift via `next/font`.
- **Qualidade de Código & Testes Automatizados:**
  - **[Jest 30](https://jestjs.io/):** Framework de testes automatizados em JavaScript/TypeScript.
  - **[Testing Library](https://testing-library.com/):** Utilitários e extensões de asserção para o DOM (`@testing-library/jest-dom`).
  - **[ESLint 9](https://eslint.org/):** Análise estática de código com a configuração oficial `eslint-config-next`.
- **Ambiente de Execução:**
  - **[Node.js](https://nodejs.org/):** Runtime JavaScript utilizado como base para o ecossistema e ferramentas.
  - **[npm](https://www.npmjs.com/):** Gerenciador de dependências e pacotes.

---

## 🚀 Como Executar o Projeto Passo a Passo

Para rodar esta aplicação em seu computador, siga o roteiro detalhado a seguir:

### Pré-requisitos
Certifique-se de possuir o **[Node.js](https://nodejs.org/)** (versão 18 ou superior — recomenda-se a versão LTS) e o gerenciador **npm** instalados. Para verificar a disponibilidade de ambos, abra seu terminal e execute:
```bash
node -v
npm -v
```

---

### Passo 1: Acesse a pasta do projeto
Abra o terminal (PowerShell, Bash ou terminal integrado do VS Code) e entre no diretório da aplicação:
```bash
cd "Programação III/Aula 05/Desafios/vitrine-produtos"
```

---

### Passo 2: Instale as dependências do projeto
Como a pasta `node_modules` é ignorada pelo controle de versão, execute o comando abaixo para baixar todos os pacotes definidos no `package.json`:
```bash
npm install
```

> [!NOTE]
> Este comando lerá as dependências exatas registradas no `package-lock.json` e instalará o Next.js 16, React 19, TypeScript, Axios, Tailwind CSS v4 e o Jest com suas respectivas tipagens.

---

### Passo 3: Inicie o servidor de desenvolvimento
Inicie o ambiente de desenvolvimento local com suporte a Fast Refresh:
```bash
npm run dev
```

---

### Passo 4: Acesse a aplicação no seu navegador
Assim que o servidor for inicializado, acesse o endereço fornecido pelo Next.js (por padrão na porta `3000`):
```text
http://localhost:3000
```

---

### Passo 5: Execute a suíte de testes unitários
Para verificar a integridade das funções de negócio (`formatarPreco` e `calcularDesconto`) através dos testes automatizados com o Jest:
```bash
npm test
```
*Dica para execução em ambientes não-interativos (CI/CD):*
```bash
npm test -- --ci
```

---

### Comandos Adicionais do Projeto

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento do Next.js na porta `3000`. |
| `npm run build` | Compila o projeto em modo de produção, gerando a pasta otimizada `.next/`. |
| `npm start` | Executa o servidor Node.js de produção (requer execução prévia de `npm run build`). |
| `npm test` | Executa os testes unitários automatizados com Jest e exibe o relatório de asserções. |
| `npm run lint` | Executa a verificação estática de código com ESLint para garantir boas práticas. |

---

## 👨‍💻 Autor

Desenvolvido por **Marlon da Silva**  
*Disciplina de Prática de Linguagem de Programação (Programação III).*  
🔗 [LinkedIn](https://www.linkedin.com/in/marlonds/)
