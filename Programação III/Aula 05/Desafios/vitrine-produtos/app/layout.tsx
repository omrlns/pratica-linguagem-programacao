import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vitrine de Produtos | FakeStore API",
  description: "Desafio da Aula 05 - Catálogo interativo com Next.js, Axios, Jest e Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-slate-50/70 text-slate-800 min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white`}>
        <NavBar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-white border-t border-slate-200/80 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  S
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  StoreFront API
                </span>
                <span className="text-xs text-slate-400">• Desafio da Aula 05</span>
              </div>

              <p className="text-xs text-slate-500">
                Consumo da FakeStore API via Axios • Desenvolvido por <strong className="font-semibold text-slate-700">Marlon da Silva</strong>
              </p>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>Next.js 16</span>
                <span>•</span>
                <span>Tailwind CSS v4</span>
                <span>•</span>
                <span>Jest</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
