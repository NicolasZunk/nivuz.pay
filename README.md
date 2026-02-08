# Checkout PIX - Pixup

## ❌ Problema Identificado

O erro "Failed to fetch" acontece porque a **API da Pixup bloqueia requisições diretas do navegador** (problema de CORS - Cross-Origin Resource Sharing).

## ✅ Solução: Backend Proxy

Você precisa criar um servidor intermediário que faça as chamadas para a Pixup.

## 📦 Como Usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o servidor

```bash
npm start
```

Ou para desenvolvimento com auto-reload:

```bash
npm run dev
```

### 3. Abrir o checkout

Abra o arquivo `index_com_backend.html` no navegador.

O servidor estará rodando em `http://localhost:3000`

## 📁 Arquivos

- **server.js** - Servidor Node.js que faz proxy das requisições
- **package.json** - Dependências do projeto
- **index_com_backend.html** - Frontend que conecta no servidor
- **index_debug.html** - Versão de debug (para testar diretamente, mas não vai funcionar por CORS)

## 🚀 Deploy em Produção

Você pode fazer deploy do servidor em:
- **Vercel** (serverless functions)
- **Heroku**
- **Railway**
- **Render**
- Qualquer VPS (DigitalOcean, AWS, etc)

## 🔐 Segurança

⚠️ **IMPORTANTE:** As credenciais da Pixup estão no código do servidor. Em produção:
- Use variáveis de ambiente (`.env`)
- Nunca exponha as credenciais no frontend
- Adicione validações e rate limiting

## 📝 Variáveis de Ambiente (Recomendado)

Crie um arquivo `.env`:

```
PIXUP_CLIENT_ID=nicolaszunk01_1068194194372499
PIXUP_CLIENT_SECRET=fd5a9db13e1841e08e8f11b18c8b4cdd87d9081076caba695a5bed9121b4bde6
PORT=3000
```

E modifique o `server.js` para usar:

```javascript
require('dotenv').config();
const PIXUP_CLIENT_ID = process.env.PIXUP_CLIENT_ID;
const PIXUP_CLIENT_SECRET = process.env.PIXUP_CLIENT_SECRET;
```

## 🛠️ Troubleshooting

**Erro "Cannot find module 'express'"**
→ Execute `npm install`

**Erro "Port 3000 already in use"**
→ Mude a porta no `server.js` ou mate o processo: `lsof -ti:3000 | xargs kill`

**Frontend não conecta no backend**
→ Verifique se a URL em `index_com_backend.html` está correta (linha com `const API_URL`)
