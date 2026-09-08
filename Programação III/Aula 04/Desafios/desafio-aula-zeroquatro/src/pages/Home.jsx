import { useState } from "react";

export default function Home() {
    const [contador, setContador] = useState(0);

    return (
        <div className="page-card">
            <h2>Página Inicial</h2>
            <p>Bem-vindo ao Desafio da Aula 04</p>

            <div className="counter-box">
                <p>Valor do Contador: <strong>{contador}</strong></p>
                <br />
                <button className="btn" onClick={() => setContador(contador + 1)}>
                    Incrementar Contador
                </button>
            </div>
        </div>
    );
}