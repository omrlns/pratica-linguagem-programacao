package com.marlon.main;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        Aluno alunoTeste = new Aluno(1, "Marlon da Silva", "29/05/2003", "marlon@gmail.com", "marlon@123");

        System.out.println("Quantos cursos você quer cadastrar? ");
        int quantidadeCursos = sc.nextInt();

        for (int i = 0; i < quantidadeCursos; i++) {
            System.out.printf("--- CADASTRO DO CURSO #%d ---", i + 1);

            System.out.println("Nome: ");
            String nomeCurso = sc.nextLine();
            System.out.println("Código: ");
            int codigo = sc.nextInt();
            System.out.println("Duração/Horas: ");
            int duracao = sc.nextInt();

            sc.nextLine(); // limpa o "enter" após ler a duração

            Curso novoCurso = new Curso(codigo, nomeCurso, duracao);

            boolean matriculou = false;

            while (!matriculou) {
                System.out.println("Em qual semestre você deseja matricular? (1-5): ");
                int semestre = sc.nextInt() - 1;

                System.out.println("Qual a posição da matéria no semestre? (1-5): ");
                int materia = sc.nextInt() - 1;

                sc.nextLine(); // limpa o "enter" após ler as coordenadas

                // guardando as informações do curso dentro do objeto alunoTeste
                matriculou = alunoTeste.adicionarCurso(novoCurso, semestre, materia);
            }
        }
        alunoTeste.exibeDados();
    }
}
