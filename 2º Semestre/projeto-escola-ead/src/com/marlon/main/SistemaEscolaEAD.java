package com.marlon.main;

import java.util.Scanner;

public class SistemaEscolaEAD {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        ListaAlunos listaPrincipal = new ListaAlunos(50);

        int opcaoMenu;

        do {
            System.out.println("\n----- MENU -----");
            System.out.println("#1 - Visualizar Lista de Alunos");
            System.out.println("#2 - Adicionar Aluno/Curso");
            System.out.println("#3 - Lançar Notas");
            System.out.println("#4 - Exibir Boletim");
            System.out.println("#5 - Verificar Financeiro do Aluno");
            System.out.println("#6 - Sair");
//            System.out.println("#4 - [TESTE] - Listar Alunos por Curso");


            System.out.print("Escolha uma opção: ");
            opcaoMenu = sc.nextInt();
            sc.nextLine(); // limpeza de buffer

            switch (opcaoMenu) {
                case 1:
                    listaPrincipal.exibirLista();
                    break;
                case 2:
                    // Aluno alunoTeste = new Aluno(1, "Marlon da Silva", "29/05/2003", "marlon@gmail.com", "marlon@123");
                    System.out.println("\n----- CADASTRO DE ALUNO(A) -----\n");

                    System.out.println("Nome Completo: ");
                    String nome = sc.nextLine();
                    System.out.println("Código: ");
                    int codigo = sc.nextInt();
                    sc.nextLine(); // limpeza de bufferr
                    System.out.println("Data de Nascimento: ");
                    String dataNascimento = sc.next();
                    System.out.println("Email: ");
                    String email = sc.next();
                    System.out.println("Senha: ");
                    String senha = sc.next();

                    Aluno novoAluno = new Aluno(codigo, nome, dataNascimento, email, senha);

                    boolean cadastroComSucesso = listaPrincipal.adicionarAlunos(novoAluno);

                    if (cadastroComSucesso == true) {
                        System.out.println("Quantos cursos você quer cadastrar? ");
                        int quantidadeCursos = sc.nextInt();

                        sc.nextLine(); // limpa o "enter" após ler a quantidade de cursos

                        for (int i = 0; i < quantidadeCursos; i++) {
                            System.out.printf("--- CADASTRO DO CURSO #%d ---%n", i + 1);

                            System.out.println("Nome: ");
                            String nomeCurso = sc.nextLine();
                            System.out.println("Código: ");
                            int codigoCurso = sc.nextInt();
                            System.out.println("Duração/Horas: ");
                            int duracao = sc.nextInt();

                            sc.nextLine(); // limpa o "enter" após ler a duração

                            Curso novoCurso = new Curso(codigoCurso, nomeCurso, duracao);

                            boolean matriculou = false;

                            while (!matriculou) {
                                System.out.println("Em qual semestre você deseja matricular? (1-5): ");
                                int semestre = sc.nextInt() - 1;

                                System.out.println("Qual a posição da matéria no semestre? (1-5): ");
                                int materia = sc.nextInt() - 1;

                                sc.nextLine(); // limpa o "enter" após ler as coordenadas

                                // guardando as informações do curso dentro do objeto alunoTeste
                                matriculou = novoAluno.adicionarCurso(novoCurso, semestre, materia);
                            }
                        }
                        System.out.println("\n[SUCESSO] O cadastro de aluno e cursos foram finalizado com sucesso!");
                        novoAluno.exibeDados();
                    }
                    break;
                case 3:
                    System.out.println("----- LANÇAR NOTAS -----\n");
                    System.out.print("Informe o 'CÓDIGO' d@ alun@: ");
                    int codigoNota = sc.nextInt();
                    sc.nextLine(); // limpeza de buffer

                    Aluno alunoParaNota = listaPrincipal.buscarAluno(codigoNota);

                    if (alunoParaNota != null) {
                        // se achar, o método para lançar as notas será acionado
                        alunoParaNota.lancarNotas();
                        System.out.println("[SUCESSO] Notas registradas no sistema!");
                    } else {
                        System.out.printf("[ERRO] Nenhum aluno encontrado com o código: %d%n", codigoNota);
                    }
                    break;
                case 4:
                    System.out.println("----- EXIBIR BOLETIM -----");
                    System.out.print("Informe o 'CÓDIGO' d@ alun@: ");
                    int codigoBoletim = sc.nextInt();
                    sc.nextLine(); // limpeza de buffer

                    Aluno alunoParaBoletim = listaPrincipal.buscarAluno(codigoBoletim);

                    if (alunoParaBoletim != null) {
                        alunoParaBoletim.exibirNotas();
                    } else {
                        System.out.printf("[ERRO] Nenhum aluno encontrado com o código: %d%n", codigoBoletim);
                    }
                    break;
                case 5:
                    System.out.println("\n----- VERIFICAR FINANCEIRO -----");
                    System.out.print("Digite o 'CÓDIGO' d@ alun@: ");
                    int codFinancas = sc.nextInt();
                    sc.nextLine(); // limpeza de buffer!

                    Aluno alunoFinancas = listaPrincipal.buscarAluno(codFinancas);

                    if (alunoFinancas != null) {
                        alunoFinancas.exibirMensalidades();

                        if (alunoFinancas.getNumParcelas() > 0) {
                            System.out.print("\nDeseja pagar qual parcela? (Informe o número, ou digite '0' para voltar): ");
                            int opcaoParcela = sc.nextInt();
                            sc.nextLine(); // limpeza de buffer

                            if (opcaoParcela > 0) {
                                alunoFinancas.pagarMensalidade(opcaoParcela - 1);
                            }
                        }
                    } else {
                        System.out.printf("[ERRO] Nenhum aluno encontrado com o código: %d%n", codFinancas);
                    }
                    break;
//                case 4:
//                    System.out.println("\n----- RELATÓRIO DE ALUNOS POR CURSO -----");
//                    System.out.println("Informe o 'NOME' do curso:");
//                    String nomeBusca = sc.nextLine();
//                    System.out.println("Informe o 'CÓDIGO' do curso:");
//                    int codigoBusca = sc.nextInt();
//                    sc.nextLine(); // limpeza de buffer
//
//                    Curso cursoTeste = new Curso(codigoBusca, nomeBusca, 40);
//                    System.out.println();
//                    listaPrincipal.exibirAlunosPorCurso(cursoTeste);
//                    break;
                case 6:
                    System.out.println("Saindo do Sistema...");
                    break;
                default:
                    System.out.println("Opção Inválida!");
            }
        } while (opcaoMenu != 6);
    }
}
