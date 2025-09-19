// Proxy para API do InfinitePay - Resolve problema de CORS
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Responder a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    console.log('🔄 Proxy InfinitePay - Método:', req.method);
    console.log('🔄 Proxy InfinitePay - Body:', req.body);

    // Determinar URL da API baseada no endpoint
    const endpoint = req.query.endpoint || 'api';
    const apiUrl = endpoint === 'check' 
      ? 'https://admin.executivepremium.com.br/infinitepay/api_check.php'
      : 'https://admin.executivepremium.com.br/infinitepay/api.php';

    console.log('🔗 Fazendo requisição para:', apiUrl);

    // Fazer requisição para a API original
    const response = await fetch(apiUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Executive-Premium-Proxy/1.0'
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });

    console.log('📡 Resposta da API:', response.status, response.statusText);

    // Obter dados da resposta
    const data = await response.json();
    
    console.log('✅ Dados recebidos:', data);

    // Retornar resposta com status correto
    res.status(response.status).json(data);

  } catch (error) {
    console.error('❌ Erro no proxy InfinitePay:', error);
    
    res.status(500).json({
      ok: false,
      error: 'Erro interno do servidor de proxy',
      message: error.message
    });
  }
}