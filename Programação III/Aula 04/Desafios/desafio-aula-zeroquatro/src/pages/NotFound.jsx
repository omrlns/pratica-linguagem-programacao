import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="page-card" style={{ textAlign: "center" }}>
            <h2>404 - Página Não Encontrada</h2>
            <p style={{ marginBottom: "1.5rem" }}>A rota acessada não existe.</p>
            <Link to="/" className="btn" style={{ textDecoration: "none" }}>
                Voltar para o Início
            </Link>
        </div>
    );
}