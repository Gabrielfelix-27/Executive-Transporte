<?php
// Proxy para InfinitePay API Check - Produção
// Este arquivo redireciona as requisições de verificação de status

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Tratar requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Apenas aceitar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit();
}

// URL da API real
$target_url = 'https://admin.executivepremium.com.br/infinitepay/api_check.php';

// Obter dados do POST
$input = file_get_contents('php://input');

// Configurar contexto para a requisição
$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => [
            'Content-Type: application/json',
            'Content-Length: ' . strlen($input)
        ],
        'content' => $input,
        'timeout' => 30
    ]
]);

// Fazer a requisição para a API real
$response = file_get_contents($target_url, false, $context);

if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to connect to payment status API']);
    exit();
}

// Retornar a resposta da API real
echo $response;
?>