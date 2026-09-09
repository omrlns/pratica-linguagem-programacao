import { formatarPreco, calcularDesconto } from "@/utils/formatters";

describe("Funções Utilitárias de Preço e Desconto", () => {
    test("deve formatar valor númerico para padrão monetário", () => {
        const formatado = formatarPreco(109.95);
        expect(formatado).toMatch(/R\$\s?109,95/);
    });

    test("deve calcular corretamente o desconto de 10%", () => {
        const resultado = calcularDesconto(100, 10);
        expect(resultado).toBe(90);
    });

    test("deve retornar 0 caso o desconto seja igual ou superior a 100%", () => {
        const resultado = calcularDesconto(50, 100);
        expect(resultado).toBe(0)
    });
});