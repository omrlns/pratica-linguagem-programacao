import { Link } from "react-router-dom";

export default function Header({ title }) {
    return (
        <header className="header">
            <h1>{title}</h1>
            <nav className="nav">
                <Link to="/">Início</Link>
                <Link to="/lista">Lista Interativa</Link>
                <Link to="/sobre">Sobre</Link>
            </nav>
        </header>
    );
}