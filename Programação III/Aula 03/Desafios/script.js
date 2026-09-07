// DEMONSTRAÇÃO DE TIPOS DE DADOS E TYPEOF NO CONSOLE.LOG
const cursoNome = "Prática de Programação III"; // Tipo: String
const versaoModulo = 1; // Tipo: Number
const moduloAtivo = true; // Tipo: Boolean
const configuracaoInicial = { tema: "claro" }; // Tipo: Object

console.log("---------- TIPOS DE DADOS ----------");
console.log(`Constante "cursoNome": ${cursoNome} | Tipo: ${typeof cursoNome}`);
console.log(`Constante "versaoModulo": ${versaoModulo} | Tipo: ${typeof versaoModulo}`);
console.log(`Constante "moduloAtivo": ${moduloAtivo} | Tipo: ${typeof moduloAtivo}`);
console.log(`Constante "configuracaoInicial": ${JSON.stringify(configuracaoInicial)} | Tipo: ${typeof configuracaoInicial}`);
console.log("-------------------------------------");

// ESTADO INICIAL DA APLICAÇÃO
let usuarios = [];

//  CAPTURA DE ELEMENTOS DO DOM
const formUsuario = document.getElementById("form-usuario");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputEmail = document.getElementById("email");
const mensagemValidacao = document.getElementById("mensagem-validacao");
const listaUsuariosContainer = document.getElementById("lista-usuarios");
const totalUsuariosElemento = document.getElementById("total-usuarios");
const campoBusca = document.getElementById("campo-busca");
const btnOrdenar = document.getElementById("btn-ordenar");
const btnRemover = document.getElementById("btn-remover");
const mensagemAcoes = document.getElementById("mensagem-acoes");
const dicaHover = document.getElementById("dica-hover");

// FUNÇÃO: VALIDAÇÃO DE IDADE | ARROW FUNCTION
const classificarIdade = (idade) => {
    if (idade <= 17) {
        return { categoria: "Menor de Idade", classeCss: "faixa-menor" };
    } else if (idade >= 18 && idade <= 59) {
        return { categoria: "Adulto", classeCss: "faixa-adulto" };
    } else {
        return { categoria: "Idoso", classeCss: "faixa-idoso" };
    }
};

// FUNÇÃO: RENDERIZAÇÃO DA LISTA | DECLARAÇÃO REGULAR
function renderizarUsuarios(listaParaExibir) {
    // limpa o conteúdo atual da lista
    listaUsuariosContainer.innerHTML = "";
    
    // atualiza o contador no DOM
    totalUsuariosElemento.textContent = listaParaExibir.length;

    // verifica se a lista está vazia
    if (listaParaExibir.length === 0) {
        listaUsuariosContainer.innerHTML = `<p class="lista-vazia">nenhum usuário encontrado.</p>`
        return;
    }

    // renderização via loop foreach utilizando template string
    listaParaExibir.forEach((usuario) => {
        const cardTemplate = `
        <article class="card-usuario">
            <h3>${usuario.nome}</h3>
            <p><strong>Idade:</strong> ${usuario.idade} anos</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <span class="badge-faixa ${usuario.faixaEtaria.classeCss}">
                ${usuario.faixaEtaria.categoria}
            </span>
        </article>
        `;
        listaUsuariosContainer.innerHTML += cardTemplate;
    });
}

// FUNÇÃO: RESETAR AS MENSAGENS E APLICAR A CLASSE HIDDEN
function limparMsgCadastro() {
  mensagemValidacao.textContent = "";
  mensagemValidacao.className = "msg-validacao hidden";
}

function limparMsgAcoes() {
  mensagemAcoes.textContent = "";
  mensagemAcoes.className = "msg-validacao hidden";
}

// EVENTOS: SUBMIT, CLICK, INPUT, MOUSEOVER, MOUSEOUT

// SUBMIT -> CADASTRO, VALIDAÇÃO E PUSH NO ARRAY
formUsuario.addEventListener("submit", (event) => {
    event.preventDefault();

    // limpar qualquer mensagem pendente dos botões de ação
    limparMsgAcoes();

    // cria o objeto usuário
    const usuario = {
        nome: inputNome.value.trim(),
        idade: parseInt(inputIdade.value, 10),
        email: inputEmail.value.trim(),
        faixaEtaria: classificarIdade(parseInt(inputIdade.value, 10))
    };

    // adiciona na array com push
    usuarios.push(usuario);

    // exibe a validação no DOM
    mensagemValidacao.textContent = `Usuário "${usuario.nome}" cadastrado com sucesso! Classificação: ${usuario.faixaEtaria.categoria}.`;
    mensagemValidacao.className = "msg-validacao sucesso";

    // atualiza a redenrização na página
    renderizarUsuarios(usuarios);

    // limpa os campos do formulário
    formUsuario.reset();
    inputNome.focus();
});

// CLICK -> ORDENAR POR NOME USANDO SORT
btnOrdenar.addEventListener("click", () => {
    limparMsgCadastro();
    
    if (usuarios.length === 0) {
        mensagemAcoes.textContent = "Não há usuários para ordenar!";
        mensagemAcoes.className = "msg-validacao aviso";
        return;
    }

    usuarios.sort((a, b) => a.nome.localeCompare(b.nome));
    mensagemAcoes.textContent = "Lista ordenada alfabeticamente de A-Z com sucesso!";
    mensagemAcoes.className = "msg-validacao sucessso";
    
    renderizarUsuarios(usuarios);
});

// CLICK -> REMOVER O ÚLTIMO COM POP
btnRemover.addEventListener("click", () => {
    limparMsgCadastro();

    if (usuarios.length > 0) {
        const usuarioRemovido = usuarios.pop();
        mensagemAcoes.textContent = `Usuário "${usuarioRemovido.nome}" removido com sucesso!`;
        mensagemAcoes.className = "msg-validacao sucesso";
    } else {
        mensagemAcoes.textContent = "Não há usuários para remover!";
        mensagemAcoes.className = "msg-validacao aviso";
    }
    renderizarUsuarios(usuarios);
});

// INPUT -> FILTRAR EM TEMPO REAL COM FILTER
campoBusca.addEventListener("input", (event) => {
    limparMsgCadastro();
    limparMsgAcoes();

    const termo = event.target.value.toLowerCase();

    const usuariosFiltrados = usuarios.filter((usuario) => {
        const nomeBate = usuario.nome.toLowerCase().includes(termo);
        const emailBate = usuario.email.toLowerCase().includes(termo);
        return nomeBate || emailBate;
    });

    renderizarUsuarios(usuariosFiltrados);
});

// MOUSEOVER E MOUSEOUT -> MENSAGENS INTERATIVAS
btnOrdenar.addEventListener("mouseover", () => {
    limparMsgAcoes(); // limpa a mensagem se o mouse passou vindo de outro botão
    dicaHover.textContent = "Ação: Ordenará a lista alfabeticamente de A a Z.";
});

btnOrdenar.addEventListener("mouseout", () => {
    limparMsgAcoes(); // limpa a mensagem ao tirar o mouse
   dicaHover.textContent = "Passe o mouse sobre os botões para ver dicas de ação."; 
});

btnRemover.addEventListener("mouseover", () => {
    limparMsgAcoes(); // limpa a mensagem se o mouse passou vindo de outro botão
    dicaHover.textContent = "Ação: Remove o último usuário inserido." ;   
});

btnRemover.addEventListener("mouseout", () => {
    limparMsgAcoes(); // limpa a mensagem ao tirar o mouse
   dicaHover.textContent = "Passe o mouse sobre os botões para ver dicas de ação."; 
});

// chamada inicial para renderizar o estado incial
renderizarUsuarios(usuarios);

