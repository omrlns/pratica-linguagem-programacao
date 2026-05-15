const API_URL = "http://localhost:8080/reservas";
const HOSPEDE_ID = 1;

document.addEventListener("DOMContentLoaded", () => {
    loadReservas();
});

async function loadReservas() {
    try {
        const res = await fetch(`${API_URL}/hospede/${HOSPEDE_ID}`);
        if (!res.ok) throw new Error("Erro na requisição");

        const reservas = await res.json();
        renderReservas(reservas);
    } catch (error) {
        console.error("Erro ao carregar reservas:", error);
        document.getElementById("reservasList").innerHTML = `
            <tr><td colspan="3" class="text-center text-danger">Erro ao carregar dados. Verifique o CORS e se a API está rodando.</td></tr>
        `;
    }
}

function renderReservas(reservas) {
    const tbody = document.getElementById("reservasList");
    
    if (reservas.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" class="text-center">Nenhuma reserva encontrada para este hóspede.</td></tr>`;
        return;
    }

    tbody.innerHTML = reservas.map(reserva => {
        let dataBR = '-';
        let dataInput = '';

        // o spring boot pode devolver a data como array [Ano, Mês, Dia] ou String "AAAA-MM-DD"
        if (reserva.dataReserva) {
            if (Array.isArray(reserva.dataReserva)) {
                // se for array, extraímos os números e garantimos que mês e dia tenham 2 dígitos (ex: '05')
                const [ano, mes, dia] = reserva.dataReserva;
                const mesFormatado = String(mes).padStart(2, '0');
                const diaFormatado = String(dia).padStart(2, '0');
                
                dataBR = `${diaFormatado}/${mesFormatado}/${ano}`; // para mostrar na tabela
                dataInput = `${ano}-${mesFormatado}-${diaFormatado}`; // para devolver pro formulário no botão 'Editar'
            } else if (typeof reserva.dataReserva === 'string') {
                // se for string, fazemos o split como antes
                dataBR = reserva.dataReserva.split('-').reverse().join('/');
                dataInput = reserva.dataReserva;
            }
        }

        return `
        <tr>
            <td>${reserva.id}</td>
            <td>${dataBR}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-warning me-1" onclick="editReserva(${reserva.id}, '${dataInput}')">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteReserva(${reserva.id})">Excluir</button>
            </td>
        </tr>
        `;
    }).join("");
}
document.getElementById("reservaForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const reservaId = document.getElementById("reservaId").value;
    const dataReserva = document.getElementById("dataReserva").value; // formato AAAA-MM-DD

    // payload alinhado 100% com o seu Reserva.java
    const payload = {
        dataReserva: dataReserva,
        hospede: { id: HOSPEDE_ID }
    };

    try {
        if (reservaId) {
            await fetch(`${API_URL}/${reservaId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        } else {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        }

        resetForm();
        loadReservas(); 
    } catch (error) {
        alert("Erro ao salvar a reserva!");
        console.error(error);
    }
});

function editReserva(id, dataReserva) {
    document.getElementById("reservaId").value = id;
    document.getElementById("dataReserva").value = dataReserva; 
    document.getElementById("btnCancel").style.display = "inline-block";
}

document.getElementById("btnCancel").addEventListener("click", resetForm);

function resetForm() {
    document.getElementById("reservaForm").reset();
    document.getElementById("reservaId").value = "";
    document.getElementById("btnCancel").style.display = "none";
}

async function deleteReserva(id) {
    if (!confirm("Tem certeza que deseja excluir esta reserva?")) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadReservas(); 
    } catch (error) {
        alert("Erro ao excluir reserva!");
        console.error(error);
    }
}