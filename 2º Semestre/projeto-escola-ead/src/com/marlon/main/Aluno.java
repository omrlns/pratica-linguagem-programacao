package com.marlon.main;

import java.sql.SQLOutput;
import java.util.Scanner;

public class Aluno {
    private int codigo;
    private String nome;
    private String dataNascimento;
    private String email;
    private String senha;
    private Curso[][] matrizCursos = new Curso[5][5];
    private double[] notas = new double[3];
    private boolean[] lancada = new boolean[3];
    private Mensalidade[] mensalidades;
    private int numParcelas;

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

    public void lancarNotas() {
        Scanner sc = new Scanner(System.in);
        System.out.printf("----- LANÇAMENTO DE NOTAS | BOLETIM D@ %s -----%n", this.getNome());
        for (int i = 0; i < 3; i++) {
            System.out.printf("Informe a %dª nota: ", i + 1);
            this.notas[i] = sc.nextDouble(); // guarda a nota na posição referente a nota
            this.lancada[i] = true; // registra que a nota de determinada posição foi lançada
        }
    }

    public double calcularMedia() {
        double media = (this.notas[0] + this.notas[1] + this.notas[2]) / 3;
        return  media;
    }

    public void exibirNotas() {
        System.out.printf("BOLETIM D@ %s -----%n", this.getNome());
        for (int i = 0; i < notas.length; i++) {
            System.out.printf("%dª nota: %.1f%n", i + 1, this.notas[i]);
        }
        System.out.printf("Média Final: %.1f", this.calcularMedia());
        System.out.println();
    }

    public void adicionarMensalidades(double[] valores) {
        this.numParcelas = valores.length;
        this.mensalidades = new Mensalidade[this.numParcelas];

        for (int i = 0; i < this.numParcelas; i++) {
            this.mensalidades[i] = new Mensalidade(valores[i]);
        }
    }

    public void exibirMensalidades() {
        System.out.printf("\n----- RELATÓRIO FINANCEIRO D@ %s -----", this.getNome());

        // caso o aluno ainda não possua mensalidades
        if (this.numParcelas == 0 || this.mensalidades == null) {
            System.out.println("Não há registros de mensalidades para este aluno!");
            return;
        }
        for (int i = 0; i < this.numParcelas; i++ ) {
            String status = this.mensalidades[i].isPago() ? "PAGO" : "PENDENTE";
            System.out.printf("Parcela #%d: R$%.2f | Status: %s%n", i + 1, this.mensalidades[i].getValor(), status);
        }
    }

    public void pagarMensalidade(int indice) {
        if (indice >= 0 && indice < this.numParcelas) {
            if (this.mensalidades[indice].isPago()) {
                System.out.println("[AVISO] O pagamento desta mensalidade já foi realizado!");
            } else {
                this.mensalidades[indice].darBaixa();
                System.out.printf("[SUCESSO] O pagamento da %dª parcela foi realizado com sucesso!", indice + 1);
            }

        } else {
            System.out.println("[ERRO] Parcela inválida ou inexistente!");
        }
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