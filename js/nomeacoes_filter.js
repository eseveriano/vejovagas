let currentPage = 1;
const totalPages = 11;




function loadPage(page) {
    const tipo_dou = "DO2";
    const dateInput = document.getElementById('date').value;
    const [ano, mes, dia] = dateInput.split('-');

    const formattedDate = `${dia}-${mes}-${ano}`;
    $('#portarias-container').empty();

    $.getJSON(`https://vejovagas.com.br/nomeacoes/${formattedDate}/${page}.json`, function(data) {
        console.log('Dados recebidos da API:', data);
        let html = '';
        data.forEach(item => {
            console.log('Item atual:', item);
            // Escape de caracteres especiais e codificação em Base64
            const escapedItem = btoa(JSON.stringify(item));
            
            const titulo = escapeHtml(String(item.titulo || ''));
            const texto = escapeHtml(String(item.texto || '').substring(0, 200));
            const assinatura = escapeHtml(String(item.assinatura || ''));
            
            html += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title"><b>${titulo}</b></h5>
                        <p class="card-text">${texto}...</p>
                        <p class="card-text"><small class="text-muted">Assinatura: ${assinatura}</small></p>
                        <button class="btn btn-green btn-block" onclick="openModal('${escapedItem}')">Detalhes</button>
                    </div>
                </div>
            `;
        });
        $('#portarias-container').html(html);
        updatePagination(page);
    });
}

// Função auxiliar para escapar HTML
function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') {
        console.warn('escapeHtml recebeu um valor não-string:', unsafe);
        return '';
    }
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
        console.log('String decodificada:', decodedItemString);
        const item = JSON.parse(decodedItemString);
        if (item && item.titulo && item.texto && item.assinatura) {
            $('#modalTitle').text(String(item.titulo));
            $('#modalBody').html(`
                <p>${String(item.texto)}</p>
                <p><small class="text-muted">Assinatura: ${String(item.assinatura)}</small></p>
            `);
            $('#detailsModal').modal('show');
        } else {
            console.error('Item inválido:', item);
        }
    } catch (error) {
        console.error('Erro ao parsear o item:', error);
        console.log('String codificada recebida:', encodedItemString);
    }
}





function updatePagination(currentPage) {
    let paginationHtml = '';
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHtml += `<li class="page-item active"><a class="page-link" href="#">${i}</a></li>`;
        } else {
            paginationHtml += `<li class="page-item"><a class="page-link" href="#" onclick="loadPage(${i}); event.preventDefault();">${i}</a></li>`;
        }
    }
    $('#pagination').html(paginationHtml);
}

$(document).ready(function() {
    loadPage('all'); // Carrega a primeira página ao iniciar
});



        document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value; // Data selecionada pelo usuário

    console.log("Data selecionada:", date); // Log da data selecionada

    // Formatação da data conforme especificado
    const tipo_dou = "DO2";
    const dataObj = new Date(date);
    
    const dia = dataObj.getUTCDate().toString().padStart(2, '0');
    const mes = (dataObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getUTCFullYear();

    console.log("Dia:", dia, "Mês:", mes, "Ano:", ano); // Log dos valores de dia, mês e ano

    const data_formatada_dou2 = `${tipo_dou}_${dia}_${mes}_${ano}`;

    // Preenche o card com os dados da pesquisa
    // document.getElementById('resultName').innerText = name;
    document.getElementById('resultDate').innerText = `${dia}/${mes}/${ano}`;
    document.getElementById('resultCard').style.display = 'block';

    // Carrega a primeira página de resultados com base na data formatada
    loadPage(1, data_formatada_dou2);
});

        document.getElementById('toggleButton').addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            const content = document.getElementById('content');
            sidebar.classList.toggle('collapsed');
            content.classList.toggle('collapsed');
        });
    
    
    
    
    
    
    // Função para formatar a data como YYYY-MM-DD
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    // Definir a data atual como valor padrão
    document.addEventListener('DOMContentLoaded', function() {
        var today = new Date();
        var formattedDate = formatDate(today);
        document.getElementById('date').value = formattedDate;
    });