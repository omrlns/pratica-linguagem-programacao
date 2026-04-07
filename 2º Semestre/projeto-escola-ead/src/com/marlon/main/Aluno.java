package com.marlon.main;

public class Aluno {
    private int codigo;
    private String nome;
    private String dataNascimento;
    private String email;
    private String senha;
    private Curso[][] matrizCursos = new Curso[5][5];

    public Aluno (int codigo, String nome, String dataNascimento, String email, String senha) {
        this.codigo = codigo;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
    }

    public int getCodigo() { return codigo; }

    public String getNome() {
        return nome;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public boolean adicionarCurso(Curso curso, int semestre, int materia) {
        // verificando se a posição informada está livre
        if (matrizCursos[semestre][materia] == null) {
            matrizCursos[semestre][materia] = curso;
            System.out.printf("Curso '%s' adicionado com sucesso!%n", curso.getNome());
            return true;
        } else {
            // se não for null, avisar que já tem algo lá
            System.out.printf("[ERRO] Já existe um curso matriculado no 'Semestre' #%d na 'Posição' #%d%n", semestre + 1, materia + 1);
            return false;
        }
    }

    public boolean estaMatriculado(int codigoBusca) {
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                // verificando se a posição não é nula
                if (this.matrizCursos[i][j] != null) {
                    // verificando se o código do curso é igual ao código buscado
                    if (this.matrizCursos[i][j].getCodigo() == codigoBusca) {
                        return true;
                    }
                }
            }
        }
        return  false;
    }

    public void exibeDados() {
        System.out.println("\n--- INFORMAÇÕES DO(A) ALUNO(A) ---");
        System.out.printf("Nome: %s%n", nome);
        System.out.printf("Código: : %d%n", codigo);
        System.out.printf("Data de Nascimento: %s%n", dataNascimento);
        System.out.printf("Email: %s%n", email);
        System.out.printf("Senha: %s%n", senha);
        System.out.println("Cursos Matriculados: ");
        for (int linha = 0; linha < matrizCursos.length; linha++) {
            for (int coluna = 0; coluna < matrizCursos[linha].length; coluna++) {
                if (matrizCursos[linha][coluna] != null ) {
                    matrizCursos[linha][coluna].exibeDados();
                }
            }
        }
    }
}
