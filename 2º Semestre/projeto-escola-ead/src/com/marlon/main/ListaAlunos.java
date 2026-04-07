package com.marlon.main;

public class ListaAlunos {
    private Aluno[] alunos;
    private int totalAlunos;

    public ListaAlunos(int capacidade) {
        // vetor informando a quantidade de cadeiras vazias
        this.alunos = new Aluno[capacidade];
        this.totalAlunos = 0;
    }

    public boolean adicionarAlunos(Aluno alunoNovo) {
        // percorrendo a lista apenas até onde tem alunos gravados
        for (int i = 0; i < this.totalAlunos; i++) {
            // verificando a duplicidade
            if (this.alunos[i].getCodigo() == alunoNovo.getCodigo()) {
                System.out.println("[ERRO] Já existe um aluno com este código!");
                return false; // interrompe o método e não deixa cadastrar o aluno
            }
        }
        // caso o laço termine e não ache ninguém igual, a matrícula poderá ser realizada
        this.alunos[this.totalAlunos] = alunoNovo; // guarda o aluno novo na primeira vaga livre
        this.totalAlunos++; // aumenta a contagem de alunos matriculados
        return true;
    }

    public void exibirLista() {
        System.out.println("----- LISTA DE ESTUDANTES MATRICULADOS -----");
        // o laço vai percorrer apenas os alunos que existem na lista
        for (int i = 0; i < this.totalAlunos; i++) {
            System.out.printf("\nAluno #%d%n", i + 1);
            // o aluno da posição i é selecionado e assim ele exibe os seus dados
            this.alunos[i].exibeDados();
        }
    }

    public void exibirAlunosPorCurso(Curso cursoBuscado) {
        System.out.printf("Curso: %s | Duração: %d hora(s)", cursoBuscado.getNome(), cursoBuscado.getDuracao());
        System.out.println("Estudantes Matriculados: ");

        boolean achouAlguem = false; // referência de valor para caso a lista seja vazia

        for (int i = 0; i < this.totalAlunos; i++) {
            if (this.alunos[i].estaMatriculado(cursoBuscado.getCodigo())) {
                System.out.printf("# %s | Código: %d", this.alunos[i].getNome(), this.alunos[i].getCodigo());
                achouAlguem = true;
            }
        }
        if (!achouAlguem) {
            System.out.println("# Nenhum estudante está matriculado neste curso!");
        }
    }

}
