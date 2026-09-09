// formata o número para moeda em real (brl)
export function formatarPreco(valor: number): string {
  if (isNaN(valor) || valor < 0) return "R$ 0,00";
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// calcula o preço com desconto em porcentagem
export function calcularDesconto(preco: number, percentual: number): number {
    if (preco < 0 || percentual < 0) return 0;
    if (percentual >= 100) return 0;
    const valorFinal = preco - (preco * (percentual / 100));
    return Number(valorFinal.toFixed(2));
}
