# Forms - Aula 01 | Introdução a Formulários HTML5 e Validações

Projeto desenvolvido como parte das atividades práticas da disciplina **Programação III** (Prática de Linguagem de Programação).

O objetivo desta pasta é introduzir os conceitos fundamentais de formulários na web, explorando desde a estruturação semântica e boas práticas de acessibilidade até a aplicação inicial de validações com **Expressões Regulares (Regex)** em HTML5.

---

## 📁 Estrutura e Conteúdo dos Arquivos

A pasta contém dois arquivos complementares:

### 1. [`index.html`](./index.html) — Fundamentos de Formulários HTML5
Apresenta a estrutura semântica essencial de formulários e demonstra o comportamento de diferentes tipos de entrada de dados, dividido em dois cenários didáticos:

#### 💡 Boas Práticas e Diretrizes Destacadas no Código:
* **Uso de `<label>` com atributo `for`:** Garante acessibilidade a leitores de tela e melhora a usabilidade, permitindo focar o campo ao clicar no rótulo.
* **Tipos de input adequados (`type="email"`, `type="number"`, `type="password"`):** Fornece teclados virtuais otimizados em dispositivos móveis e validações semânticas nativas.
* **Atributo `required`:** Torna o preenchimento do campo obrigatório antes da submissão.
* **Atributo `placeholder`:** Oferece uma dica visual ao usuário sobre o formato esperado.
* **Organização com `<fieldset>` e `<legend>`:** Agrupa controles de formulário relacionados lógica e visualmente.
* **Atributos `<form action="..." method="...">`:** Define o endpoint de envio e o método HTTP (como `GET` ou `POST`).

#### 📝 Formulários Implementados:
* **Formulário 1 (Dados Pessoais e Preferências):**
  * Campos de texto (`nome`), email (`email`), número (`idade`) e senha mascarada (`senha`).
  * **Seleção única via `<input type="radio">`:** Campo `turno` (Matutino, Vespertino, Noturno), demonstrando a exclusão mútua garantida pelo mesmo atributo `name`.
  * **Múltipla escolha via `<input type="checkbox">`:** Campo `curso` (HTML, CSS, JavaScript), permitindo selecionar várias opções simultaneamente.
* **Formulário 2 (Inscrição ONG):**
  * Demonstração de controles adicionais de formulário:
    * Campo de seleção suspensa (`<select>` e `<option>` com opção desabilitada como guia).
    * Entrada numérica para horas semanais (`disponibilidade`).
    * Área de texto com múltiplas linhas (`<textarea>`) para comentários.
    * Caixa de consentimento (`<input type="checkbox">`) para aceite de termos.

---

### 2. [`regex.html`](./regex.html) — Introdução à Validação com Regex
Demonstra a transição de formulários simples para a validação com padrões específicos no front-end utilizando o atributo `pattern`.

#### Campos Validados:

* **CPF:**
  * **Campo:** `cpf`
  * **Pattern:** `\d{3}.\d{3}.\d{3}-\d{2}`
  * **Placeholder:** `Exemplo: 123.456.789-00`
  * **Explicação:** Exige três blocos de 3 dígitos numéricos (`\d{3}`) e um bloco de 2 dígitos verificadores (`\d{2}`), intercalados pelos separadores de ponto e traço.

* **Telefone Celular:**
  * **Campo:** `telefone`
  * **Pattern:** `^(\(?\d{2}\)?|\d{2})\s?9\s?\d{4}-?\d{4}$`
  * **Placeholder:** `Exemplo: (99) 99999-9999`
  * **Explicação:** Valida número de celular nacional aceitando DDD com ou sem parênteses `(\(?\d{2}\)?|\d{2})`, espaço opcional `\s?`, nono dígito fixo `9`, bloco de 4 dígitos `\d{4}`, hífen opcional `-?` e 4 dígitos finais `\d{4}`.

* **Data de Nascimento:**
  * **Campo:** `nascimento`
  * **Pattern:** `\d{2}/\d{2}/\d{4}`
  * **Placeholder:** `29/05/2003`
  * **Explicação:** Valida o formato básico `DD/MM/AAAA` utilizando dois dígitos para o dia (`\d{2}`), dois para o mês (`\d{2}`) e quatro para o ano (`\d{4}`), separados por barras literais.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:**
  - Elementos de formulário (`<form>`, `<fieldset>`, `<legend>`, `<label>`, `<input>`, `<select>`, `<textarea>`, `<button>`).
  - Atributos semânticos e de acessibilidade (`required`, `placeholder`, `for`, `id`, `name`, `type`).
- **Expressões Regulares (RegEx):** Uso do atributo `pattern` para garantir o formato de dados antes do envio.

---

## 🚀 Como Executar e Testar

Por se tratar de arquivos HTML estáticos, não é necessária nenhuma instalação ou configuração:

1. Navegue até a pasta `Forms`:
   ```bash
   cd "Programação III/Aula 01/Forms"
   ```
2. Abra os arquivos no navegador:
   * Para explorar os controles e tipos básicos: abra [`index.html`](./index.html).
   * Para testar as validações com padrões: abra [`regex.html`](./regex.html).
3. Teste os comportamentos de envio submetendo formulários com campos vazios ou formatos inválidos para observar as mensagens de validação nativas do navegador.
