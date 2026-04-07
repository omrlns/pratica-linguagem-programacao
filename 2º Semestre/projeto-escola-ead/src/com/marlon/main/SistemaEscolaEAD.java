package com.marlon.main;

import java.util.Scanner;

public class SistemaEscolaEAD {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        ListaAlunos listaPrincipal = new ListaAlunos(50);

        int opcaoMenu;

        do {
            System.out.println("----- MENU -----");
            System.out.println("#1 - Visualizar lista de alunos");
            System.out.println("#2 - Adicionar aluno");
            System.out.println("#3 - Sair");

            System.out.println("Escolha uma opção: ");
            opcaoMenu = sc.nextInt();
            sc.nextLine(); // limpeza de buffer

            switch (opcaoMenu) {
                case 1:
                    // exibir a lista de alunos
                    break;
                case 2:
                    Aluno alunoTeste = new Aluno(1, "Marlon da Silva", "29/05/2003", "marlon@gmail.com", "marlon@123");

                    System.out.println("Quantos cursos você quer cadastrar? ");
                    int quantidadeCursos = sc.nextInt();

                    sc.nextLine(); // limpa o "enter" após ler a quantidade de cursos

                    for (int i = 0; i < quantidadeCursos; i++) {
                        System.out.printf("--- CADASTRO DO CURSO #%d ---%n", i + 1);

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
                    break;
                case 3:
                    System.out.println("Saindo do sistema...");
                    break;
                default:
                    System.out.println("Opção inválida!");
            }
        } while (opcaoMenu != 3);
    }
}
