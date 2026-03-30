package com.marlon.main;

public class Aluno {
    private int codigo;
    private String nome;
    private String dataNascimento;
    private String email;
    private String senha;

    public Aluno (int codigo, String nome, String dataNascimento, String email, String senha) {
        this.codigo = codigo;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
    }

    public int getCodigo() {
        return codigo;
    }


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

    public void exibeDados() {
        System.out.println("--- INFORMAÇÕES DO(A) ALUNO(A) ---");
        System.out.printf("Nome: %s%n", nome);
        System.out.printf("Código: : %d%n", codigo);
        System.out.printf("Data de Nascimento: %s%n", dataNascimento);
        System.out.printf("Email: %s%n", email);
        System.out.printf("Senha: %s%n", senha);
    }
}
