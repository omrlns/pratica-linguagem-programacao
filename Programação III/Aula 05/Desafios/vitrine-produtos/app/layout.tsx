import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Vitrine de Produtos | FakeStore",
  description: "Desafio da Aula 05 - Next.js, Axios, Jest e Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <NavBar/>
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs">
          Desafio da Aula 05 • Consumo da API "fakestore.com" • Marlon da Silva
        </footer>
      </body>
    </html>
  );
}
