# Desafios - Aula 02 | CSS Flexbox (Layouts e Alinhamentos)

Projeto desenvolvido como parte das atividades práticas da disciplina **Programação III** (Prática de Linguagem de Programação).

O objetivo principal desta aula foi aprofundar e consolidar os conceitos fundamentais do **CSS Flexible Box Layout (Flexbox)**, aplicando técnicas modernas para alinhamento mono e bidimensional, distribuição de espaçamento, proporções dinâmicas de crescimento (`flex-grow`), layout *Sticky Footer* e responsividade com *Media Queries*.

---

## 📁 Estrutura de Arquivos

```text
Aula 02/
└── Desafios/
    ├── img/
    │   └── profile.png             # Imagem de avatar para o Desafio 03
    ├── index.html                  # Hub / Portal de navegação para os desafios
    ├── index.css                   # Estilização do Hub de desafios
    ├── desafiozeroum.html          # Desafio 01: Barra de Navegação
    ├── zeroum.css                  # Estilos do Desafio 01
    ├── desafiozerodois.html        # Desafio 02: Galeria de Imagens
    ├── zerodois.css                # Estilos do Desafio 02
    ├── desafiozerotres.html        # Desafio 03: Cartão de Perfil
    ├── zerotres.css                # Estilos do Desafio 03
    ├── desafiozeroquatro.html      # Desafio 04: Layout Completo de Página
    ├── zeroquatro.css              # Estilos do Desafio 04
    └── README.md                   # Documentação da atividade
```

---

## 📋 Desafios Implementados

### 🏠 Portal de Desafios (`index.html`)
Ponto de partida interativo que reúne os quatro desafios propostos em um cartão de menu centralizado (`card-hub`), permitindo fácil navegação entre as atividades:
* **Conceitos:** Centralização com Flexbox no eixo vertical e horizontal, cartões interativos estilizados com pseudo-classes `:hover`, transições suaves e badges numeradas.

---

### 1. Desafio #1: Barra de Navegação Responsiva
* **Arquivos:** [`desafiozeroum.html`](./desafiozeroum.html) | [`zeroum.css`](./zeroum.css)
* **Objetivo:** Criar um cabeçalho completo contendo logotipo e menu de navegação alinhados nas extremidades opostas.
* **Técnicas e Flexbox aplicados:**
  * **Alinhamento nos extremos:** Container `.header-content` com `display: flex; justify-content: space-between; align-items: center;`.
  * **Menu em linha:** `.nav-menu` como flex container com `display: flex; gap: 12px;`.
  * **Sticky Footer básico:** `body` com `display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh;`.
  * **Responsividade:** Media query (`@media (max-width: 600px)`) que comuta o cabeçalho para `flex-direction: column` e alinhamento `align-items: flex-start`, garantindo quebra fluida dos links.

---

### 2. Desafio #2: Galeria de Imagens Flexível
* **Arquivos:** [`desafiozerodois.html`](./desafiozerodois.html) | [`zerodois.css`](./zerodois.css)
* **Objetivo:** Construir uma galeria de imagens distribuídas harmonicamente em grade flexível com quebra de linha.
* **Técnicas e Flexbox aplicados:**
  * **Centralização global:** `body` atuando como flex container (`justify-content: center; align-items: center; min-height: 100vh;`) para manter a galeria centralizada na janela.
  * **Quebra controlada em grade (3x2):** `.gallery-container` configurado com `display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;` e `max-width: 880px;`. A largura máxima foi calculada matematicamente `(280px * 3) + (20px * 2) = 880px` para forçar exatamente 3 colunas e 2 linhas.
  * **Efeitos visuais:** Imagens com `object-fit: cover`, bordas arredondadas e efeito de elevação no hover (`transform: translateY(-4px)` e sombras dinâmicas).
  * **Botão flutuante de navegação:** Botão `.btn-back` posicionado de forma fixa (`position: fixed`) no canto inferior para retornar ao menu inicial.

---

### 3. Desafio #3: Cartão de Perfil (*Profile Card*)
* **Arquivos:** [`desafiozerotres.html`](./desafiozerotres.html) | [`zerotres.css`](./zerotres.css)
* **Objetivo:** Desenvolver um card de apresentação pessoal alinhado verticalmente, contendo avatar, informações profissionais e botão de contato.
* **Técnicas e Flexbox aplicados:**
  * **Direcionamento em coluna:** `.profile-card` configurado com `display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px;`.
  * **Estruturação de dados:** Subcontainer `.profile-info` também em coluna (`gap: 6px`) para organizar nome, cargo (*Backend Developer*) e lista sem marcadores com as principais tecnologias (Spring Boot, Django, FastAPI, PostgreSQL).
  * **Chamada para Ação (CTA):** Botão estilizado como tag `<a>` apontando para o LinkedIn com transições dinâmicas de elevação (`translateY(-2px)`) e clique ativo (`active`).

---

### 4. Desafio #4: Layout Completo de Página (*Sticky Footer* e 2 Colunas)
* **Arquivos:** [`desafiozeroquatro.html`](./desafiozeroquatro.html) | [`zeroquatro.css`](./zeroquatro.css)
* **Objetivo:** Criar um layout web moderno completo com cabeçalho, divisão em duas colunas assimétricas (conteúdo e sidebar) e rodapé fixado na base da página (*Sticky Footer*).
* **Técnicas e Flexbox aplicados:**
  * **Padrão Sticky Footer:** O `body` adota `display: flex; flex-direction: column; min-height: 100vh;`. O container de conteúdo intermediário (`.layout-container`) recebe `flex: 1`, expandindo-se para preencher todo o espaço vertical livre e garantindo que o rodapé permaneça na base mesmo em páginas com pouco conteúdo.
  * **Proporção de colunas com `flex`:**
    * `.main-content`: recebe `flex: 3` (ocupa 75% da área disponível).
    * `.sidebar`: recebe `flex: 1` (ocupa 25% da área disponível).
    * Alinhamento vertical com `align-items: flex-start`, evitando que a barra lateral se estique desnecessariamente caso o conteúdo principal seja extenso.
  * **Responsividade:** Em telas com largura de até `768px`, a regra `@media` altera `.layout-container` para `flex-direction: column;`, fazendo o conteúdo e a barra lateral ocuparem `100%` da largura de forma empilhada.

---

## 🧠 Síntese dos Conceitos de Flexbox Praticados

| Propriedade | Contexto de Aplicação | Função no Projeto |
| :--- | :--- | :--- |
| `display: flex` | Container pai | Define o contexto de formatação flexível para os elementos filhos diretos. |
| `flex-direction` | Linha (`row`) / Coluna (`column`) | Alterna entre o fluxo horizontal padrão e o fluxo vertical (Cards, Páginas e Menus mobile). |
| `justify-content` | Eixo Principal (*Main Axis*) | Distribuição de espaço entre elementos (`space-between` no header e `center` nas galerias e hubs). |
| `align-items` | Eixo Transversal (*Cross Axis*) | Alinhamento vertical em linhas (`center` na navbar) e horizontal em colunas (`center` no profile card). |
| `flex-wrap` | Quebra de linha | Permite que itens excedentes saltem para a próxima linha sem estourar o container (`wrap` nas imagens). |
| `gap` | Espaçamento entre itens | Define espaçamentos homogêneos sem recorrer a margens manuais ou hacks com `:last-child`. |
| `flex: <valor>` | Itens flexíveis (*Flex Items*) | Define capacidade de expansão e proporção (`flex: 1` no sticky footer e divisão `3:1` entre conteúdo e sidebar). |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:**
  - Marcação semântica com `<header>`, `<nav>`, `<main>`, `<aside>`, `<section>`, `<ul>` e `<footer>`.
- **CSS3:**
  - CSS Flexbox (todas as propriedades de contêiner e item).
  - Media Queries para design responsivo adaptado para dispositivos móveis e desktops.
  - Pseudo-classes (`:hover`, `:active`) e propriedades de transição suave (`transition`).
  - Posicionamento `position: fixed` para controles de navegação.

---

## 🚀 Como Executar o Projeto

Por se tratar de um projeto puramente estático (HTML5 e CSS3), não há necessidade de instalação de pacotes ou compiladores:

1. Clone o repositório ou navegue até a pasta da aula:
   ```bash
   cd "Programação III/Aula 02/Desafios"
   ```
2. Abra o arquivo [`index.html`](./index.html) em seu navegador:
   - Dando um duplo clique diretamente no arquivo `index.html`, ou
   - Utilizando a extensão **Live Server** no Visual Studio Code para recarregamento automático.
3. Utilize os botões do hub inicial para transitar livremente entre cada um dos quatro desafios.

---

## 👨‍💻 Autor

Desenvolvido por **Marlon da Silva**  
*Disciplina de Prática de Linguagem de Programação (Programação III).*  
🔗 [LinkedIn](https://www.linkedin.com/in/marlonds/)
