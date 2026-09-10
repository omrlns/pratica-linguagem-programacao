# Desafios - Aula 01 | Formulários e Expressões Regulares (Regex)

Projeto desenvolvido como parte das atividades práticas da disciplina **Programação III** (Prática de Linguagem de Programação).

O objetivo principal desta atividade foi praticar a validação nativa de formulários HTML5 utilizando o atributo `pattern` com **Expressões Regulares (Regex)**, garantindo a integridade dos dados inseridos pelo usuário diretamente no front-end antes da submissão.

---

## 📋 Desafios Implementados

A solução implementada no arquivo [`index.html`](./index.html) aborda 3 desafios propostos:

### 1. Desafio #1: Código de 5 a 8 Dígitos
* **Campo:** `codigo`
* **Pattern Utilizado:** `\d{5,8}`
* **Placeholder:** `12345 ou 12345678`
* **Explicação da Regex:**
  * `\d`: Representa qualquer caractere numérico (dígito de 0 a 9).
  * `{5,8}`: Quantificador que define um comprimento mínimo de 5 e máximo de 8 caracteres numéricos contínuos.
  * > **Nota Didática:** A expressão `\d{5,8}` valida qualquer sequência entre 5 e 8 dígitos (5, 6, 7 ou 8). Caso a exigência do enunciado fosse aceitar *estritamente* 5 dígitos ou 8 dígitos (descartando 6 e 7), a expressão alternativa recomendada seria `^(\d{5}|\d{8})$`.

---

### 2. Desafio #2: Nome com Acentos e Espaços
* **Campo:** `nome`
* **Pattern Utilizado:** `[A-Za-zÀ-ÖØ-öø-ÿ\s]+`
* **Placeholder:** `Marlon da Silva`
* **Explicação da Regex:**
  * `[ ... ]`: Define uma classe de caracteres permitidos.
  * `A-Za-z`: Letras do alfabeto latino (maiúsculas e minúsculas sem acento).
  * `À-ÖØ-öø-ÿ`: Faixas de caracteres acentuados e caracteres especiais da tabela Latin-1 Supplement (cobre acentos gráficos, cedilha e tremas utilizados na língua portuguesa).
  * `\s`: Permite espaços em branco (para nomes compostos e sobrenomes).
  * `+`: Quantificador que exige pelo menos um caractere válido.

---

### 3. Desafio #3: Data no Formato DD/MM/AAAA
* **Campo:** `data`
* **Pattern Utilizado:** `\d{2}/\d{2}/\d{4}`
* **Placeholder:** `09/08/2026`
* **Explicação da Regex:**
  * `\d{2}`: Exatamente 2 dígitos numéricos para o dia.
  * `/`: Caractere literal de barra para separação.
  * `\d{2}`: Exatamente 2 dígitos numéricos para o mês.
  * `/`: Caractere literal de barra para separação.
  * `\d{4}`: Exatamente 4 dígitos numéricos para o ano.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:**
  - Elementos semânticos para estruturação de formulários (`<form>`, `<fieldset>`, `<legend>`, `<label>`, `<input>`).
  - Validação nativa no navegador com atributos `required`, `pattern` e mensagens de erro padrão da API de Validação de Restrição do HTML5.
- **Expressões Regulares (RegEx):** Para validação de padrões de entrada de dados.

---

## 🚀 Como Executar e Testar

Como o projeto é composto exclusivamente por HTML estático, não há necessidade de instalação de dependências ou build:

1. Clone o repositório ou navegue até a pasta da aula:
   ```bash
   cd "Programação III/Aula 01/Desafios"
   ```
2. Abra o arquivo [`index.html`](./index.html) diretamente no seu navegador de preferência:
   - Dê um duplo clique no arquivo `index.html`, ou
   - Use a extensão **Live Server** no VS Code para rodar um servidor local leve.
3. Tente submeter o formulário inserindo valores válidos e inválidos em cada campo para verificar as validações aplicadas pelo navegador.
