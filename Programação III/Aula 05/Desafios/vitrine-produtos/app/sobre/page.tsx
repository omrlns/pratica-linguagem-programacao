import Link from "next/link";

export default function SobrePage() {
  const tecnologias = [
    {
      nome: "Next.js 16 (App Router)",
      categoria: "Framework React",
      descricao: "Estruturação moderna baseada em rotas com SSR/CSR de alta performance e otimização nativa de imagens.",
      cor: "bg-blue-50 text-blue-700 border-blue-200",
      icone: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      nome: "Tailwind CSS v4",
      categoria: "Estilização",
      descricao: "Sistema de design modular utility-first, com contraste suave, layout responsivo e transições fluidas.",
      cor: "bg-cyan-50 text-cyan-700 border-cyan-200",
      icone: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      nome: "Axios",
      categoria: "Cliente HTTP",
      descricao: "Consumo assíncrono robusto dos dados da FakeStore API, com tratamento de erros e tipagem estrita.",
      cor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      icone: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      nome: "Jest & Testing Library",
      categoria: "Testes Automatizados",
      descricao: "Suíte de testes unitários para funções críticas como formatação de moeda brasileira e cálculo de descontos.",
      cor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icone: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      nome: "FakeStore API",
      categoria: "REST API Pública",
      descricao: "Fornecedora dos dados simulados de e-commerce, incluindo títulos, descrições, categorias, preços e notas.",
      cor: "bg-amber-50 text-amber-700 border-amber-200",
      icone: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      nome: "Vercel",
      categoria: "Deploy & CI/CD",
      descricao: "Hospedagem em infraestrutura edge global com pipeline automatizado de integração contínua.",
      cor: "bg-purple-50 text-purple-700 border-purple-200",
      icone: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Banner */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
          Desafio da Aula 05 • Programação III
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Sobre o Projeto StoreFront
        </h1>

        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Esta aplicação foi desenvolvida como parte das atividades práticas da disciplina de <strong>Programação III</strong>.
          O objetivo principal é exercitar o consumo assíncrono de APIs RESTful utilizando <strong>Axios</strong>, renderização
          reativa com <strong>Next.js</strong>, criação de interfaces modernas e acessíveis com <strong>Tailwind CSS</strong>,
          e validação de regras de negócio com testes unitários no <strong>Jest</strong>.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs shadow-indigo-200 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para a Vitrine
          </Link>

          <span className="text-xs text-slate-400">
            Autor: <strong className="text-slate-700 font-semibold">Marlon da Silva</strong>
          </span>
        </div>
      </section>

      {/* Grid de Tecnologias */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Pilha Tecnológica
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ferramentas e bibliotecas utilizadas no ciclo de desenvolvimento e entrega.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tecnologias.map((tech) => (
            <div
              key={tech.nome}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-indigo-100 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl border ${tech.cor}`}>
                    {tech.icone}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    {tech.categoria}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">
                  {tech.nome}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {tech.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Funcionalidades Desenvolvidas */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Recursos e Diferenciais Implementados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
            <div>
              <strong className="text-slate-800 font-semibold block">Design Clean & Contrastes Suaves</strong>
              Paleta clara baseada em slate/indigo, eliminando blocos pesados escuros e melhorando a legibilidade.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
            <div>
              <strong className="text-slate-800 font-semibold block">Filtros Dinâmicos e Busca Inteligente</strong>
              Busca em tempo real por nome e categoria com pílulas geradas diretamente a partir do retorno da API.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
            <div>
              <strong className="text-slate-800 font-semibold block">Modal de Detalhes Completo</strong>
              Visualização imersiva do produto com rating detalhado, especificações e cálculo de desconto via Pix.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
            <div>
              <strong className="text-slate-800 font-semibold block">Skeletons e Estados de Interface</strong>
              Feedback visual contínuo com telas de carregamento (shimmer), tratamento de erros e estado vazio.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}