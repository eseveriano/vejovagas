<?php
echo 'teste';
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página de Pesquisa</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .form-container {
            margin-bottom: 20px;
        }
        .card {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 20px;
            background-color: #f9f9f9;
        }
    </style>
</head>
<body>

    <div class="form-container">
        <h2>Pesquisa</h2>
        <form id="searchForm">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" required>
            <br><br>
            <label for="date">Data:</label>
            <input type="date" id="date" name="date" required>
            <br><br>
            <button type="submit">Pesquisar</button>
        </form>
    </div>

    <div class="card" id="resultCard" style="display: none;">
        <h3>Resultado da Pesquisa</h3>
        <p><strong>Nome:</strong> <span id="resultName"></span></p>
        <p><strong>Data:</strong> <span id="resultDate"></span></p>
    </div>

    <script>
        document.getElementById('searchForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o envio do formulário

            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;

            // Preenche o card com os dados da pesquisa
            document.getElementById('resultName').textContent = name;
            document.getElementById('resultDate').textContent = date;

            // Mostra o card
            document.getElementById('resultCard').style.display = 'block';
        });
    </script>

</body>
</html>
