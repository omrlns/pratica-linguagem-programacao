# Desafios - Aula 03 | JavaScript, Manipulação do DOM e Arrays

Projeto desenvolvido como parte das atividades práticas da disciplina **Programação III** (Prática de Linguagem de Programação).

O objetivo principal desta aula foi introduzir e consolidar os conceitos fundamentais do **JavaScript moderno (ES6+)**, abrangendo tipagem estática e dinâmica com o operador `typeof`, manipulação e renderização no **Document Object Model (DOM)**, tratamento avançado de eventos (`submit`, `click`, `input`, `mouseover`, `mouseout`), lógica condicional para classificação de dados, métodos funcionais e mutáveis de manipulação de coleções/arrays (`push`, `pop`, `sort`, `filter`, `forEach`), além de estruturar uma interface responsiva aplicando **Mobile-First**, **CSS Flexbox** e **CSS Grid**.

---

## 📁 Estrutura de Arquivos

```text
Aula 03/
└── Desafios/
    ├── index.html                  # Estrutura semântica da aplicação (formulário, filtros e container de cards)
    ├── style.css                   # Estilização responsiva com variáveis CSS, Flexbox, Grid e Mobile-First
    ├── script.js                   # Lógica JavaScript (tipos, manipulação do DOM, eventos e métodos de array)
    └── README.md                   # Documentação detalhada da atividade
```

---

## 📋 Funcionalidades e Conceitos Implementados

A aplicação consiste em um sistema interativo de **Cadastro, Gerenciamento e Filtragem de Usuários**, integrando as seguintes funcionalidades e práticas de programação:

### 1. Verificação e Tipagem de Dados (`typeof`)
* **Arquivo:** [`script.js`](./script.js#L1-L13)
* **Objetivo:** Demonstrar a identificação em tempo de execução dos tipos primitivos e complexos da linguagem JavaScript.
* **Implementação:** Declaração de constantes com diferentes tipos (`String`, `Number`, `Boolean`, `Object`) e exibição de seus respectivos valores e saídas de `typeof` formatadas no console do navegador (`console.log`).

---

### 2. Formulário de Cadastro e Prevenção de Recarregamento
* **Arquivos:** [`index.html`](./index.html#L21-L46) | [`script.js`](./script.js#L86-L113)
* **Objetivo:** Coletar dados cadastrais (nome, idade e e-mail) do usuário e inseri-los no estado da aplicação sem recarregar a página.
* **Técnicas aplicadas:**
  * **Intercepção de evento:** Uso de `formUsuario.addEventListener("submit", ...)` com `event.preventDefault()` para impedir a submissão padrão do navegador.
  * **Tratamento de dados:** Limpeza de espaços em branco com `.trim()` e conversão da idade de string para número inteiro com `parseInt(valor, 10)`.
  * **Criação de Objetos Literais:** Agrupamento dos dados do usuário em um objeto estruturado `{ nome, idade, email, faixaEtaria }`.
  * **Inserção em Array:** Adição dinâmica do novo usuário ao array principal via `usuarios.push(usuario)`.
  * **UX e Usabilidade:** Limpeza do formulário via `formUsuario.reset()` e reposicionamento automático do foco no primeiro campo com `inputNome.focus()`.

---

### 3. Classificação Condicional de Faixa Etária
* **Arquivo:** [`script.js`](./script.js#L31-L40)
* **Objetivo:** Categorizar o usuário a partir de sua idade e determinar a identidade visual correspondente.
* **Implementação:** Arrow function `classificarIdade` que avalia a idade e retorna um objeto com o rótulo da categoria e a classe CSS correspondente:
  * **Menor de Idade (`idade <= 17`):** Badge estilizada com a classe `.faixa-menor` (fundo âmbar).
  * **Adulto (`18 <= idade <= 59`):** Badge estilizada com a classe `.faixa-adulto` (fundo anil).
  * **Idoso (`idade >= 60`):** Badge estilizada com a classe `.faixa-idoso` (fundo rosa/magenta).

---

### 4. Renderização Dinâmica no DOM e Template Strings
* **Arquivo:** [`script.js`](./script.js#L42-L70)
* **Objetivo:** Exibir em tempo real os cartões dos usuários cadastrados e atualizar o contador numérico de registros.
* **Técnicas aplicadas:**
  * **Limpeza e reinjeção:** `listaUsuariosContainer.innerHTML = ""` antes de cada novo ciclo de renderização, evitando duplicação de nós.
  * **Contador reativo:** Atualização dinâmica de `totalUsuariosElemento.textContent` com base em `listaParaExibir.length`.
  * **Tratamento de estado vazio:** Injeção de mensagem informativa (`<p class="lista-vazia">`) quando a coleção estiver vazia.
  * **Template Literals:** Criação de fragmentos HTML semânticos (`<article class="card-usuario">`) interpolando as propriedades do objeto dentro de um loop `forEach`.

---

### 5. Manipulação de Coleções e Métodos de Array

A aplicação exemplifica a aplicação prática dos principais métodos de array do JavaScript:

* **`.push()` (Adição):** Insere o novo usuário ao final do array `usuarios` após a validação do formulário.
* **`.sort()` (Ordenação Alfabética A-Z):**
  * Acionado pelo botão `btnOrdenar`.
  * Ordena os elementos in-place utilizando `localeCompare`: `usuarios.sort((a, b) => a.nome.localeCompare(b.nome))`.
  * Trata adequadamente caracteres acentuados da língua portuguesa.
* **`.pop()` (Remoção do Último Elemento):**
  * Acionado pelo botão `btnRemover`.
  * Remove o último registro do array e emite feedback no DOM informando qual usuário foi removido, validando se há itens antes da operação.
* **`.filter()` (Busca e Filtragem em Tempo Real):**
  * Acionado a cada digitação no campo de texto através do evento `input`.
  * Realiza filtragem não-mutável em tempo real comparando se o termo buscado está contido no nome ou no e-mail (usando `.toLowerCase()` e `.includes()`), sem comprometer o estado original do array principal.

---

### 6. Interatividade e Eventos do DOM
* **Arquivo:** [`script.js`](./script.js#L83-L183)
* **Objetivo:** Fornecer feedback visual e contextual contínuo ao usuário através de múltiplos manipuladores de eventos:
  * **`submit`:** Cadastro de dados e emissão de mensagens de sucesso no container `#mensagem-validacao`.
  * **`click`:** Execução das rotinas de ordenação alfabética e exclusão do último item.
  * **`input`:** Reatividade instantânea na barra de pesquisa sem necessidade de submissão.
  * **`mouseover` / `mouseout`:** Tooltips contextuais dinâmicos no elemento `#dica-hover`, orientando o usuário sobre a função de cada botão ao passar o cursor do mouse.

---

### 7. Interface Responsiva e Mobile-First
* **Arquivo:** [`style.css`](./style.css)
* **Técnicas aplicadas:**
  * **Variáveis CSS (`:root`):** Padronização da paleta de cores para botões, bordas, backgrounds e estados hover.
  * **Mobile-First:** Estrutura base pensada para telas menores com botões e formulários ocupando `100%` da largura e layout em coluna única (`grid-template-columns: 1fr`).
  * **Breakpoints com Media Queries:**
    * **`min-width: 768px` (Tablets / Laptops):** O cabeçalho e os botões passam a se alinhar horizontalmente via Flexbox (`flex-direction: row`), e a listagem de cartões adota **CSS Grid com 2 colunas** (`repeat(2, 1fr)`).
    * **`min-width: 1024px` (Desktops / Telas Amplas):** A grade de cartões expande-se automaticamente para **3 colunas** (`repeat(3, 1fr)`).

---

## 🧠 Síntese dos Métodos e Recursos Praticados

| Recurso / Método | Sintaxe / Contexto | Finalidade no Projeto |
| :--- | :--- | :--- |
| `typeof` | `typeof variavel` | Inspeciona e exibe o tipo de dado primitivo ou complexo no console. |
| `event.preventDefault()` | `event.preventDefault()` | Evita o recarregamento padrão da página durante o disparo do `submit`. |
| `Array.prototype.push()` | `usuarios.push(usuario)` | Adiciona um novo objeto de usuário ao final da lista de cadastrados. |
| `Array.prototype.pop()` | `usuarios.pop()` | Remove e retorna o último usuário cadastrado no array. |
| `Array.prototype.sort()` | `usuarios.sort((a, b) => a.nome.localeCompare(b.nome))` | Ordena a coleção alfabeticamente considerando a acentuação gráfica. |
| `Array.prototype.filter()` | `usuarios.filter(usuario => ...)` | Filtra registros dinamicamente por nome ou e-mail sem alterar a lista base. |
| `Array.prototype.forEach()` | `lista.forEach(usuario => ...)` | Itera sobre a lista para montar e injetar o HTML de cada card. |
| `innerHTML` | `container.innerHTML = cardTemplate` | Injeta blocos dinâmicos de HTML com base em Template Strings. |
| `textContent` | `elemento.textContent = valor` | Altera com segurança o texto de elementos, contadores e feedbacks. |
| `classList / className` | `msg.className = "..."` | Alterna visibilidade e estilos de feedback (`hidden`, `sucesso`, `aviso`). |
| `addEventListener` | `elemento.addEventListener("tipo", fn)` | Registra escutadores para `submit`, `click`, `input`, `mouseover` e `mouseout`. |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:**
  - Marcação semântica com `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<form>`, `<input>` e `<button>`.
- **CSS3:**
  - CSS Flexbox (alinhamento de barra de navegação, cabeçalhos de seções e barras de ações).
  - CSS Grid (distribuição responsiva da grade de cartões de usuários).
  - Variáveis nativas (`:root`) para consistência de cores e temas.
  - Abordagem Mobile-First com Media Queries adaptativas (`768px` e `1024px`).
  - Pseudo-classes e estados interativos (`:hover`, `:active`, `:focus`).
- **JavaScript (ES6+):**
  - Manipulação da API do DOM (`getElementById`, `innerHTML`, `textContent`).
  - Funções de seta (*Arrow Functions*) e Funções Declarativas tradicionais.
  - Template Literals (interpolação de variáveis no HTML dinâmico).
  - Métodos de iteração e transformação de arrays (`push`, `pop`, `sort`, `filter`, `forEach`).

---

## 🚀 Como Executar o Projeto

Por se tratar de uma aplicação front-end construída com tecnologias web nativas, não há necessidade de instalação de dependências ou etapas de compilação:

1. Navegue até a pasta da aula:
   ```bash
   cd "Programação III/Aula 03/Desafios"
   ```
2. Abra o arquivo [`index.html`](./index.html) em seu navegador de preferência:
   - Dando um duplo clique no arquivo [`index.html`](./index.html), ou
   - Utilizando a extensão **Live Server** no Visual Studio Code para habilitar *hot reload*.
3. Abra as **Ferramentas do Desenvolvedor** do navegador (`F12` ou `Ctrl + Shift + I`) e selecione a aba **Console** para verificar as demonstrações de tipos e `typeof`.
4. Interaja com a interface:
   - Cadastre novos usuários para visualizar a renderização em cards e badges de faixa etária.
   - Teste o campo de busca em tempo real.
   - Utilize a ordenação alfabética (A-Z) e o botão de remoção do último registro.
   - Posicione o cursor do mouse sobre os botões para conferir as mensagens interativas de hover.

---

## 👨‍💻 Autor

Desenvolvido por **Marlon da Silva**  
*Disciplina de Prática de Linguagem de Programação (Programação III).*  
🔗 [LinkedIn](https://www.linkedin.com/in/marlonds/)
