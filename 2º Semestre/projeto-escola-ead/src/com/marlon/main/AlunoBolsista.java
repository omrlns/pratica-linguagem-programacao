package com.marlon.main;

public class AlunoBolsista extends Aluno {

    // atributo exclusivo da classe filha
    private String tipoBolsa;

    public AlunoBolsista(int codigo, String nome, String dataNascimento, String email, String senha, String tipoBolsa) {

        // o super tem que ser obrigatoriamente a primeira linha
        // o super manda esses dados lá para o construtor da classe Aluno
        super(codigo, nome, dataNascimento, email, senha);

        // depois, aguardamos o dado que é exclusivo desta classe
        this.tipoBolsa = tipoBolsa;
    }

    public String getTipoBolsa() { return tipoBolsa; }

    public void setTipoBolsa(String tipoBolsa) { this.tipoBolsa = tipoBolsa; }

    @Override
    public void exibeDados() {
        super.exibeDados();
        System.out.printf("Tipo de Bolsa: %s%n", tipoBolsa);
    }
}
