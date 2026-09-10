# Desafios - Aula 04 | Introdução ao React, Componentização, SPA e Gerenciamento de Estado

Projeto desenvolvido como parte das atividades práticas da disciplina **Programação III** (Prática de Linguagem de Programação).

O objetivo principal desta aula foi vivenciar a transição do paradigma clássico da web (HTML/CSS/JS imperativo) para o desenvolvimento moderno de **Single Page Applications (SPAs)** baseadas em **React**, explorando a arquitetura de componentes, passagem de propriedades (*Props*), roteamento no lado do cliente (*Client-Side Routing*) com o **React Router DOM**, gerenciamento de estado local reativo com o Hook **`useState`**, imutabilidade na manipulação de listas dinâmicas, além de desmistificar o ecossistema de ferramentas do Node.js, empacotamento com o **Vite** e a gestão de dependências via **npm**.

---

## 📁 Estrutura de Arquivos

```text
Aula 04/
└── Desafios/
    ├── README.md                               # Documentação principal da atividade
    └── desafio-aula-zeroquatro/                # Aplicação React desenvolvida com Vite
        ├── public/                             # Ativos estáticos públicos
        ├── src/                                # Código-fonte da aplicação React
        │   ├── components/                     # Componentes modulares e reutilizáveis
        │   │   ├── Header.jsx                  # Cabeçalho global com navegação SPA e Props
        │   │   └── Footer.jsx                  # Rodapé com ano dinâmico e identificação do autor
        │   ├── pages/                          # Componentes que representam as páginas/telas
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
        └── vite.config.js                      # Configuração do bundler e servidor de desenvolvimento Vite
```

---

## 🌊 Entrando em Águas Profundas: O Ecossistema Moderno do Front-end

Nas aulas anteriores (Aulas 01 a 03), o desenvolvimento ocorria diretamente com arquivos HTML, folhas de estilo CSS e scripts JavaScript manipulando o DOM manualmente (`document.getElementById`, `innerHTML`). Na **Aula 04**, mergulhamos no fluxo de trabalho profissional do desenvolvimento front-end moderno:

### 1. Paradigma Imperativo vs. Paradigma Declarativo
* **Na Aula 03 (Imperativo):** O desenvolvedor instruía o navegador passo a passo sobre *como* criar cada nó, atribuir classes, anexar escutadores de eventos e injetar HTML na árvore do DOM.
* **Na Aula 04 com React (Declarativo):** O desenvolvedor descreve *o que* a interface deve exibir para um determinado estado. O React assume a responsabilidade de calcular a diferença entre os estados através do **Virtual DOM** (mecanismo de reconciliação) e aplicar as alterações mínimas necessárias no DOM real, resultando em maior previsibilidade e performance.

### 2. Node.js & Gerenciador de Pacotes (npm)
* **Node.js:** Runtime de JavaScript baseado no motor V8 do Google Chrome que permite a execução de código fora do navegador. No front-end moderno, o Node.js não roda no cliente final; ele atua no computador do desenvolvedor para alimentar ferramentas de compilação, testes, minificação e servidores de desenvolvimento.
* **npm (Node Package Manager):** O registro e gerenciador padrão de pacotes de código aberto do ecossistema JavaScript, permitindo instalar, versionar e compartilhar bibliotecas de terceiros de maneira automatizada.

### 3. O Arquivo `package.json`
É o coração de qualquer projeto Node/React. Ele funciona como o manifesto central que registra:
* **Metadados do Projeto:** Nome, versão e tipo de módulo (`"type": "module"` para suporte a ES Modules nativos).
* **Scripts Executáveis:** Comandos de atalho para execução de rotinas frequentes, como `npm run dev` (iniciar servidor local), `npm run build` (gerar versão de produção compactada), `npm run preview` (testar o build localmente) e `npm run lint` (validar boas práticas de código).
* **`dependencies` (Dependências de Produção):** Bibliotecas necessárias para a aplicação funcionar no navegador do usuário final (`react`, `react-dom`, `react-router-dom`).
* **`devDependencies` (Dependências de Desenvolvimento):** Ferramentas utilizadas unicamente durante o desenvolvimento e processo de compilação, não sendo enviadas ao usuário (`vite`, `@vitejs/plugin-react`, `eslint`).

### 4. O Arquivo `package-lock.json`
* Gerado automaticamente pelo npm sempre que dependências são modificadas ou instaladas.
* Armazena uma árvore estrita e determinística com as versões exatas e as somas de verificação (*hashes* de integridade) de cada biblioteca e de suas respectivas subdependências.
* **Por que é crucial?** Garante que qualquer outro desenvolvedor da equipe — ou o servidor de integração contínua (CI/CD) — ao executar `npm install`, construa um ambiente idêntico, eliminando o clássico problema de *"na minha máquina funciona"*.

### 5. O Diretório `node_modules/`
* Contém o código-fonte compilado e pronto para consumo de todas as bibliotecas declaradas no `package.json`, somadas a todas as suas dependências transitivas.
* **Regra de Ouro:** A pasta `node_modules` **nunca deve ser versionada no Git** (estando sempre listada no [`.gitignore`](./desafio-aula-zeroquatro/.gitignore)), devido ao seu enorme volume de arquivos e tamanho em disco. Qualquer pessoa que clonar o repositório pode recriá-la perfeitamente a partir do `package.json` executando `npm install`.

### 6. O Bundler Moderno: Vite
* Diferente das ferramentas tradicionais legadas que empacotavam a aplicação inteira na memória a cada pequena alteração de código (gerando lentidão ao iniciar o projeto), o **Vite** tira proveito dos **ES Modules (ESM)** nativos suportados pelos navegadores modernos.
* Oferece inicialização instantânea do servidor de desenvolvimento e **Hot Module Replacement (HMR)** extremamente veloz, atualizando apenas o componente modificado sem perder o estado da página.

---

## 📋 Funcionalidades e Conceitos Implementados

A aplicação consiste em um **Portal SPA Multi-Páginas** contendo três telas principais, cabeçalho e rodapé persistentes, e rota de contingência 404:

### 1. Arquitetura de Componentes e Passagem de Propriedades (*Props*)
* **Arquivos:** [`Header.jsx`](./desafio-aula-zeroquatro/src/components/Header.jsx) | [`Footer.jsx`](./desafio-aula-zeroquatro/src/components/Footer.jsx)
* **Objetivo:** Isolar elementos de interface comuns em blocos reutilizáveis, desacoplados e de fácil manutenção.
* **Implementação Técnica:**
  * **Comunicação Unidirecional (*Props*):** Componentes funcionais recebem dados como parâmetros via desestruturação de objeto. O componente `Header` recebe `{ title }` dinamicamente definido no componente pai [`App.jsx`](./desafio-aula-zeroquatro/src/App.jsx), enquanto `Footer` recebe `{ author }`.
  * **Dinamismo em JSX:** No rodapé, o ano corrente é calculado dinamicamente com código JavaScript puro interpolado entre chaves: `{new Date().getFullYear()}`.

---

### 2. Roteamento no Lado do Cliente (*Client-Side Routing*) com React Router DOM v7
* **Arquivo:** [`App.jsx`](./desafio-aula-zeroquatro/src/App.jsx)
* **Conceito de SPA (Single Page Application):** Em uma aplicação tradicional, cada clique em link solicita uma nova página HTML completa ao servidor web, causando uma piscada branca na tela e recarregamento integral dos scripts e estilos. Com o **React Router**, o documento HTML (`index.html`) é carregado uma única vez; a navegação altera apenas a URL no histórico do navegador e monta dinamicamente o componente associado àquela rota.
* **Componentes Utilizados:**
  * `<BrowserRouter>`: Provedor que conecta a aplicação React à History API do navegador.
  * `<Routes>` e `<Route>`: Mapeamento declarativo de caminhos de URL para seus respectivos componentes:
    * `/` ➔ Renderiza `<Home />` (Página Inicial).
    * `/sobre` ➔ Renderiza `<Sobre />` (Visão geral técnica).
    * `/lista` ➔ Renderiza `<Lista />` (Gestão de itens com estado).
    * `*` ➔ Rota coringa que intercepta qualquer caminho não configurado e exibe `<NotFound />` (Página 404 com opção de retorno).
  * `<Link to="...">`: Utilizado no menu de navegação do `Header` e na tela 404 no lugar da tag nativa `<a href="...">`. O `<Link>` intercepta o clique do mouse e impede o comportamento padrão de requisição HTTP, garantindo navegação instantânea.

---

### 3. Gerenciamento de Estado Reativo (`useState`)
O Hook `useState` é o mecanismo primário do React para adicionar memória e reatividade a componentes funcionais:

#### A. Contador Simples
* **Arquivo:** [`Home.jsx`](./desafio-aula-zeroquatro/src/pages/Home.jsx)
* **Implementação:** Declaração do estado `const [contador, setContador] = useState(0)`.
* **Disparo Reativo:** Ao clicar no botão, a função de atualização `setContador(contador + 1)` agenda uma nova renderização do componente, atualizando o elemento `<strong>` no DOM sem recarregar nenhum outro elemento circundante.

#### B. Entrada Controlada (*Controlled Component*)
* **Arquivo:** [`Lista.jsx`](./desafio-aula-zeroquatro/src/pages/Lista.jsx)
* **Implementação:** O valor do campo de texto é mantido em sincronia com o estado local `novoTexto`:
  ```jsx
  <input
    type="text"
    placeholder="Digite um Novo Item..."
    value={novoTexto}
    onChange={(event) => setNovoTexto(event.target.value)}
  />
  ```
* O React passa a ser a **fonte única da verdade** (*single source of truth*) para o conteúdo do campo.

---

### 4. Imutabilidade e Manipulação de Coleções no React
* **Arquivo:** [`Lista.jsx`](./desafio-aula-zeroquatro/src/pages/Lista.jsx)
* **A Regra Fundamental da Imutabilidade:** No JavaScript puro (como visto na Aula 03), utilizávamos métodos mutáveis como `array.push()` ou `array.pop()`. No React, **estados nunca devem ser mutados diretamente**. O React compara referências de objetos em memória para saber se a interface precisa ser repintada. Mutações diretas quebram esse ciclo.
* **Padrões de Manipulação Aplicados:**
  * **Adição Não-Mutável (Operador Spread `...`):** Cria um novo array preservando os itens anteriores e concatenando o novo registro com ID timestamp único (`Date.now()`):
    ```jsx
    setTarefas([...tarefas, novoItem]);
    ```
  * **Remoção Não-Mutável (`.filter()`):** Cria um novo array contendo apenas os elementos cujo `id` seja diferente do item a ser excluído:
    ```jsx
    setTarefas(tarefas.filter((item) => item.id !== id));
    ```
  * **Renderização Dinâmica (`.map()`) e a Propriedade `key`:** Cada item mapeado para um elemento `<li>` recebe obrigatoriamente a propriedade especial `key={tarefa.id}`. A chave auxilia o algoritmo de reconciliação do Virtual DOM a identificar univocamente quais itens foram adicionados, removidos ou reordenados, evitando recriações custosas de toda a árvore de elementos.

---

### 5. Layout Estrutural e Estilos CSS
* **Arquivos:** [`App.css`](./desafio-aula-zeroquatro/src/App.css) | [`index.css`](./desafio-aula-zeroquatro/src/index.css)
* **Técnicas aplicadas:**
  * **Padrão Sticky Footer:** O container raiz `.app-container` adota `display: flex; flex-direction: column; min-height: 100vh;`. O container intermediário `.main-content` recebe `flex: 1`, empurrando o rodapé de forma elegante para a extremidade inferior da janela, mesmo em telas com pouco conteúdo.
  * **Cartões e Elevação Visual:** Estilização com `.page-card` utilizando cantos arredondados (`border-radius: 8px`), contraste em fundo claro e sombras sutis (`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)`).
  * **Design Interativo:** Botões primários (`.btn`) e de ação destrutiva (`.btn-danger`) com transições de cor suaves no pseudo-estado `:hover`.

---

## 🧠 Síntese dos Conceitos Praticados

| Conceito / Recurso | Sintaxe / Contexto | Papel Arquitetural no Projeto |
| :--- | :--- | :--- |
| **Componentes Funcionais** | `function Header({ title })` | Blocos modulares que retornam elementos JSX para montar a interface. |
| **Props** | `<Header title="..." />` | Passagem unidirecional de parâmetros e propriedades de componentes pais para filhos. |
| **JSX** | `<div className="...">...</div>` | Extensão de sintaxe que permite escrever estruturas similares ao HTML dentro do JavaScript. |
| **`useState`** | `const [estado, setEstado] = useState(valor)` | Hook do React que adiciona estado reativo local e dispara ciclos de re-renderização. |
| **Input Controlado** | `value={novoTexto} onChange={...}` | Sincroniza a digitação do usuário diretamente com o estado interno do React. |
| **Imutabilidade (`...`)** | `setTarefas([...tarefas, novoItem])` | Cria uma nova referência de lista no estado sem modificar o array preexistente. |
| **Método `.filter()`** | `tarefas.filter(item => item.id !== id)` | Gera uma nova coleção filtrada para implementar a exclusão de itens de forma pura. |
| **Método `.map()` + `key`** | `tarefas.map(item => <li key={item.id}>)` | Itera sobre a coleção gerando elementos JSX com identificadores únicos para o Virtual DOM. |
| **React Router (`BrowserRouter`)** | `<BrowserRouter> ... </BrowserRouter>` | Envolve a árvore de componentes habilitando a sincronização com a URL do navegador. |
| **Rotas (`Routes` e `Route`)** | `<Route path="/sobre" element={<Sobre />} />` | Mapeia caminhos de URL para a exibição de componentes específicos na tela. |
| **Navegação Declarativa (`Link`)** | `<Link to="/lista">Lista</Link>` | Altera a rota sem disparar recarregamento de página (*zero page reload*). |
| **Rota 404 Coringa** | `<Route path="*" element={<NotFound />} />` | Captura qualquer tentativa de acesso a URLs não mapeadas na aplicação. |

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

- **Core & Roteamento:**
  - **[React 19](https://react.dev/):** Biblioteca declarativa baseada em componentes para interfaces web.
  - **[ReactDOM 19](https://react.dev/reference/react-dom):** Adaptador de renderização do React direcionado para o DOM dos navegadores.
  - **[React Router DOM v7](https://reactrouter.com/):** Biblioteca completa de roteamento client-side para SPAs em React.
- **Ambiente de Desenvolvimento & Build:**
  - **[Vite 8](https://vitejs.dev/):** Ferramenta de build de próxima geração com servidor de desenvolvimento ultra-rápido baseado em ESM.
  - **[Node.js](https://nodejs.org/):** Ambiente de execução JavaScript utilizado para orquestrar dependências e scripts.
  - **[npm](https://www.npmjs.com/):** Gerenciador oficial de pacotes.
  - **[ESLint 10](https://eslint.org/):** Análise estática de código para garantia de sintaxe limpa e conformidade com regras de React Hooks.
- **Estilização e Apresentação:**
  - **HTML5 Semântico:** `<header>`, `<main>`, `<nav>`, `<footer>`, `<form>`, `<ul>`, `<li>`.
  - **CSS3 Moderno:** Flexbox para layout responsivo (*Sticky Footer* e alinhamento de listas), box model e variáveis de sistema.

---

## 🚀 Como Executar o Projeto Passo a Passo

Para rodar esta aplicação em sua máquina local, siga as instruções detalhadas abaixo:

### Pré-requisitos
Certifique-se de ter o **[Node.js](https://nodejs.org/)** (versão 18 ou superior — recomenda-se a versão LTS) e o gerenciador de pacotes **npm** instalados. Para verificar se ambos estão disponíveis em seu terminal, execute:
```bash
node -v
npm -v
```

---

### Passo 1: Navegue até o diretório do projeto
Abra o terminal (PowerShell, Bash ou Git Bash) e acesse a pasta da aplicação React:
```bash
cd "Programação III/Aula 04/Desafios/desafio-aula-zeroquatro"
```

---

### Passo 2: Instale as dependências do projeto
Como a pasta `node_modules` não é versionada no repositório, execute o comando abaixo para ler o arquivo `package.json` e baixar todas as bibliotecas necessárias:
```bash
npm install
```

> [!NOTE]
> Este comando irá ler as definições do `package.json` e as travas do `package-lock.json`, criando a pasta local `node_modules` com o React 19, o Vite e o React Router prontos para execução.

---

### Passo 3: Inicie o servidor de desenvolvimento
Execute o script de desenvolvimento configurado no Vite:
```bash
npm run dev
```

---

### Passo 4: Acesse a aplicação no seu navegador
Após iniciar o servidor, o Vite exibirá o endereço local no terminal (normalmente na porta `5173`). Abra o link em seu navegador:
```text
http://localhost:5173/
```

---

### Comandos Adicionais do Projeto

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento com recarregamento instantâneo (HMR). |
| `npm run build` | Compila e minifica o projeto para produção, gerando a pasta otimizada `dist/`. |
| `npm run preview` | Executa um servidor web local para visualizar e testar o conteúdo compilado na pasta `dist/`. |
| `npm run lint` | Executa a verificação estática de boas práticas e sintaxe via ESLint em todo o código `.jsx` e `.js`. |

---

## 👨‍💻 Autor

Desenvolvido por **Marlon da Silva**  
*Disciplina de Prática de Linguagem de Programação (Programação III).*  
🔗 [LinkedIn](https://www.linkedin.com/in/marlonds/)
