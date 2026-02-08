// Vercel Serverless Function
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { valor, nome, email } = req.body;

    // Validações
    if (!valor || !nome) {
      return res.status(400).json({ error: 'Campos obrigatórios: valor e nome' });
    }

    if (typeof valor !== 'number' || valor <= 0) {
      return res.status(400).json({ error: 'Valor inválido' });
    }

    const PIXUP_CLIENT_ID = "nicolaszunk01_1068194194372499";
    const PIXUP_CLIENT_SECRET = "fd5a9db13e1841e08e8f11b18c8b4cdd87d9081076caba695a5bed9121b4bde6";
    const PIXUP_BASE_URL = "https://api.pixup.com.br";

    // 1. Obter token
    console.log('🔑 Obtendo token Pixup...');
    const tokenResponse = await fetch(`${PIXUP_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: PIXUP_CLIENT_ID,
        client_secret: PIXUP_CLIENT_SECRET,
        grant_type: 'client_credentials'
      })
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('❌ Erro auth:', error);
      return res.status(tokenResponse.status).json({ 
        error: `Autenticação falhou: ${error}` 
      });
    }

    const tokenData = await tokenResponse.json();
    const token = tokenData.access_token;
    console.log('✅ Token obtido');

    // 2. Criar PIX
    console.log('💳 Criando PIX...');
    const pixResponse = await fetch(`${PIXUP_BASE_URL}/v1/pix/qrcode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        valor: parseFloat(valor),
        descricao: 'Pagamento via checkout',
        nome_pagador: nome,
        cpf_pagador: '12345678909',
        email_pagador: email || undefined
      })
    });

    if (!pixResponse.ok) {
      const error = await pixResponse.text();
      console.error('❌ Erro PIX:', error);
      return res.status(pixResponse.status).json({ 
        error: `Erro ao criar PIX: ${error}` 
      });
    }

    const pixData = await pixResponse.json();
    console.log('✅ PIX criado com sucesso!');

    return res.status(200).json(pixData);

  } catch (error) {
    console.error('❌ Erro fatal:', error);
    return res.status(500).json({ 
      error: error.message || 'Erro interno do servidor' 
    });
  }
}
