function loadResults() {
    const dateInput = document.getElementById('date').value;
    const [ano, mes, dia] = dateInput.split('-');
    const formattedDate = `${dia}-${mes}-${ano}`;
    $('#resultsBody').empty(); // Limpa o conteúdo da tabela

    $.getJSON(`https://vejovagas.com.br/nomeacoes/${formattedDate}/all.json`, function(data) {
        console.log('Dados recebidos da API:', data);
        
        if (data.length > 0) {
            $('#resultsTable').show(); // Exibe a tabela
            data.forEach(item => {
                const escapedItem = btoa(JSON.stringify(item));
                const titulo = escapeHtml(String(item.titulo || ''));
                const texto = escapeHtml(String(item.texto || '').substring(0, 200));
                const assinatura = escapeHtml(String(item.assinatura || ''));
                
                $('#resultsBody').append(`
                    <tr>
                        <td>${titulo.split('/')[1]}</td>
                        <td>${texto}...</td>
                        <td>${assinatura}</td>
                        <td><button class="btn btn-green" onclick="openModal('${escapedItem}')">Detalhes</button></td>
                    </tr>
                `);
            });
        } else {
            $('#resultsTable').hide(); // Esconde a tabela se não houver resultados
        }
    });
}

// Função auxiliar para escapar HTML
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function openModal(encodedItemString) {
    try {
        const decodedItemString = atob(encodedItemString);
        const item = JSON.parse(decodedItemString);
        if (item && item.titulo && item.texto && item.assinatura) {
            $('#modalTitle').text(String(item.titulo));
            $('#modalBody').html(`
                <p>${String(item.texto)}</p>
                <p><small class="text-muted">Assinatura: ${String(item.assinatura)}</small></p>
            `);
            $('#detailsModal').modal('show');
        }
    } catch (error) {
        console.error('Erro ao parsear o item:', error);
    }
}

$(document).ready(function() {
    const today = new Date();
    document.getElementById('date').value = today.toISOString().split('T')[0]; // Define a data atual
    loadResults(); // Carrega resultados ao iniciar

    // Atualiza a tabela de resultados ao mudar a data
    document.getElementById('date').addEventListener('change', loadResults);
});

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
    const date = document.getElementById('date').value;
    const [ano, mes, dia] = date.split('-');

    document.getElementById('resultDate').innerText = `${dia}/${mes}/${ano}`;
    document.getElementById('resultCard').style.display = 'block';

    loadResults(); // Carrega resultados com a nova data
});

document.getElementById('toggleButton').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
});

document.getElementById('prevDate').addEventListener('click', function() {
    const dateInput = document.getElementById('date');
    const currentDate = new Date(dateInput.value);
    currentDate.setDate(currentDate.getDate() - 1); // Subtrai um dia
    dateInput.value = currentDate.toISOString().split('T')[0]; // Atualiza a data
    loadResults(); // Carrega resultados com a nova data
});

document.getElementById('nextDate').addEventListener('click', function() {
    const dateInput = document.getElementById('date');
    const currentDate = new Date(dateInput.value);
    currentDate.setDate(currentDate.getDate() + 1); // Adiciona um dia
    dateInput.value = currentDate.toISOString().split('T')[0]; // Atualiza a data
    loadResults(); // Carrega resultados com a nova data
});


// Função de filtragem (exemplo)
function filtrar(filtros) {
    const rows = document.querySelectorAll('#resultsBody tr');

    // Divide a string de filtros em um array de palavras
    const filterArray = filtros.split(' || ').flatMap(filter => filter.split(' '));

    rows.forEach(row => {
        const title = row.cells[0].textContent.toLowerCase();
        const signature = row.cells[1].textContent.toLowerCase();

        // Verifica se todas as palavras do filtro estão presentes no título ou assinatura
        const matchesFilters = filterArray.every(filter => 
            title.includes(filter.toLowerCase()) || signature.includes(filter.toLowerCase())
        );

        row.style.display = matchesFilters ? '' : 'none'; // Exibe ou esconde a linha
    });
}


// Função para buscar dados com base nos poderes selecionados
function searchByPower() {
    const busc = document.getElementById('searchInput').value;
    
    const selectedPowers = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        selectedPowers.push(checkbox.value);
    });
    selectedPowers.push(busc);
    console.log("Poderes selecionados:", selectedPowers.join(' '));
    filtrar(selectedPowers.join(' || '));
    // Implementar lógica de filtragem com base nos poderes selecionados
}


// Adiciona evento para os checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', searchByPower);
});

document.getElementById('searchInput').addEventListener('input', searchByPower);