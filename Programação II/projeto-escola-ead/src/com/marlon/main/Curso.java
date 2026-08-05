package com.marlon.main;

public class Curso {
    private int codigo;
    private String nome;
    private int duracao;

    public Curso(int codigo, String nome, int duracao) {
        this.codigo = codigo;
        this.nome = nome;
        this.duracao = duracao;
    }

    public int getCodigo() { return codigo; }

    public String getNome() { return nome; }

    public int getDuracao() { return duracao; }

    public void setCodigo(int codigo) { this.codigo = codigo; }

    public void setNome(String nome) { this.nome = nome; }

    public void setDuracao(int duracao) { this.duracao = duracao; }

    public void exibeDados() {
        System.out.printf("%nCódigo: : %d%n", codigo);
        System.out.printf("Nome: %s%n", nome);
        System.out.printf("Duração: %d hora(s).%n", duracao);
    }
}
