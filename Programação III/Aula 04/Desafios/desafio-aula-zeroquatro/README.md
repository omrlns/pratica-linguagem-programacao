# Desafio Aula 04 - Site Multipáginas com React

Projeto desenvolvido como parte das atividades práticas da disciplina **Programação III** (Prática de Linguagem de Programação).

Aplicação React moderna desenvolvida com **Vite** para consolidar na prática os fundamentos de **Single Page Applications (SPAs)**: arquitetura de componentes reutilizáveis, passagem de propriedades (*Props*), roteamento no lado do cliente com o **React Router DOM v7**, gerenciamento de estado reativo com o Hook **`useState`**, imutabilidade na manipulação de listas dinâmicas e o ecossistema de dependências com **Node.js** e **npm**.

---

## 📁 Estrutura de Arquivos

```text
desafio-aula-zeroquatro/
├── public/                             # Ativos estáticos públicos
├── src/                                # Código-fonte da aplicação React
│   ├── components/                     # Componentes modulares e reutilizáveis
│   │   ├── Header.jsx                  # Cabeçalho global com navegação SPA e Props
│   │   └── Footer.jsx                  # Rodapé com ano dinâmico e identificação do autor
│   ├── pages/                          # Componentes de páginas/telas da aplicação
│   │   ├── Home.jsx                    # Página inicial com demonstração do hook useState (Contador)
│   │   ├── Sobre.jsx                   # Página descritiva com os fundamentos do projeto
│   │   ├── Lista.jsx                   # CRUD em memória: lista interativa com imutabilidade
│   │   └── NotFound.jsx                # Página 404 para rotas inexistentes
│   ├── App.jsx                         # Componente raiz: casca da SPA e definição de rotas
│   ├── App.css                         # Estilos globais da casca, layout flexível e componentes
│   ├── index.css                       # Reset global de CSS e tipografia base do sistema
│   └── main.jsx                        # Ponto de entrada JavaScript (ReactDOM.createRoot)
├── .gitignore                          # Arquivos e diretórios desconsiderados pelo Git
├── eslint.config.js                    # Configuração de linting e boas práticas com ESLint
├── index.html                          # Ponto de entrada HTML único da Single Page Application
├── package.json                        # Manifesto do projeto, scripts executáveis e dependências
├── package-lock.json                   # Trava determinística das versões exatas das dependências
├── README.md                           # Documentação detalhada da aplicação
└── vite.config.js                      # Configuração do bundler e servidor de desenvolvimento Vite
```

---

## 🌊 Entrando em Águas Profundas: O Ecossistema Moderno do Front-end

Com a introdução do React na disciplina, deixamos para trás a manipulação manual e imperativa do DOM para adotar o fluxo de trabalho profissional contemporâneo:

### 1. Paradigma Imperativo vs. Declarativo
* **Paradigma Imperativo:** O desenvolvedor instrui passo a passo cada manipulação no documento (`document.getElementById`, `innerHTML`, `appendChild`).
* **Paradigma Declarativo do React:** O desenvolvedor descreve a interface em função do estado. Quando o estado muda, o motor do React calcula as diferenças no **Virtual DOM** através do algoritmo de reconciliação e atualiza de forma eficiente e pontual apenas os elementos necessários no DOM real.

### 2. Node.js & npm (Node Package Manager)
* **Node.js:** Ambiente de execução que permite rodar código JavaScript no computador de desenvolvimento para compilar, analisar e servir a aplicação.
* **npm:** Gerenciador oficial de pacotes que resolve, faz download e gerencia versões de bibliotecas essenciais para a aplicação.

### 3. O Manifesto `package.json`
Centraliza toda a configuração do ecossistema do projeto:
* **Scripts:** Atalhos como `npm run dev`, `npm run build`, `npm run preview` e `npm run lint`.
* **`dependencies`:** Bibliotecas requeridas em tempo de execução no navegador (`react`, `react-dom`, `react-router-dom`).
* **`devDependencies`:** Ferramentas auxiliares exclusivas de desenvolvimento (`vite`, `@vitejs/plugin-react`, `eslint`).

### 4. A Trava `package-lock.json`
* Garante a integridade e reproducibilidade das dependências, fixando versões exatas e somas de verificação (*hashes*) de cada pacote instalado, impedindo incompatibilidades entre máquinas distintas.

### 5. O Diretório `node_modules/`
* Contém todos os arquivos de código de terceiros baixados pelo npm.
* **Atenção:** Por conter milhares de arquivos e ser gerado sob demanda pelo comando `npm install`, este diretório é permanentemente ignorado pelo Git via [`.gitignore`](./.gitignore).

### 6. Vite: O Bundler de Próxima Geração
* Utiliza **ES Modules (ESM)** nativos suportados pelos navegadores modernos para entregar inicialização instantânea do servidor de desenvolvimento e **Hot Module Replacement (HMR)** ultrarrápido, recompilando apenas os módulos alterados em frações de segundo.

---

## 📋 Funcionalidades e Conceitos Implementados

### 1. Arquitetura de Componentes e *Props*
* **Arquivos:** [`Header.jsx`](./src/components/Header.jsx) | [`Footer.jsx`](./src/components/Footer.jsx)
* **Conceito:** Separação da interface em partes pequenas, especializadas e reutilizáveis.
* **Implementação:**
  * `Header` recebe a propriedade `{ title }` customizável passada pelo componente pai [`App.jsx`](./src/App.jsx).
  * `Footer` recebe a propriedade `{ author }` e calcula o ano corrente dinamicamente via JSX: `{new Date().getFullYear()}`.

---

### 2. Roteamento no Lado do Cliente (*Client-Side Routing*) com React Router DOM v7
* **Arquivo:** [`App.jsx`](./src/App.jsx)
* **Single Page Application (SPA):** Permite transição fluida entre telas sem recarregamento de página (*zero page reload*).
* **Estrutura de Rotas:**
  * `<BrowserRouter>`: Atua como provedor do histórico de navegação.
  * `<Routes>` e `<Route>`:
    * `/` ➔ [`Home.jsx`](./src/pages/Home.jsx) (Página Inicial com contador).
    * `/sobre` ➔ [`Sobre.jsx`](./src/pages/Sobre.jsx) (Página explicativa).
    * `/lista` ➔ [`Lista.jsx`](./src/pages/Lista.jsx) (Página de tarefas).
    * `*` ➔ [`NotFound.jsx`](./src/pages/NotFound.jsx) (Página 404 para rotas não cadastradas).
  * `<Link to="...">`: Substitui links HTML convencionais (`<a href>`), impedindo requisições extras ao servidor.

---

### 3. Gerenciamento de Estado Reativo (`useState`)
O Hook `useState` gerencia o ciclo de vida reativo dos dados na aplicação:

#### A. Contador Numérico
* **Arquivo:** [`Home.jsx`](./src/pages/Home.jsx)
* **Implementação:** `const [contador, setContador] = useState(0)`.
* Cada clique aciona `setContador(contador + 1)`, provocando uma re-renderização pontual do elemento na tela.

#### B. Componente Controlado (*Controlled Form*)
* **Arquivo:** [`Lista.jsx`](./src/pages/Lista.jsx)
* **Implementação:** O estado `novoTexto` reflete em tempo real o valor do `<input>` através do evento `onChange={(e) => setNovoTexto(e.target.value)}`.

---

### 4. Imutabilidade e Manipulação de Coleções
* **Arquivo:** [`Lista.jsx`](./src/pages/Lista.jsx)
* **Regra de Ouro:** Estados no React nunca devem ser modificados diretamente. Cria-se sempre uma nova referência de memória para disparar a atualização visual.
* **Operações Implementadas:**
  * **Inclusão:** `setTarefas([...tarefas, novoItem])` via *Spread Operator*.
  * **Exclusão:** `setTarefas(tarefas.filter(item => item.id !== id))` via `.filter()`.
  * **Renderização:** `.map()` gerando elementos com a propriedade única `key={tarefa.id}` para alta eficiência no Virtual DOM.

---

### 5. Layout Estrutural e Estilos CSS
* **Arquivos:** [`App.css`](./src/App.css) | [`index.css`](./src/index.css)
* **Padrão Sticky Footer:** `.app-container` com `display: flex; flex-direction: column; min-height: 100vh;` e `.main-content` com `flex: 1`, fixando o rodapé na base.
* **Componentes Visuais:** Cartões limpos com sombreamento moderno (`box-shadow`), tipografia nativa e botões interativos (`.btn`, `.btn-danger`).

---

## 🧠 Síntese dos Conceitos Praticados

| Conceito / Recurso | Sintaxe / Contexto | Papel Arquitetural no Projeto |
| :--- | :--- | :--- |
| **Componentes Funcionais** | `function Header({ title })` | Blocos modulares que retornam elementos JSX para montar a interface. |
| **Props** | `<Header title="..." />` | Passagem unidirecional de dados do componente pai para o filho. |
| **JSX** | `<div className="...">...</div>` | Extensão de sintaxe que une a lógica JavaScript à marcação HTML. |
| **`useState`** | `const [estado, setEstado] = useState(valor)` | Hook do React que adiciona reatividade local e dispara novos ciclos de renderização. |
| **Input Controlado** | `value={novoTexto} onChange={...}` | Sincroniza a digitação do usuário diretamente com o estado interno do React. |
| **Imutabilidade (`...`)** | `setTarefas([...tarefas, novoItem])` | Cria uma nova lista no estado sem mutar o array existente em memória. |
| **Método `.filter()`** | `tarefas.filter(item => item.id !== id)` | Remove elementos de forma não-destrutiva gerando um novo array. |
| **Método `.map()` + `key`** | `tarefas.map(item => <li key={item.id}>)` | Renderiza coleções dinâmicas auxiliando o algoritmo de reconciliação do React. |
| **React Router (`BrowserRouter`)** | `<BrowserRouter> ... </BrowserRouter>` | Envolve a árvore de componentes sincronizando as telas com a URL. |
| **Rotas (`Routes` e `Route`)** | `<Route path="/sobre" element={<Sobre />} />` | Mapeia caminhos de URL para a exibição de componentes específicos na tela. |
| **Navegação Declarativa (`Link`)** | `<Link to="/lista">Lista</Link>` | Altera a rota sem disparar recarregamento de página (*zero page reload*). |
| **Rota 404 Coringa** | `<Route path="*" element={<NotFound />} />` | Captura qualquer tentativa de acesso a URLs não mapeadas na aplicação. |

---

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/)** & **[ReactDOM 19](https://react.dev/reference/react-dom)**
- **[React Router DOM v7](https://reactrouter.com/)**
- **[Vite 8](https://vitejs.dev/)**
- **[ESLint 10](https://eslint.org/)**
- **JavaScript (ES6+)**
- **HTML5 Semântico & CSS3 Flexbox**

---

## 🚀 Como Executar o Projeto Passo a Passo

### Pré-requisitos
Ter o **[Node.js](https://nodejs.org/)** (versão 18 ou superior) e o **npm** instalados. Verifique no terminal:
```bash
node -v
npm -v
```

---

### Passo 1: Acesse a pasta do projeto
```bash
cd "Programação III/Aula 04/Desafios/desafio-aula-zeroquatro"
```

---

### Passo 2: Instale as dependências
Baixa e cria a pasta `node_modules` com base no `package.json`:
```bash
npm install
```

---

### Passo 3: Inicie o servidor de desenvolvimento
```bash
npm run dev
```

---

### Passo 4: Abra a aplicação no navegador
Acesse o link indicado no terminal (geralmente):
```text
http://localhost:5173/
```

---

### 💻 Scripts Disponíveis no `package.json`

- `npm run dev`: Executa a aplicação em modo de desenvolvimento com HMR.
- `npm run build`: Compila e gera os arquivos otimizados para produção na pasta `dist/`.
- `npm run preview`: Inicia um servidor local para inspecionar os arquivos da pasta `dist/`.
- `npm run lint`: Executa a verificação estática de código com o ESLint.

---

## 👨‍💻 Autor

Desenvolvido por **Marlon da Silva**  
*Disciplina de Prática de Linguagem de Programação (Programação III).*  
🔗 [LinkedIn](https://www.linkedin.com/in/marlonds/)