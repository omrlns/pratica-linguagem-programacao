import { useState } from "react";

export default function Lista() {
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: "Configurar o Ambiente com o Vite" },
    { id: 2, texto: "Configurar as Rotas no React Router" },
    { id: 3, texto: "Implementar Hooks de Estado" },
  ]);

  const [novoTexto, setNovoTexto] = useState("");

  const adicionarItem = (event) => {
    event.preventDefault();
    if (!novoTexto.trim()) return;

    const novoItem = {
      id: Date.now(),
      texto: novoTexto,
    };

    setTarefas([...tarefas, novoItem]);
    setNovoTexto("");
  };

  const removerItem = (id) => {
    setTarefas(tarefas.filter((item) => item.id !== id));
  };

  return (
    <div className="page-card">
      <h2>Lista de Tarefas Interativas</h2>

      <form onSubmit={adicionarItem} className="input-group">
        <input
          type="text"
          placeholder="Digite um Novo Item..."
          value={novoTexto}
          onChange={(event) => setNovoTexto(event.target.value)}
        />
        <button type="submit" className="btn">
          Adicionar
        </button>
      </form>

      <ul className="item-list">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className="item-row">
            <span>{tarefa.texto}</span>
            <button
              className="btn btn-danger"
              onClick={() => removerItem(tarefa.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
