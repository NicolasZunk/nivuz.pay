// servidor Node.js para proxy da API Pixup
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PIXUP_CLIENT_ID = "nicolaszunk01_1068194194372499";
const PIXUP_CLIENT_SECRET = "fd5a9db13e1841e08e8f11b18c8b4cdd87d9081076caba695a5bed9121b4bde6";
const PIXUP_BASE_URL = "https://api.pixup.com.br";

let cachedToken = null;
let tokenExpiry = 0;

async function getPixupToken() {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const response = await fetch(`${PIXUP_BASE_URL}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: PIXUP_CLIENT_ID,
      client_secret: PIXUP_CLIENT_SECRET,
      grant_type: 'client_credentials'
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Auth failed: ${response.status} - ${error}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

app.post('/api/criar-pix', async (req, res) => {
  try {
    const { valor, nome, email } = req.body;

    if (!valor || !nome) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const token = await getPixupToken();

    const response = await fetch(`${PIXUP_BASE_URL}/v1/pix/qrcode`, {
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

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
