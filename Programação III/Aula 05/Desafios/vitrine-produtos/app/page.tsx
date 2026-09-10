"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
import { formatarPreco, calcularDesconto } from "@/utils/formatters";

interface Produto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

const CATEGORIAS_LABELS: Record<string, string> = {
  "men's clothing": "Moda Masculina",
  "women's clothing": "Moda Feminina",
  jewelery: "Joias & Acessórios",
  electronics: "Eletrônicos",
};

export default function VitrinePage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState<string>("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("todas");
  const [ordenacao, setOrdenacao] = useState<string>("relevancia");
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [produtoModal, setProdutoModal] = useState<Produto | null>(null);

  async function recarregarProdutos() {
    try {
      setCarregando(true);
      setErro(null);
      const resposta = await axios.get<Produto[]>(
        "https://fakestoreapi.com/products"
      );
      setProdutos(resposta.data);
    } catch {
      setErro("Não foi possível conectar à API FakeStore. Verifique sua conexão e tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    let ativo = true;

    async function carregarInicial() {
      try {
        const resposta = await axios.get<Produto[]>(
          "https://fakestoreapi.com/products"
        );
        if (ativo) {
          setProdutos(resposta.data);
        }
      } catch {
        if (ativo) {
          setErro("Não foi possível conectar à API FakeStore. Verifique sua conexão e tente novamente.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarInicial();

    return () => {
      ativo = false;
    };
  }, []);

  // Fechar modal com tecla ESC
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setProdutoModal(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Categorias únicas da API
  const categorias = useMemo(() => {
    const lista = Array.from(new Set(produtos.map((p) => p.category)));
    return ["todas", ...lista];
  }, [produtos]);

  // Filtragem e ordenação
  const produtosFiltrados = useMemo(() => {
    return produtos
      .filter((produto) => {
        const termo = busca.trim().toLowerCase();
        const coincideTitulo = produto.title.toLowerCase().includes(termo);
        const coincideCategoria = produto.category.toLowerCase().includes(termo);
        const coincideBusca = termo === "" || coincideTitulo || coincideCategoria;

        const coincideFiltroCategoria =
          categoriaAtiva === "todas" || produto.category === categoriaAtiva;

        return coincideBusca && coincideFiltroCategoria;
      })
      .sort((a, b) => {
        if (ordenacao === "menor-preco") return a.price - b.price;
        if (ordenacao === "maior-preco") return b.price - a.price;
        if (ordenacao === "melhor-avaliacao")
          return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0);
        if (ordenacao === "nome") return a.title.localeCompare(b.title);
        return a.id - b.id; // padrão
      });
  }, [produtos, busca, categoriaAtiva, ordenacao]);

  return (
    <div className="space-y-8">

      {/* Hero Banner Clean */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-indigo-50/40 to-slate-100/60 p-6 sm:p-10 border border-slate-200/80 shadow-xs">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            FakeStore API Integrada
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Descubra Produtos <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Incríveis com os Melhores Preços
            </span>
          </h1>

          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Consumo assíncrono em tempo real com Axios, filtros dinâmicos por categoria, busca inteligente e interface refinada com Tailwind CSS.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Entrega Rápida
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              10% de desconto no Pix
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Compra 100% Segura
            </span>
          </div>
        </div>

        {/* Decorative subtle gradient background circle */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Controles de Filtros e Busca */}
      <section className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Campo de Busca */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar produtos por nome ou categoria..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
            {busca && (
              <button
                onClick={() => setBusca("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                title="Limpar busca"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Ordenação */}
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="ordenacao" className="text-xs font-semibold text-slate-500 shrink-0">
              Ordenar:
            </label>
            <select
              id="ordenacao"
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all cursor-pointer"
            >
              <option value="relevancia">Destaques (Padrão)</option>
              <option value="menor-preco">Menor Preço</option>
              <option value="maior-preco">Maior Preço</option>
              <option value="melhor-avaliacao">Melhor Avaliação</option>
              <option value="nome">Nome (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Pílulas de Categoria */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            Categorias:
          </span>
          {categorias.map((cat) => {
            const isAtiva = categoriaAtiva === cat;
            const label = cat === "todas" ? "Todas as Categorias" : CATEGORIAS_LABELS[cat] || cat;

            return (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 capitalize ${
                  isAtiva
                    ? "bg-indigo-600 text-white shadow-xs shadow-indigo-200 font-semibold"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Barra de Status / Contagem de Produtos */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Mostrando <strong className="text-slate-800 font-semibold">{produtosFiltrados.length}</strong> de{" "}
          <strong className="text-slate-800 font-semibold">{produtos.length}</strong> produtos
        </span>
        {(busca || categoriaAtiva !== "todas") && (
          <button
            onClick={() => {
              setBusca("");
              setCategoriaAtiva("todas");
            }}
            className="text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2"
          >
            Limpar todos os filtros
          </button>
        )}
      </div>

      {/* Estados de Carregamento / Erro / Conteúdo */}
      {carregando && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200/70 p-4 space-y-4 animate-pulse"
            >
              <div className="w-full aspect-square bg-slate-100 rounded-xl" />
              <div className="space-y-2">
                <div className="h-3 bg-slate-100 rounded w-1/3" />
                <div className="h-4 bg-slate-100 rounded w-5/6" />
                <div className="h-4 bg-slate-100 rounded w-2/3" />
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="h-6 bg-slate-100 rounded w-1/3" />
                <div className="h-8 bg-slate-100 rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      )}

      {erro && (
        <div className="bg-red-50/70 border border-red-200 rounded-2xl p-6 text-center max-w-lg mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-red-900">Erro no Carregamento</h3>
          <p className="text-sm text-red-600">{erro}</p>
          <button
            onClick={recarregarProdutos}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Grid de Produtos */}
      {!carregando && !erro && produtosFiltrados.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtosFiltrados.map((produto) => {
            const precoPix = calcularDesconto(produto.price, 10);
            const categoriaNome =
              CATEGORIAS_LABELS[produto.category] || produto.category;

            return (
              <article
                key={produto.id}
                className="bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Imagem do Produto */}
                <div className="relative w-full aspect-square bg-gradient-to-b from-slate-50/60 to-white/40 p-6 flex items-center justify-center overflow-hidden">
                  {/* Badge Categoria */}
                  <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-indigo-700 border border-indigo-100 shadow-2xs">
                    {categoriaNome}
                  </span>

                  {/* Badge Avaliação */}
                  {produto.rating && (
                    <span className="absolute top-3 right-3 z-10 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-amber-600 border border-amber-100 flex items-center gap-1 shadow-2xs">
                      <svg className="w-3.5 h-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {produto.rating.rate.toFixed(1)}
                    </span>
                  )}

                  <Image
                    src={produto.image}
                    alt={produto.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Conteúdo do Card */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h2
                      title={produto.title}
                      className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug"
                    >
                      {produto.title}
                    </h2>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {produto.description}
                    </p>
                  </div>

                  {/* Preços e Ações */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                          {formatarPreco(produto.price)}
                        </span>
                      </div>
                      <p className="text-[11px] font-medium text-emerald-600 mt-0.5">
                        ou <strong>{formatarPreco(precoPix)}</strong> no Pix (10% OFF)
                      </p>
                    </div>

                    <button
                      onClick={() => setProdutoModal(produto)}
                      className="w-full py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-2xs hover:shadow-indigo-200"
                    >
                      <svg
                        className="w-4 h-4 text-indigo-500 group-hover/btn:text-white transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Estado Vazio de Busca */}
      {!carregando && !erro && produtosFiltrados.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-md mx-auto space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Nenhum produto encontrado</h3>
            <p className="text-xs text-slate-500 mt-1">
              Não encontramos resultados para &quot;{busca}&quot;. Tente utilizar outros termos ou selecione outra categoria.
            </p>
          </div>
          <button
            onClick={() => {
              setBusca("");
              setCategoriaAtiva("todas");
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
          >
            Restaurar Catálogo
          </button>
        </div>
      )}

      {/* Modal de Detalhes do Produto */}
      {produtoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setProdutoModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setProdutoModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              title="Fechar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              {/* Imagem no Modal */}
              <div className="relative aspect-square w-full bg-gradient-to-b from-slate-50 to-white rounded-2xl p-6 flex items-center justify-center border border-slate-100">
                <Image
                  src={produtoModal.image}
                  alt={produtoModal.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-4"
                />
              </div>

              {/* Informações no Modal */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                    {CATEGORIAS_LABELS[produtoModal.category] || produtoModal.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-2">
                    {produtoModal.title}
                  </h3>
                </div>

                {/* Rating */}
                {produtoModal.rating && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="flex items-center text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(produtoModal.rating?.rate ?? 0)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 text-slate-200"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-semibold text-slate-800">
                      {produtoModal.rating.rate}
                    </span>
                    <span className="text-slate-400">
                      ({produtoModal.rating.count} avaliações)
                    </span>
                  </div>
                )}

                {/* Preço */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="text-2xl font-black text-slate-900">
                    {formatarPreco(produtoModal.price)}
                  </div>
                  <div className="text-xs font-semibold text-emerald-600 mt-0.5">
                    {formatarPreco(calcularDesconto(produtoModal.price, 10))} com 10% de desconto no Pix
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    ou em até 3x de {formatarPreco(produtoModal.price / 3)} sem juros no cartão
                  </div>
                </div>

                {/* Descrição Completa */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Descrição do Produto
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-h-36 overflow-y-auto pr-1">
                    {produtoModal.description}
                  </p>
                </div>

                {/* Ações */}
                <div className="pt-3 border-t border-slate-100 flex gap-3">
                  <button
                    type="button"
                    className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Adicionar à Sacola
                  </button>

                  <button
                    onClick={() => setProdutoModal(null)}
                    className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
