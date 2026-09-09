import Link from "next/link";

export default function NavBar() {
    return (
        <header className="bg-slate-900 text-white shadow-md">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link href="/" className="text-xl font-bold tracking-wide hover:text-indigo-400 transition-colors">
                    StoreFront API
                </Link>
                <div className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="hover:text-indigo-400 transition-colors">
                        Vitrine
                    </Link>
                    <Link href="/sobre" className="hover:text-indigo-400 transition-colors">
                        Sobre o Projeto
                    </Link>
                </div>
            </nav>
        </header>
    );
}